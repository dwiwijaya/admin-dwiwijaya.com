import React, { useEffect, useState } from 'react';
import { fetcher } from '@/services/fetcher';
import useSWR, { mutate } from 'swr';
import { deleteDocument } from '@/services/firebase/crud/deleteDocument';
import { Button, Modal } from 'flowbite-react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Link from 'next/link';

const SkillTable = () => {
    const [openModal, setOpenModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to delete
    const { data } = useSWR('/api/skill', fetcher);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1); // State to store current page
    const pageSize = 10; // Number of items per page

    const handleDelete = async (id) => {
        const { result, error } = await deleteDocument('skills', id); // Corrected to use the passed id
        if (result) {
            setOpenModal(false);
            router.push('/skill');
            mutate('/api/skill');
            toast.success('Data deleted successfully');
        }
        console.log(result);
    };

    const totalPages = Math.ceil(data?.length / pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const visibleData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="">
            <div className="overflow-x-auto bg-container relative scrollbar-hide overflow-y-hidden shadow-md sm:rounded-lg card !p-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="flex gap-2 px-6 py-4 ">
                                    <i
                                        className="text-xl"
                                        dangerouslySetInnerHTML={{ __html: item.icon }}
                                    />
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">{item.type}</td>
                                <td className="px-6 py-4">{item.order}</td>
                                <td className="px-6 py-4 text-right flex gap-1 justify-end">
                                    <Link href={`/skill/${item.id}`} className="action-btn action-btn-primary">
                                        <i className="bx bx-search"></i>
                                    </Link>
                                    <Link
                                        href={`/skill/update/${item.id}`}
                                        className="action-btn action-btn-warning"
                                    >
                                        <i className="bx bx-edit"></i>
                                    </Link>
                                    <a
                                        onClick={() => {
                                            setDeleteItemId(item.id);
                                            setOpenModal(true);
                                        }}
                                        className="action-btn action-btn-danger"
                                    >
                                        <i className="bx bx-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)} size="sm">
                <Modal.Body>
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-10 w-10 text-slate-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 rounded-md p-1 flex items-center justify-center text-xl">
                            <i className="icon-exclamation"></i>
                        </div>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this item?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button className="btn" onClick={() => handleDelete(deleteItemId)}>
                                Yes, I'm sure
                            </button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Pagination */}
            <div className="flex justify-start mt-4">
                <nav className="block">
                    <ul className="flex gap-1 pl-0 rounded list-none flex-wrap">
                        <li>
                            <button disabled={currentPage - 1 == 0} className={`btn !block !bg-container ${currentPage - 1 == 0 ? '!text-subtext !border-stroke hover:border-stroke' : ''}`} onClick={() => handlePageChange(currentPage - 1)}>
                                <i className="bx bx-chevron-left"></i> </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`btn ${currentPage === index + 1 ? 'active' : '!bg-container'} `}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button disabled={currentPage + 1 > totalPages} className={`btn !block !bg-container ${currentPage + 1 > totalPages ? '!text-subtext !border-stroke hover:border-stroke' : ''}`} onClick={() => handlePageChange(currentPage + 1)}>
                                <i className="bx bx-chevron-right"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SkillTable;
