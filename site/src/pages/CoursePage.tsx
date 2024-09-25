import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Course, getCourse, CourseKeys } from 'data';
import Line from '../components/charts/Line';
import { HomeOutlined } from '@ant-design/icons';

interface Params {
    slug: CourseKeys;
}

function CoursePage() {
    const navigate = useNavigate();
    const { slug } = useParams() as unknown as Params;
    const [course, setCourse] = useState<Course | null>(null);
    useEffect(() => {
        async function fetch() {
            setCourse((await getCourse(slug)) as Course);
        }
        fetch();
    }, [slug]);

    if (course) {
        return (
            <div className="w-[1280px] h-[100vh]">
                <div
                    className="absolute top-5 left-5 cursor-pointer hover:text-blue-400 text-2xl"
                    onClick={() =>
                        navigate('/', {
                            replace: true,
                        })
                    }
                >
                    <HomeOutlined />
                </div>
                <Line course={course} />
            </div>
        );
    }
    return <>Loading...</>;
}

export default CoursePage;
