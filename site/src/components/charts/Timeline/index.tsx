import { Card } from 'antd';
import { Course, Review } from 'data';
import { useState } from 'react';
import ReviewModal from './ReviewModal';

interface IProps {
    course: Course;
    filter: number | null;
}

const mean = (list: number[]) =>
    (list.reduce((prev, cur) => prev + cur, 0) / list.length).toFixed(1);

const processData = ({ course, filter }: IProps) => {
    const semesterStats =
        course.reviews?.reduce(
            (dict, review) => {
                const { difficulty, rating, workload, semester, reviewDate } =
                    review;
                if (new Date(reviewDate).getFullYear() === 2015) return dict;
                dict[semester] ??= {
                    difficulty: [],
                    rating: [],
                    workload: [],
                    n: 0,
                    summary: course.reviewSummaries?.[semester] ?? null,
                    reviews: [],
                };

                dict[semester].difficulty.push(difficulty);
                dict[semester].rating.push(rating);
                dict[semester].workload.push(workload);
                dict[semester].reviews.push(review);
                dict[semester].n = ++dict[semester].n;

                return dict;
            },
            {} as Record<
                string,
                {
                    difficulty: number[];
                    rating: number[];
                    workload: number[];
                    n: number;
                    summary: string | null;
                    reviews: Review[];
                }
            >,
        ) ?? {};

    const dataSortKey = (semester: string) => {
        const [season, year] = semester.split(' ');
        const seasonId = season === 'spring' ? 0 : season === 'summer' ? 1 : 2;
        const yearInt = parseInt(year) ?? 0;
        return [seasonId, yearInt];
    };

    const data = Object.entries(semesterStats)
        .map(([semester, obj]) => ({
            semester,
            difficulty: mean(obj.difficulty),
            rating: mean(obj.rating),
            workload: mean(obj.workload),
            n: obj.n,
            summary: obj.summary,
            seasonInt: dataSortKey(semester)[0],
            yearInt: dataSortKey(semester)[1],
        }))
        .sort((a, b) => {
            if (a.yearInt !== b.yearInt) return a.yearInt - b.yearInt;
            return a.seasonInt - b.seasonInt;
        })
        .filter(obj => !filter || obj.yearInt === filter);
    return { semesterStats, data };
};

function Timeline({ course, filter }: IProps) {
    const [modalContent, setModalContent] = useState<{
        reviews: Review[];
        semester: string;
    }>({ reviews: [], semester: '' });

    const { data, semesterStats } = processData({ course, filter });

    return (
        <div>
            <div className="text-2xl mb-2">Review summary by semester</div>
            <div className="mb-2">
                <strong>Disclaimer</strong>: the following summaries were
                created using gpt-4o-mini and may not accurately reflect the
                original data
            </div>
            <div>
                Usage: <br />
                (1) click a column on the HeatMap to filter the semesters by
                year <br /> (2) click on a semester to directly view the reviews
            </div>
            <div
                className={`flex gap-4 w-full overflow-x-auto mb-8 mt-4 ${data.length === 1 ? 'justify-center' : ''}`}
            >
                {data.map(
                    ({
                        semester,
                        difficulty,
                        n,
                        rating,
                        summary,
                        workload,
                    }) => (
                        <Card
                            title={semester}
                            style={{ minWidth: 700, maxWidth: 800 }}
                            hoverable
                            onClick={() => {
                                setModalContent({
                                    reviews: semesterStats[semester].reviews,
                                    semester,
                                });
                            }}
                        >
                            <div className="flex gap-4 justify-center mb-4">
                                <div className="">Reviews: {n}</div>
                                <div className="">Workload: {workload}</div>
                                <div className="">Rating: {rating}</div>
                                <div className="">Difficulty: {difficulty}</div>
                            </div>
                            <div>{summary}</div>
                        </Card>
                    ),
                )}
                <ReviewModal
                    reviews={modalContent.reviews}
                    semester={modalContent.semester}
                    setModalContent={setModalContent}
                />
            </div>
        </div>
    );
}

export default Timeline;
