import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../config/config";
import { EllipsisOutlined, LeftOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons";
import { Mutation_Music } from "../../../common/Hock/Music/Mutation_Music";
import { message } from "antd";

const List_Music = () => {
    const [selectedStatus, setSelectedStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDropdown, setIsDropdown] = useState<number | null>(null);;
    const [isOpen, setIsOpen] = useState(false);
    const [limit, setLimit] = useState(10);
    const [isEdit, setIsEdit] = useState<string | number | null>(null);
    const { mutate } = Mutation_Music("DELETE")
    const { mutate: update_status } = Mutation_Music("UPDATE")
    const { mutate: reset_music } = Mutation_Music("RESET")
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    const { data, isLoading } = useQuery({
        queryKey: ["A", selectedStatus, currentPage, limit, debouncedSearch],
        queryFn: async () => {
            const { data } = await instance.get(`/sound_clouds/1?_status=${selectedStatus}&_page=${currentPage}&_limit=${limit}&_search=${debouncedSearch}`);
            return data;
        },
    });
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
    const handleDropdown = (id: number) => {
        if (isDropdown === id) {
            setIsDropdown(null);
        } else {
            setIsDropdown(id);
        }
    }
    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    const totalPages = data?.totalPages || 1;
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };
    const handleUpdate = (id: number | string, newStatus: any) => {
        console.log(id, newStatus);

        update_status({ id, status: newStatus });
        setIsEdit(null);
    };
    const handleEdit = (id: string | number) => {
        setIsEdit(isEdit === id ? null : id);
    }
    const handleCopy = async (item: any) => {
        const trackLines = item.track.flatMap((trackItem: string) => {
            return trackItem.split(',').map(t => t.trim());
        });
        const formattedText = `${item.link}\n${trackLines.join('\n')}\n`;
        try {
            await navigator.clipboard.writeText(formattedText);
            message.success('Đã sao chép vào');
        } catch (err) {
            message.error('Sao chép thất bại');
        }
    };
    if (isLoading) {
        return <div>loading...</div>;
    }
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col gap-5 justify-between mb-5">
                <div className="flex justify-between gap-3 items-center">
                    <div className="flex gap-3 items-center">
                        <p>Show</p>
                        <select className="border rounded py-1 px-3 outline-none" name="" id="" onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setCurrentPage(1);
                        }} value={limit}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <p>entries</p>
                    </div>
                    <button className="lg:hidden" onClick={handleOpen}><MenuOutlined style={{ fontSize: '18px' }} /></button>
                </div>
                <div className="flex justify-between gap-4">
                    {isOpen && (
                        <>
                            <button className="border rounded px-4 py-2 lg:hidden" onClick={reset_music}>Reset</button>
                            <input type="text" className="border w-1/2 px-2 py-1 rounded outline-none block lg:hidden"
                                placeholder="Tìm kiếm..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            <select
                                className="border px-2 rounded outline-none w-1/2 lg:hidden"
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="">Lọc trạng thái</option>
                                <option value="0">Chờ</option>
                                <option value="1">Xong</option>
                                <option value="2">Xóa</option>
                                <option value="3">Không Lời</option>
                                <option value="4">Không có người dùng</option>
                            </select>
                        </>

                    )}
                    <button className="border rounded px-4 py-2 hidden lg:block" onClick={reset_music}>Reset</button>
                    <div className="flex justify-end gap-4">
                        <input type="text" className="border w-[250px] px-2 py-1 rounded outline-none hidden lg:block" placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }} />
                        <select
                            className="border hidden lg:block py-1 px-2 rounded outline-none w-full"
                            value={selectedStatus}
                            onChange={(e) => {
                                setSelectedStatus(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">Lọc trạng thái</option>
                            <option value="0">Chờ</option>
                            <option value="1">Xong</option>
                            <option value="2">Xóa</option>
                            <option value="3">Không Lời</option>
                            <option value="4">Không có người dùng</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border">
                            <th className="border px-4 py-2">Id</th>
                            <th className="border px-4 py-2">Link</th>
                            <th className="border px-4 py-2">Count</th>
                            <th className="border px-4 py-2">Track</th>
                            <th className="border px-4 py-2">Scan</th>
                            <th className="border px-4 py-2">Number Song</th>
                            <th className="border px-4 py-2">Country</th>
                            <th className="border px-4 py-2">Views</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.docs?.map((item: any) => (
                            <tr key={item._id} className="border">
                                <td className="border px-4 py-2">{item.id}</td>
                                <td className="border px-4 py-2">{item.link}</td>
                                <td className="border px-4 py-2">{item.count}</td>
                                <td className="border px-4 py-2">{item.track}</td>
                                <td className="border px-4 py-2">{item.scan}</td>
                                <td className="border px-4 py-2">{item.number_of_songs}</td>
                                <td className="border px-4 py-2">{item.country}</td>
                                <td className="border px-4 py-2">{item.views}</td>
                                <td className="border px-4 py-2">
                                    {isEdit === item._id ? (
                                        <select
                                            value={item.status}
                                            onChange={(e) => handleUpdate(item._id, e.target.value)}
                                            className="border rounded py-1 px-2"
                                        >
                                            <option value="0">Chờ</option>
                                            <option value="1">Xong</option>
                                            <option value="2">Xóa</option>
                                            <option value="3">Không Lời</option>
                                            <option value="4">Không có người dùng</option>
                                        </select>
                                    ) : (
                                        item.status == 0 ? "Chờ" : item.status == 1 ? "Xong" : item.status == 2 ? "Xóa" : item.status == 3 ? "Không Lời" : "Không có người dùng"
                                    )}
                                </td>
                                <td className="relative flex items-center justify-center gap-4 px-4 py-2">
                                    <button className="lg:hidden" onClick={() => handleDropdown(item?.id)}>
                                        <EllipsisOutlined />
                                    </button>
                                    {isDropdown === item.id && (
                                        <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded w-28 z-10 lg:hidden">
                                            <ul>
                                                <li className="border-b hover:bg-gray-100">
                                                    <button className="w-full px-4 py-2 text-left" onClick={() => handleCopy(item)}>Copy</button>
                                                </li>
                                                <li className="border-b hover:bg-gray-100">
                                                    <button className="w-full px-4 py-2 text-left" onClick={() => handleEdit(item?._id)}>Edit</button>
                                                </li>
                                                <li className="hover:bg-gray-100">
                                                    <button className="w-full px-4 py-2 text-left" onClick={() => mutate(item?._id)}>Delete</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                    <button className="border rounded p-2 hidden lg:block" onClick={() => handleCopy(item)}>Copy</button>
                                    <button className="border rounded p-2 hidden lg:block" onClick={() => handleEdit(item?._id)}>Edit</button>
                                    <button className="border rounded p-2 hidden lg:block" onClick={() => mutate(item?._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination flex sm:flex-row gap-5 items-center justify-center mt-5">
                <button
                    className="border rounded p-2 hidden lg:block"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button className="lg:hidden" onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}><LeftOutlined /></button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button
                    className="border rounded p-2 hidden lg:block"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next

                </button>
                <button className="lg:hidden" onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}><RightOutlined /></button>
            </div>
        </div>

    );
}

export default List_Music