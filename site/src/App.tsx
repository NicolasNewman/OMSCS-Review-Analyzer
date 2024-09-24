// import { useState } from 'react';
import './App.css';
import { catalog } from 'data';
import { Card, Select, Tooltip } from 'antd';
import {
    BookOutlined,
    HomeOutlined,
    PaperClipOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

type SortType = 'reviews' | 'workload' | 'rating' | 'difficulty';
type OrderType = 'asc' | 'dsc';

const sortFunc: Record<
    SortType,
    (
        a: (typeof catalog)[keyof typeof catalog],
        b: (typeof catalog)[keyof typeof catalog],
        order: OrderType,
    ) => number
> = {
    rating: (a, b, order) =>
        order === 'asc'
            ? (b.rating ?? 0) - (a.rating ?? 0)
            : (a.rating ?? 0) - (b.rating ?? 0),
    difficulty: (a, b, order) =>
        order === 'asc'
            ? (b.difficulty ?? 0) - (a.difficulty ?? 0)
            : (a.difficulty ?? 0) - (b.difficulty ?? 0),
    reviews: (a, b, order) =>
        order === 'asc'
            ? b.reviewCount - a.reviewCount
            : a.reviewCount - b.reviewCount,
    workload: (a, b, order) =>
        order === 'asc'
            ? (b.workload ?? 0) - (a.workload ?? 0)
            : (a.workload ?? 0) - (b.workload ?? 0),
};

function App() {
    const [sortBy, setSortBy] = useState<SortType>('reviews');
    const [orderBy, setOrderBy] = useState<OrderType>('asc');
    return (
        <>
            <div className="text-4xl">OMSCS Course Reviews</div>
            <div className="mt-12">
                <span className="mr-2">Sort by:</span>
                <Select<SortType>
                    defaultValue={sortBy}
                    style={{ width: 120 }}
                    onChange={setSortBy}
                    options={[
                        { value: 'reviews', label: 'Reviews' },
                        { value: 'workload', label: 'Workload' },
                        { value: 'rating', label: 'Rating' },
                        { value: 'difficulty', label: 'Difficulty' },
                    ]}
                />
                <span className="ml-6 mr-2">Order by:</span>
                <Select<OrderType>
                    defaultValue={orderBy}
                    style={{ width: 120 }}
                    onChange={setOrderBy}
                    options={[
                        { value: 'asc', label: 'Ascending' },
                        { value: 'dsc', label: 'Descending' },
                    ]}
                />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.values(catalog)
                    .filter(data => !data.isDeprecated && data.reviewCount > 0)
                    .sort((a, b) => sortFunc[sortBy](a, b, orderBy))
                    .map(data => {
                        console.log(data);
                        return (
                            <div key={data.slug}>
                                <Tooltip title={data.name} placement="top">
                                    <Card
                                        hoverable
                                        title={`${data.codes[0]}: ${data.name}`}
                                        style={{ width: 300 }}
                                        actions={[
                                            data.officialURL ? (
                                                <a href={data.officialURL}>
                                                    <HomeOutlined />
                                                </a>
                                            ) : (
                                                <div className="h-[22px]"></div>
                                            ),
                                            data.textbooks?.[0].url ? (
                                                <a
                                                    href={
                                                        data.textbooks?.[0].url
                                                    }
                                                >
                                                    <BookOutlined />
                                                </a>
                                            ) : (
                                                <div className="h-[22px]"></div>
                                            ),
                                            data.notesURL ? (
                                                <a href={data.notesURL}>
                                                    <PaperClipOutlined />
                                                </a>
                                            ) : (
                                                <div className="h-[22px]"></div>
                                            ),
                                        ]}
                                    >
                                        {/* <div>{data?.description ?? ''}</div> */}
                                        <div className="grid grid-cols-2">
                                            <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                                                Reviews:
                                            </div>
                                            <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                                                {' '}
                                                {data.reviewCount}
                                            </div>
                                            <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                                                Workload:
                                            </div>
                                            <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                                                {data.workload?.toFixed(2) ??
                                                    'NaN'}
                                            </div>
                                            <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                                                Rating:
                                            </div>
                                            <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                                                {data.rating?.toFixed(2) ??
                                                    'NaN'}
                                            </div>
                                            <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                                                Difficulty:
                                            </div>
                                            <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                                                {data.difficulty?.toFixed(2) ??
                                                    'NaN'}
                                            </div>
                                        </div>
                                    </Card>
                                </Tooltip>
                            </div>
                        );
                    })}
            </div>
            <div className="mt-8">
                <div>
                    Website created by{' '}
                    <a href="https://github.com/NicolasNewman">
                        @NicolasNewman
                    </a>
                </div>
                <div>
                    Data provided by{' '}
                    <a href="https://www.omscentral.com/">OMSCSCentral.com</a>
                </div>
                <div>Source code</div>
                <div>Last updated: TODO</div>
            </div>
        </>
    );
}

export default App;
