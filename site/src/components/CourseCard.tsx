import { Card, Tooltip } from 'antd';
import {
    BookOutlined,
    HomeOutlined,
    PaperClipOutlined,
} from '@ant-design/icons';
import type { CatalogEntry } from 'data';

interface IProps {
    data: CatalogEntry;
}

function CourseCard({ data }: IProps) {
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
                            <a href={data.textbooks?.[0].url}>
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
                            {data.workload?.toFixed(2) ?? 'NaN'}
                        </div>
                        <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                            Rating:
                        </div>
                        <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                            {data.rating?.toFixed(2) ?? 'NaN'}
                        </div>
                        <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                            Difficulty:
                        </div>
                        <div className="odd:text-end odd:mr-2 even:ml-2 even:text-start">
                            {data.difficulty?.toFixed(2) ?? 'NaN'}
                        </div>
                    </div>
                </Card>
            </Tooltip>
        </div>
    );
}

export default CourseCard;
