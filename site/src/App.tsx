// import { useState } from 'react';
import './App.css';
import { catalog } from 'data';
import { Select } from 'antd';
import { useState } from 'react';
import CourseCard from './components/CourseCard';

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

const courseSearchFields = [
    ...Object.entries(catalog).reduce(
        (arr, [slug, { codes, reviewCount, isDeprecated }]) => {
            if (reviewCount > 0 && !isDeprecated) {
                arr.push({ label: slug.replace(/\-/g, ' '), value: slug });
                arr.push({ label: codes[0], value: codes[0] });
            }
            return arr;
        },
        [] as { value: string; label: string }[],
    ),
];

function App() {
    const [sortBy, setSortBy] = useState<SortType>('reviews');
    const [orderBy, setOrderBy] = useState<OrderType>('asc');
    const [searchFilter, setSearchFilter] = useState<string[]>([]);
    return (
        <div className="min-h-screen">
            <div className="text-4xl">OMSCS Course Reviews</div>
            <div className="mt-12">
                <div className="mb-4">
                    <Select
                        mode="multiple"
                        showSearch
                        optionFilterProp="label"
                        placeholder={'Search by name / code'}
                        options={courseSearchFields}
                        onChange={setSearchFilter}
                        style={{ width: 500 }}
                    />
                </div>
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
                    .filter(data =>
                        searchFilter.length > 0
                            ? searchFilter.includes(data.slug) ||
                              searchFilter.includes(data.codes[0])
                            : true,
                    )
                    .sort((a, b) => sortFunc[sortBy](a, b, orderBy))
                    .map(data => {
                        console.log(data);
                        return <CourseCard data={data} />;
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
        </div>
    );
}

export default App;
