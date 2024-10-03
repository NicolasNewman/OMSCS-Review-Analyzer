import { Course } from 'data';
import { Datum, ResponsiveLine, Serie } from '@nivo/line';
import theme from './theme';

interface IProps {
    course: Course;
}

type StatKey = 'review' | 'workload' | 'difficulty';
type YearlyRecord = Record<string, number[]>;

const processData = (course: IProps['course']) => {
    const yearCount: Record<string, number> = {};
    const { difficulty, review, workload } = Object.entries(
        course.reviews?.reduce(
            (dict, { reviewDate, difficulty, rating, workload }) => {
                const yr = new Date(reviewDate).getFullYear().toString();
                if (yr === '2015') return dict;
                yearCount[yr] ??= 1;
                yearCount[yr] += 1;
                dict['difficulty'][yr] ??= [];
                dict['difficulty'][yr].push(difficulty < 0 ? 0 : difficulty);
                dict['review'][yr] ??= [];
                dict['review'][yr].push(rating < 0 ? 0 : rating);
                dict['workload'][yr] ??= [];
                dict['workload'][yr].push(workload < 0 ? 0 : workload);

                return dict;
            },
            { workload: {}, difficulty: {}, review: {} } as Record<
                StatKey,
                YearlyRecord
            >,
        ) ?? { workload: {}, difficulty: {}, review: {} },
    ).reduce(
        (dict, [statKey, yearDict]) => {
            const tmp = statKey as StatKey;
            dict[tmp] = Object.entries(yearDict).map(([year, data]) => ({
                x: year,
                y: (data.reduce((sum, c) => sum + c, 0) / data.length).toFixed(
                    1,
                ),
            }));
            return dict;
        },
        { workload: [], difficulty: [], review: [] } as Record<
            StatKey,
            Datum[]
        >,
    );
    const data: Serie[] = [
        {
            id: 'review',
            color: 'rgb(0, 255, 0)',
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

    return { data, yearCount };
};

function Line({ course }: IProps) {
    const { data, yearCount } = processData(course);
    return (
        <div className="w-[1280px] h-[600px] relative">
            <div className="w-[1280px] h-[600px] absolute top-0 z-10">
                <ResponsiveLine
                    enableSlices="x"
                    data={data.filter(d => d.id !== 'workload')}
                    theme={theme}
                    colors={['#2bb34f', '#9e0e0e']}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 0,
                        max: 5,
                        reverse: false,
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'year',
                        legendOffset: 36,
                        legendPosition: 'middle',
                        truncateTickAt: 0,
                        format: year =>
                            `${year} (${yearCount[year.toString()]})`,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'score',
                        legendOffset: -40,
                        legendPosition: 'middle',
                        truncateTickAt: 0,
                    }}
                    pointSize={14}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="data.yFormatted"
                    pointLabelYOffset={-12}
                    enableTouchCrosshair={true}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-left',
                            direction: 'column',
                            justify: false,
                            translateX: -65,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 100,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>
            <div className="w-[1280px] h-[600px] absolute top-0 z-0">
                <ResponsiveLine
                    isInteractive={false}
                    data={data.filter(d => d.id === 'workload')}
                    theme={theme}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 0,
                        max: 'auto',
                        reverse: false,
                    }}
                    colors={['#00c9bf']}
                    axisTop={null}
                    axisLeft={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'year',
                        legendOffset: 36,
                        legendPosition: 'middle',
                        truncateTickAt: 0,
                        format: year =>
                            `${year} (${yearCount[year.toString()]})`,
                    }}
                    axisRight={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'hours/week',
                        legendOffset: 40,
                        legendPosition: 'middle',
                        truncateTickAt: 0,
                    }}
                    pointSize={14}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="data.yFormatted"
                    pointLabelYOffset={-12}
                    enableTouchCrosshair={true}
                    enableGridX={false}
                    enableGridY={false}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default Line;
