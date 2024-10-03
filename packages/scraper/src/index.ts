import { Actor, Dataset, KeyValueStore } from 'apify';
import { PlaywrightCrawler } from 'crawlee';
import * as fs from 'fs/promises';

type Course = {
    creditHours: number;
    description: string;
    name: string;
    isDeprecated: boolean;
    slug: string;
    syllabus: { url: string };
    officialURL: string;
    tags: string[];
    reviewCount: number;
    isFoundational: boolean;
    reviews?: Review[];
    [key: string]: any;
};

type Review = Partial<{
    user: string | null;
    reviewDate: string | null;
    semester: string | null;
    review: string | null;
    rating: number | null;
    difficulty: number | null;
    workload: number | null;
}>;

const globalData: Record<string, Course> = {};

const getCourses = async (): Promise<Record<string, Course>> => {
    const req = await fetch(
        'https://www.omscentral.com/_next/data/Vx7FtzSKkcCEIM1Zaf-DC/index.json',
        { method: 'GET' },
    );
    const courses: Record<string, any>[] = (await req.json()).pageProps.courses;
    return courses.reduce((obj, course) => {
        return { ...obj, [course.slug]: course };
    }, {});
};

const crawler = new PlaywrightCrawler({
    launchContext: {
        launchOptions: {
            headless: true,
        },
    },
    maxConcurrency: 3,
    async requestHandler({ request, page, enqueueLinks }) {
        console.log(`Processing: ${request.url}...`);
        const store = await Actor.openKeyValueStore('courses');
        const reviews = (
            await page.$$eval('ul.space-y-4.divide-gray-200 li', $reviews => {
                const scrapedData: Review[] = [];
                $reviews.forEach($review => {
                    scrapedData.push({
                        user: $review.querySelector(
                            'p.items-center span span:nth-of-type(1)',
                        )?.textContent,
                        reviewDate: $review.querySelector(
                            'p.items-center span span:nth-of-type(2) span:nth-of-type(1)',
                        )?.textContent,
                        semester: $review.querySelector(
                            'p.items-center span span:nth-of-type(2) span:nth-of-type(2)',
                        )?.textContent,
                        review: $review.querySelector('div div.break-words')
                            ?.textContent,
                        rating: parseInt(
                            $review
                                .querySelector('p.flex-row span:nth-of-type(1)')
                                ?.textContent?.split('/')[0]
                                .replace(/[^0-9]/g, '') || '-1',
                        ),
                        difficulty: parseInt(
                            $review
                                .querySelector('p.flex-row span:nth-of-type(2)')
                                ?.textContent?.split('/')[0]
                                .replace(/[^0-9]/g, '') || '-1',
                        ),
                        workload: parseInt(
                            $review
                                .querySelector('p.flex-row span:nth-of-type(3)')
                                ?.textContent?.split('/')[0]
                                .replace(/[^0-9]/g, '') || '-1',
                        ),
                    });
                });
                return scrapedData;
            })
        ).filter(review => Object.keys(review).length > 0 && review.review);

        const courseInfo = globalData[request.url];
        await store.setValue(courseInfo.slug, {
            ...courseInfo,
            reviews: reviews,
        });
    },
});

(async () => {
    const courses = await getCourses();
    const slugs: string[] = [];
    const urls = Object.entries(courses).map(([slug, course]) => {
        const url = `https://www.omscentral.com/courses/${slug}/reviews`;
        slugs.push(slug);
        globalData[url] = course;
        return url;
    });

    // ===== Run crawler =====
    await Actor.init();
    await Actor.setValue('index', courses);
    await crawler.run(urls);

    // ===== Write each courses metadata =====
    const store = await Actor.openKeyValueStore('courses');
    for (const slug of slugs) {
        const data = (await store.getValue(slug)) as string;
        if (data) {
            await fs.writeFile(
                `../data/src/courses/${slug}.ts`,
                `export default ${JSON.stringify(data)}`,
            );
        }
    }

    // ===== Write catalog.ts =====
    await fs.writeFile(
        '../data/src/catalog.ts',
        `export default ${JSON.stringify(courses)}`,
    );

    // ===== Write loader.ts =====
    await fs.writeFile(
        '../data/src/loader.ts',
        `import { CourseKeys } from './';
const _courses = {
    ${slugs
        .map(
            slug =>
                `'${slug}': async () => (await import('./courses/${slug}')).default,`,
        )
        .join('\n')}
}

type CourseType<T extends CourseKeys> = Awaited<
    ReturnType<(typeof _courses)[T]>
>;

const getCourse = async <T extends CourseKeys>(
    courseName: T,
): Promise<CourseType<T>> => {
    const t = (await _courses[courseName]()) as CourseType<T>;
    return t;
};
export default getCourse`,
    );

    await Actor.exit();
})();
