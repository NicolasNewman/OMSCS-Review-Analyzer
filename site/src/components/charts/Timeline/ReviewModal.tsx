import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Modal, Space, Table, TableProps } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { Review } from 'data';
import { useRef, useState } from 'react';

interface IProps {
    reviews: Review[];
    semester: string;
    setModalContent: React.Dispatch<
        React.SetStateAction<{
            reviews: Review[];
            semester: string;
        }>
    >;
}
type TableData = Review;

function ReviewModal({ reviews, semester, setModalContent }: IProps) {
    const searchInput = useRef<InputRef>(null);
    const [_searchText, setSearchText] = useState('');

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const cols: TableProps<TableData>['columns'] = [
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: 80,
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty',
            width: 100,
            sorter: (a, b) => a.difficulty - b.difficulty,
        },
        {
            title: 'Workload',
            dataIndex: 'workload',
            key: 'workload',
            width: 100,
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Date',
            dataIndex: 'reviewDate',
            key: 'reviewDate',
            width: 100,
            sorter: (a, b) =>
                new Date(a.reviewDate).getTime() -
                new Date(b.reviewDate).getTime(),
        },
        {
            title: 'Review',
            dataIndex: 'review',
            key: 'review',
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                close,
            }) => (
                <div className="p-2" onKeyDown={e => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        placeholder="Search reviews"
                        value={selectedKeys[0]}
                        onChange={e =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : [],
                            )
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys as string[], confirm)
                        }
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(selectedKeys as string[], confirm)
                            }
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() =>
                                clearFilters && handleReset(clearFilters)
                            }
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setSearchText((selectedKeys as string[])[0]);
                            }}
                        >
                            Filter
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            close
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined
                    style={{ color: filtered ? '#1677ff' : undefined }}
                />
            ),
            onFilter: (value, record) =>
                record.review
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
            onFilterDropdownOpenChange: visible => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
    ];

    return (
        <Modal
            title={`${semester} reviews`}
            open={reviews.length > 0}
            onOk={() => {
                setModalContent({
                    reviews: [],
                    semester: '',
                });
            }}
            centered
            width={1200}
            cancelButtonProps={{ hidden: true }}
            closable={false}
            okText="Close"
        >
            <Table<TableData>
                columns={cols}
                dataSource={reviews}
                scroll={{ y: '500px' }}
                pagination={false}
            />
        </Modal>
    );
}

export default ReviewModal;
