import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Course, getCourse, CourseKeys } from 'data';

interface Params {
    slug: CourseKeys;
}

function CoursePage() {
    const { slug } = useParams() as unknown as Params;
    const [course, setCourse] = useState<Course | null>(null);
    useEffect(() => {
        async function fetch() {
            setCourse((await getCourse(slug)) as Course);
        }
        fetch();
    }, [slug]);

    if (course) {
        return <>{course.name}</>;
    }
    return <>Loading...</>;
}

export default CoursePage;
