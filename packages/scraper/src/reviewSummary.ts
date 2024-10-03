import * as fs from 'fs/promises';
import 'dotenv/config';
import OpenAI from 'openai';

type Course = {
    creditHours: number;
    name: string;
    slug: string;
    officialURL: string;
    description: string;
    syllabus: { [key: string]: any };
    isDeprecated: boolean;
    tags: string[];
    codes: string[];
    reviewCount: number;
    isFoundational: boolean;
    reviews?: Review[];
    reviewSummaries?: Record<string, string | null>;
    [key: string]: any;
};

type Review = {
    user: string;
    reviewDate: string;
    semester: string;
    review: string;
    rating: number;
    difficulty: number;
    workload: number;
};

const reviewSummary = async () => {
    const client = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'],
    });
    const files = await fs.readdir('../data/src/courses/');
    let i = 0;
    for (const file of files) {
        i++;
        console.log(
            `Processing: ${file} (${i}/${files.length} - ${((i / files.length) * 100).toFixed(1)}%)`,
        );
        const course = (await import(`../../data/src/courses/${file}`))
            .default as Course;
        if (course.reviewSummaries) {
            continue;
        }

        // Transform reviews into format {"semester year": ["review 1", ...]}
        const reviewsBySemester = course.reviews?.reduce(
            (dict, { semester, review, reviewDate }) => {
                const year = new Date(reviewDate).getFullYear();
                // Ignore 2015, a lot of metrics are negative
                if (year === 2015) return dict;

                dict[semester] ??= [];
                dict[semester].push(review);
                return dict;
            },
            {} as Record<string, string[]>,
        );

        const reviewSummaries = await Promise.all(
            Object.entries(reviewsBySemester ?? {}).map(
                async ([semester, reviews]) => {
                    const reviewsAsString = reviews.join('\n\n\n');
                    const prompt = `You are an unbiased journalist going through reviews for a course. 
Provide a summary as paragraphs of all of the reviews, including both the positive and negative aspects. 
Limit output to 1 paragraph and no more then 125 words. Use short and to the point language.

${reviewsAsString}`;
                    const response = await client.chat.completions.create({
                        messages: [
                            {
                                role: 'assistant',
                                content: prompt,
                            },
                        ],
                        model: 'gpt-4o-mini',
                    });
                    return {
                        semester,
                        summary: response.choices[0].message.content,
                    };
                },
            ),
        );
        const reviewSummaryBySemester = reviewSummaries.reduce(
            (dict, { semester, summary }) => {
                dict[semester] = summary;
                return dict;
            },
            {} as Record<string, string | null>,
        );

        course['reviewSummaries'] = reviewSummaryBySemester;

        await fs.writeFile(
            `../data/src/courses/${file}`,
            `export default ${JSON.stringify(course)}`,
        );
    }
};

reviewSummary();
