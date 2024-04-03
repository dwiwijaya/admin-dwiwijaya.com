import React from "react";
import { Table } from "flowbite-react";
import getCollecction from "@/services/firebase/crud/getCollecction";
import skill from "@/pages/skill";

const SkillTable = ({ items }) => {
    return (
        <div className="overflow-x-auto bg-container">
            <div className="relative scrollbar-hide overflow-y-hidden shadow-md sm:rounded-lg card !p-2">
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
                        {items.result.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="flex gap-2 px-6 py-4 ">
                                    <i className="text-xl" dangerouslySetInnerHTML={{ __html: item.icon }} />
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">{item.type}</td>
                                <td className="px-6 py-4">{item.order}</td>
                                <td className="px-6 py-4 text-right flex gap-1 justify-end">
                                    <a href="#" className="action-btn action-btn-primary">
                                        <i className="bx bx-search"></i>
                                    </a>
                                    <a href="#" className="action-btn action-btn-warning">
                                        <i className="bx bx-edit"></i>
                                    </a>
                                    <a href="#" className="action-btn action-btn-danger">
                                        <i className="bx bx-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkillTable;
