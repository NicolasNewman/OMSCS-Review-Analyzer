import catalog from './catalog';

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
    [key: string]: any;
    reviews?: Review[];
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

export { catalog };
export type { Course, Review };
