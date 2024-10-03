import { Card, Modal, Table, TableProps } from 'antd';
import { Course, Review } from 'data';
import { useState } from 'react';

interface IProps {
    course: Course;
    filter: number | null;
}

type TableData = Review;
const cols: TableProps<TableData>['columns'] = [
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        width: 80,
    },
    {
        title: 'Difficulty',
        dataIndex: 'difficulty',
        key: 'difficulty',
        width: 100,
    },
    {
        title: 'Workload',
        dataIndex: 'workload',
        key: 'workload',
        width: 100,
    },
    {
        title: 'Date',
        dataIndex: 'reviewDate',
        key: 'reviewDate',
        width: 100,
    },
    {
        title: 'Review',
        dataIndex: 'review',
        key: 'review',
    },
];

const mean = (list: number[]) =>
    (list.reduce((prev, cur) => prev + cur, 0) / list.length).toFixed(1);

function Timeline({ course, filter }: IProps) {
    const [modalContent, setModalContent] = useState<Review[]>([]);

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

    return (
        <div
            className={`flex gap-4 w-full overflow-x-auto mb-8 ${data.length === 1 ? 'justify-center' : ''}`}
        >
            {data.map(
                ({ semester, difficulty, n, rating, summary, workload }) => (
                    <Card
                        title={semester}
                        style={{ minWidth: 700, maxWidth: 800 }}
                        hoverable
                        onClick={e => {
                            setModalContent(semesterStats[semester].reviews);
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
            <Modal
                title="Reviews"
                open={modalContent.length > 0}
                onOk={() => {
                    setModalContent([]);
                }}
                centered
                width={1200}
                cancelButtonProps={{ hidden: true }}
                closable={false}
                okText="Close"
            >
                <Table<TableData>
                    columns={cols}
                    dataSource={modalContent}
                    scroll={{ y: '500px' }}
                    pagination={false}
                />
            </Modal>
        </div>
    );
}

export default Timeline;
