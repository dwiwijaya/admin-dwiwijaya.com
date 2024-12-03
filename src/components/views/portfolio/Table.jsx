import React, { useEffect, useState } from 'react';
import { fetcher } from '@/services/fetcher';
import useSWR, { mutate } from 'swr';
import { deleteDocument } from '@/services/firebase/crud/deleteDocument';
import { Button, Modal, Pagination } from 'flowbite-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import PopupModal from '@/components/elements/PopupModal';
import ButtonActionColumn from '@/components/elements/ButtonActionColumn';
import { deleteFile } from '@/services/firebase/fileHandler';

const portfolioTable = ({ data }) => {
    const [openModal, setOpenModal] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const [deleteItemId, setDeleteItemId] = useState(null); 
    const [Filepath, setFilepath] = useState(null); 
    
    const handleDeleteClick = (id, filepath) => {
        setDeleteItemId(id);
        setFilepath(filepath);
        setOpenModal(true);
    }
    const handleDelete = async (id) => {
        try {
            setIsLoading(true)
            const deleteImage = await deleteFile(Filepath);
            const { result } = await deleteDocument('portfolios', id,);
            if (result) {
                setOpenModal(false);
                mutate('/api/portfolio');
                toast.success('Data deleted successfully');
            }
        }
        catch (e) {
            setIsLoading(false)
            console.log('Err:', e.message);
            toast.error('Data delete failed');
        } finally {
            setIsLoading(false)
        }
    };
    
    const pageSize = 10;
    const totalPages = Math.ceil(data?.length / pageSize);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const visibleData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    let order = (currentPage - 1) * pageSize + 1

    return (
        <div className="">
            <div className="overflow-x-auto bg-container relative scrollbar-hide overflow-y-hidden sm:rounded-lg card !p-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                            <th className='px-6 py-4 m'>#</th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                                <td className='px-6 py-4 m'>{order++}</td>
                                <td className="flex gap-2 px-6 py-4 ">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">{item.type}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4 text-right flex gap-1 justify-end">
                                    <ButtonActionColumn route="portfolio" id={item.id} file={item.image} onDeleteClick={() => handleDeleteClick(item.id, item.thumbnail)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PopupModal msg="Are u sure to delete this item ?" openModal={openModal} setOpenModal={setOpenModal} handleConfirm={() => handleDelete(deleteItemId)} isLoading={IsLoading} />

            <Pagination className='mt-3 mb-5 float-right' currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} showIcons />

        </div>
    );
};

export default portfolioTable;
