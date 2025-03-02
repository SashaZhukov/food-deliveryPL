import AdminBreadcrumbs from "./AdminBreadcrumbs";
import { RxBell } from "react-icons/rx";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import React from "react";


export default function AdminNavHeader() {
    return (
        <div className="flex items-center px-6 mt-4">
            <AdminBreadcrumbs />
            <input
                className="w-full mx-20 rounded-3xl px-4 h-10 border border-green-500 focus:outline-none pr-12 focus:ring-2 focus:ring-orange-500 placeholder-gray-400 focus:border-opacity-0"
                placeholder="Search" type="text"
            />
            <div className="flex flex-row gap-6 items-center text-xl text-gray-500">
                <AiOutlineSetting className="hover:text-gray-800 transition-transform duration-200 hover:scale-110"/>
                <RxBell className="hover:text-gray-800 transition-transform duration-200 hover:scale-110"/>
                <FaRegCircleUser className="hover:text-gray-800 transition-transform duration-200 hover:scale-110"/>
            </div>
        </div>
    );
}