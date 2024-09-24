import _catalog from './catalog';
import getCourse from './loader';

type CourseKeys = keyof typeof _catalog;

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

type CatalogEntry = {
    tags: string[];
    _updatedAt: string;
    isFoundational: boolean;
    isDeprecated: boolean;
    slug: string;
    _createdAt: string;
    _id: string;
    programs: {
        _ref: string;
        _type: string;
        _key: string;
    }[];

    codes: string[];
    textbooks?: {
        url: string;
        name: string;
        _key: string;
    }[];
    syllabus: {
        file: {
            _type: string;
            asset: {
                _ref: string;
                _type: string;
            };
        };
    };
    _type: string;
    name: string;
    _rev: string;
    id: string;
    description: string;
    creditHours: number;
    officialURL?: string;
    notesURL?: string;
    reviewCount: number;
    rating?: number;
    difficulty?: number;
    workload?: number;
};

type Catalog = Record<CourseKeys, CatalogEntry>;

// @ts-ignore
const catalog: Catalog = _catalog;

export { catalog, getCourse };
export type { Course, Review, CourseKeys, CatalogEntry, Catalog };
