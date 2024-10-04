// import { useState } from 'react';
import './App.css';
import { catalog } from 'data';
import { Select } from 'antd';
import { useState } from 'react';
import CourseCard from './components/CourseCard';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState<SortType>('reviews');
    const [orderBy, setOrderBy] = useState<OrderType>('asc');
    const [searchFilter, setSearchFilter] = useState<string>('');
    return (
        <div className="min-h-screen">
            <div className="text-4xl">OMSCS Course Reviews</div>
            <div className="mt-12">
                <div className="mb-4">
                    <Select
                        showSearch
                        optionFilterProp="label"
                        searchValue={searchFilter}
                        placeholder={'Search by name / code'}
                        options={courseSearchFields}
                        onSelect={e =>
                            navigate(`/course/${e}`, { replace: true })
                        }
                        onSearch={e => {
                            // TODO track last keypress instead (del / click)
                            if (e.length === 0 && searchFilter.length > 1)
                                return;
                            setSearchFilter(
                                e.toLowerCase().replace(/[^A-z0-9 ]/g, ''),
                            );
                        }}
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
                            ? data.slug
                                  .toLowerCase()
                                  .replace(/-/g, ' ')
                                  .replace(/[^A-z0-9 ]/g, '')
                                  .includes(searchFilter) ||
                              data.codes[0].includes(searchFilter)
                            : true,
                    )
                    .sort((a, b) => sortFunc[sortBy](a, b, orderBy))
                    .map(data => {
                        return <CourseCard data={data} />;
                    })}
            </div>
            <Footer />
        </div>
    );
}

export default App;
