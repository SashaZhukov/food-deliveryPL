"use client";

import Link from "next/link";
import {LuClipboardList, LuLayoutDashboard} from "react-icons/lu";
import {FiUsers} from "react-icons/fi";
import {BsBox2} from "react-icons/bs";
import {usePathname} from "next/navigation";


export default function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? 'bg-green-500 text-white' : 'border border-transparent hover:border-gray-800'

    return (
        <nav className="bg-white p-3 w-60 rounded-md ml-2 my-4">
            <div className="flex flex-row items-center gap-1 justify-center mt-2">
                <Link href="" className="font-bold text-green-500 text-2xl">
                    FoodlyGo
                </Link>
                <div className="items-start text-green-500 text-base mt-2">admin</div>
            </div>
            <hr className="text-gray-800 mt-4" style={{
                WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
            }}/>
            <ul className="flex flex-col gap-1 mt-4">
                <Link href="/admin/dashboard">
                    <li className={`flex text-lg font-light gap-2 items-center ${isActive('/admin/dashboard')} p-1 rounded-md`}>
                        <LuLayoutDashboard />
                        <div>
                            Dashboard
                        </div>
                    </li>
                </Link>
                <Link href="/admin/users">
                    <li className={`flex text-lg font-light gap-2 items-center ${isActive('/admin/users')} p-1 rounded-md`}>
                        <FiUsers className="text-lg"/>
                        <div className="text-lg font-light">
                            Users
                        </div>
                    </li>
                </Link>
                <Link href="">
                    <li className={`flex text-lg font-light gap-2 items-center ${isActive('/admin/products')} p-1 rounded-md`}>
                        <BsBox2 className="text-lg"/>
                        <div className="text-lg font-light">
                            Products
                        </div>
                    </li>
                </Link>
                <Link href="">
                    <li className={`flex text-lg font-light gap-2 items-center ${isActive('/admin/orders')} p-1 rounded-md`}>
                        <LuClipboardList className="text-lg"/>
                        <div className="text-lg font-light">
                            Orders
                        </div>
                    </li>
                </Link>
            </ul>
        </nav>
    );
}