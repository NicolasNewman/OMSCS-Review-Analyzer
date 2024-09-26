import { Course } from 'data';
import { HeatMapDatum, HeatMapSerie, ResponsiveHeatMap } from '@nivo/heatmap';
import { Serie, Datum } from '@nivo/line';
import theme from './theme';
import * as d3 from 'd3';

interface IProps {
    course: Course;
}

const reviewScale = d3.scaleLinear(
    [0, 3, 5],
    [d3.rgb(255, 0, 0), 'yellow', d3.rgb(0, 255, 0)],
);
const difficultyScale = d3.scaleLinear(
    [0, 3, 5],
    [d3.rgb(0, 255, 0), 'yellow', d3.rgb(255, 0, 0)],
);

// .domain([0, 5])
// .range([d3.rgb(255, 0, 0), d3.rgb(0,255,0)]);

type StatKey = 'review' | 'workload' | 'difficulty';
type YearlyRecord = Record<string, number[]>;

function HeatMap({ course }: IProps) {
    const yearCount: Record<string, number> = {};
    // TODO: a lot of -1 values (invalid?)
    // console.log(
    //     course.reviews?.filter(
    //         review =>
    //             new Date(review.reviewDate).getFullYear().toString() === '2015',
    //     ),
    // );
    let maxWorkload = 0;
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
            dict[tmp] = Object.entries(yearDict).map(([year, data]) => {
                const mean = parseFloat(
                    (data.reduce((sum, c) => sum + c, 0) / data.length).toFixed(
                        1,
                    ),
                );
                if (tmp === 'workload') {
                    if (mean > maxWorkload) {
                        maxWorkload = mean;
                    }
                }
                return {
                    x: year,
                    y: mean,
                };
            });
            return dict;
        },
        { workload: [], difficulty: [], review: [] } as Record<
            StatKey,
            HeatMapDatum[]
        >,
    );
    const data: HeatMapSerie<HeatMapDatum, Serie>[] = [
        {
            id: 'review',
            color: 'rgb(0, 255, 0)',
            data: review,
        },
        {
            id: 'difficulty',
            data: difficulty,
        },
        {
            id: 'workload',
            data: workload,
        },
    ];
    console.log(maxWorkload);
    const workloadScale = d3.scaleLinear(
        [0, maxWorkload],
        ['white', 'turquoise'],
    );
    console.log(data);
    return (
        <div className="w-[1280px] h-[600px] relative">
            <div className="w-[1280px] h-[600px] absolute top-0 z-10">
                <ResponsiveHeatMap
                    data={data}
                    theme={theme}
                    margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
                    valueFormat=">-.2s"
                    axisTop={{
                        tickSize: 5,
                        tickPadding: 5,
                        legend: '',
                        legendOffset: 46,
                        truncateTickAt: 0,
                        format: year =>
                            `${year} (${yearCount[year.toString()]})`,
                    }}
                    axisRight={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Metric',
                        legendPosition: 'middle',
                        legendOffset: 70,
                        truncateTickAt: 0,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Metric',
                        legendPosition: 'middle',
                        legendOffset: -72,
                        truncateTickAt: 0,
                    }}
                    colors={dat => {
                        if (dat.serieId === 'workload') {
                            return workloadScale(dat.data.y ?? 0).toString();
                        } else if (dat.serieId === 'review') {
                            return reviewScale(dat.data.y ?? 0).toString();
                        } else {
                            return difficultyScale(dat.data.y ?? 0).toString();
                        }
                    }}
                    emptyColor="#555555"
                    legends={[
                        {
                            anchor: 'bottom',
                            translateX: 0,
                            translateY: 30,
                            length: 400,
                            thickness: 8,
                            direction: 'row',
                            tickPosition: 'after',
                            tickSize: 3,
                            tickSpacing: 4,
                            tickOverlap: false,
                            tickFormat: '>-.2s',
                            title: 'Value →',
                            titleAlign: 'start',
                            titleOffset: 4,
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default HeatMap;
