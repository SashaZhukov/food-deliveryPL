"use client";

import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Modal from "../ui/Modal";

export default function Navbar() {
    const { user, loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) return null;

    return (
        <nav className="bg-white p-6 shadow-lg">
            <div className="flex items-center space-x-6 justify-between">
                <div>
                    <Link href="/" className="font-bold text-green-500 text-4xl">
                        FoodlyGo
                    </Link>
                </div>
                <div className="flex items-center flex-grow px-48 relative">
                    <input
                        className="w-full rounded-3xl px-4 h-10 border border-green-500 focus:outline-none pr-12 focus:ring-2 focus:ring-orange-500 placeholder-gray-400 focus:border-opacity-0"
                        placeholder="Szukaj..." type="text"
                    />
                    <CiSearch className="text-2xl text-gray-800 absolute right-52"/>
                </div>
                <div className="flex items-center gap-7">
                    <Link href="">
                        <TiShoppingCart className="size-8 text-green-500 hover:text-orange-500 focus:outline-none hover:scale-110 transition-transform duration-200 ease-in-out"/>
                    </Link>
                    <div className="text-green-700 text-2xl">|</div>
                    {user ? (
                        <Link href="/profile">
                            <FaUserCircle className="size-7 text-green-500 hover:text-orange-500 focus:outline-none hover:scale-110 transition-transform duration-200 ease-in-out"/>
                        </Link>
                    ) : (
                        <FaUserCircle onClick={() => setIsModalOpen(true)} className="size-7 text-green-500 hover:text-orange-500 focus:outline-none hover:scale-110 transition-transform duration-200 ease-in-out"/>
                    )}
                    <Modal isOpen={isModalOpen} isClose={() => setIsModalOpen(false)} />
                </div>
            </div>
        </nav>
    );
}
