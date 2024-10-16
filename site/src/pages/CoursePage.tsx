import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Course, getCourse, CourseKeys } from 'data';
import Line from '../components/charts/Line';
import { HomeOutlined } from '@ant-design/icons';
import HeatMap from '../components/charts/HeatMap';
import Timeline from '../components/charts/Timeline';
import Footer from '../components/Footer';
// import Timeline from '../components/charts/Timeline';

interface Params {
    slug: CourseKeys;
}

function CoursePage() {
    const navigate = useNavigate();
    const { slug } = useParams() as unknown as Params;
    const [course, setCourse] = useState<Course | null>(null);
    const [filter, setFilter] = useState<number | null>(null);
    useEffect(() => {
        async function fetch() {
            setCourse((await getCourse(slug)) as Course);
        }
        fetch();
    }, [slug]);
    if (course) {
        return (
            <div className="w-[1280px] h-[100vh]">
                <div className="text-2xl mb-4">{course.name}</div>
                <div>{course.description}</div>
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
                <HeatMap
                    course={course}
                    cb={data =>
                        setFilter(parseInt(data.data.x.toString()) ?? 0)
                    }
                />
                <Timeline course={course} filter={filter} />
                <Footer />
            </div>
        );
    }
    return <>Loading...</>;
}

export default CoursePage;
