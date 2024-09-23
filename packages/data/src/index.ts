import catalog from './catalog';
import getCourse from './loader';

type CourseKeys = keyof typeof catalog;

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

export { catalog, getCourse };
export type { Course, Review, CourseKeys };
