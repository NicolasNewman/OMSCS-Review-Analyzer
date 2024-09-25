import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Course, getCourse, CourseKeys } from 'data';
import { ResponsiveLine, Serie } from '@nivo/line';
import Line from '../components/charts/Line';

interface Params {
    slug: CourseKeys;
}

const theme = {
    background: '#242424',
    text: {
        fontSize: 11,
        fill: '#ffffff',
        outlineWidth: 0,
        outlineColor: '#ffffff',
    },
    axis: {
        domain: {
            line: {
                stroke: '#777777',
                strokeWidth: 1,
            },
        },
        legend: {
            text: {
                fontSize: 12,
                fill: '#ffffff',
                outlineWidth: 0,
                outlineColor: '#ffffff',
            },
        },
        ticks: {
            line: {
                stroke: '#777777',
                strokeWidth: 1,
            },
            text: {
                fontSize: 11,
                fill: '#ffffff',
                outlineWidth: 0,
                outlineColor: '#ffffff',
            },
        },
    },
    grid: {
        line: {
            stroke: '#dddddd',
            strokeWidth: 1,
        },
    },
    legends: {
        title: {
            text: {
                fontSize: 11,
                fill: '#ffffff',
                outlineWidth: 0,
                outlineColor: 'transparent',
            },
        },
        text: {
            fontSize: 11,
            fill: '#ffffff',
            outlineWidth: 0,
            outlineColor: '#ffffff',
        },
        ticks: {
            line: {},
            text: {
                fontSize: 10,
                fill: '#333333',
                outlineWidth: 0,
                outlineColor: 'transparent',
            },
        },
    },
    annotations: {
        text: {
            fontSize: 13,
            fill: '#333333',
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1,
        },
        link: {
            stroke: '#000000',
            strokeWidth: 1,
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1,
        },
        outline: {
            stroke: '#000000',
            strokeWidth: 2,
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1,
        },
        symbol: {
            fill: '#000000',
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1,
        },
    },
    tooltip: {
        wrapper: {},
        container: {
            background: '#ffffff',
            color: '#333333',
            fontSize: 12,
        },
        basic: {},
        chip: {},
        table: {},
        tableCell: {},
        tableCellValue: {},
    },
};

function CoursePage() {
    const { slug } = useParams() as unknown as Params;
    const [course, setCourse] = useState<Course | null>(null);
    useEffect(() => {
        async function fetch() {
            setCourse((await getCourse(slug)) as Course);
        }
        fetch();
    }, [slug]);

    const yearCount: Record<string, number> = {};

    if (course) {
        const { difficulty, review, workload } = course.reviews?.reduce(
            (dict, { reviewDate, difficulty, rating, workload }) => {
                const yr = new Date(reviewDate).getFullYear().toString();
                yearCount[yr] ??= 1;
                yearCount[yr] += 1;
                dict['difficulty'].push({ x: yr, y: difficulty });
                dict['review'].push({ x: yr, y: rating });
                dict['workload'].push({ x: yr, y: workload });

                return dict;
            },
            { workload: [], difficulty: [], review: [] } as Record<
                'review' | 'workload' | 'difficulty',
                { x: string; y: number }[]
            >,
        ) ?? { workload: [], difficulty: [], review: [] };
        // console.log(map);
        // x - year
        // y - value
        const data: Serie[] = [
            {
                id: 'review',
                data: review,
            },
            {
                id: 'workload',
                data: workload,
            },
            {
                id: 'difficulty',
                data: difficulty,
            },
        ];
        console.log(data);
        return (
            <div className="w-[1280px] h-[90vh]">
                <Line course={course} />
            </div>
        );
    }
    return <>Loading...</>;
}

export default CoursePage;
