"use client";

import {FaAddressCard, FaRegUserCircle} from "react-icons/fa";
import {IoHome} from "react-icons/io5";
import {MdErrorOutline, MdOutlineCardGiftcard, MdOutlinePayment} from "react-icons/md";
import {LuMessageSquareMore} from "react-icons/lu";
import {FaBoxOpen} from "react-icons/fa6";
import {FiHeart} from "react-icons/fi";
import {TbLogout2} from "react-icons/tb";
import React from "react";

export default function Sidebar({ isActiveSection, setIsActiveSection}) {
    const isActive = (link) => isActiveSection === link ? 'bg-orange-500' : 'bg-white'

    return (
        <nav className="flex-col w-72">
            <div className="bg-white rounded-md">
                <div className="p-5 flex flex-row items-center gap-7">
                    <FaRegUserCircle className="text-7xl"/>
                    <div className="flex-row items-center">
                        Hej, Aliaksandr Zhukau
                    </div>
                </div>
            </div>
            <div className="bg-white flex-col gap-4 mt-2 rounded-md">
                <ul className="flex-col gap-14">
                    <div className={`h-10 w-[3px] ${isActive("details")} absolute mt-1`}></div>
                    <div className="flex items-center h-12 ml-6 gap-5">
                        <FaAddressCard className="text-xl"/>
                        <li className="font-light text-green-500 hover:text-orange-500 hover:underline transition duration-300 cursor-pointer text-base"
                            onClick={() => setIsActiveSection("details")}>
                            Moje dane
                        </li>
                    </div>
                    <hr className="text-gray-800 h-1 w-[230px] ml-auto"/>
                    <div className={`h-10 w-[3px] ${isActive("address")} absolute mt-1`}></div>
                    <div className="flex items-center h-12 ml-6 gap-5">
                        <IoHome className="text-xl"/>
                        <li className="font-light text-green-500 hover:text-orange-500 hover:underline transition duration-300 cursor-pointer text-base"
                            onClick={() => setIsActiveSection("address")}>
                            Adres
                        </li>
                    </div>
                    <hr className="text-gray-800 h-1 w-[230px] ml-auto"/>
                    <div className={`h-10 w-[3px] ${isActive("payments-method")} absolute mt-1`}></div>
                    <div className="flex items-center h-12 ml-6 gap-5">
                        <MdOutlinePayment className="text-xl"/>
                        <li className="font-light text-green-500 hover:text-orange-500 hover:underline transition duration-300 cursor-pointer text-base"
                            onClick={() => setIsActiveSection("payments-method")}>Metoda
                            płatności
                        </li>
                    </div>
                    <hr className="text-gray-800 h-1 w-[230px] ml-auto"/>
                    <div className={`h-10 w-[3px] ${isActive("contact-preferences")} absolute mt-1`}></div>
                    <div className="flex items-center h-12 ml-6 gap-5">
                        <LuMessageSquareMore className="text-xl"/>
                        <li className="font-light text-green-500 hover:text-orange-500 hover:underline transition duration-300 cursor-pointer text-base"
                            onClick={() => setIsActiveSection("contact-preferences")}>Preferencje
                            kontaktów
                        </li>
                    </div>
                </ul>
            </div>
            <div className="bg-white flex-col gap-4 mt-2 rounded-md">
                <ul className="flex-col gap-14">
                    <div className={`h-10 w-[3px] ${isActive("my-orders")} absolute mt-1`}></div>
                    <div className="flex items-center h-12 ml-6 gap-5">
                        <FaBoxOpen className="text-xl"/>
                        <li className="font-light text-green-500 hover:text-orange-500 hover:underline transition duration-300 cursor-pointer text-base"
                            onClick={() => setIsActiveSection("my-orders")}>
                            Moje zamówienia
                        </li>
                    </div>
                    <hr className="text-gray-800 h-1 w-[230px] ml-auto"/>
                    <div className={`h-10 w-[3px] ${isActive("favorites")} absolute mt-1`}></div>
                    <div className="flex items-center h-12 ml-6 gap-5">
                        <FiHeart className="text-xl"/>
                        <li className="font-light text-green-500 hover:text-orange-500 hover:underline transition duration-300 cursor-pointer text-base"
                            onClick={() => setIsActiveSection("favorites")}>
                            Ulubione
                        </li>
                    </div>
                    <hr className="text-gray-800 h-1 w-[230px] ml-auto"/>
                    <div className={`h-10 w-[3px] ${isActive("need-help")} absolute mt-1`}></div>
                    <div className="flex items-center h-12 ml-6 gap-5">
                        <MdErrorOutline className="text-xl"/>
                        <li className="font-light text-green-500 hover:text-orange-500 hover:underline transition duration-300 cursor-pointer text-base"
                            onClick={() => setIsActiveSection("need-help")}>
                            Potrzebna pomoc?
                        </li>
                    </div>
                </ul>
            </div>
            <div className="bg-white flex-col gap-4 mt-2 rounded-md">
                <ul className="flex-col gap-14">
                    <div className={`h-10 w-[3px] ${isActive("gift-card")} absolute mt-1`}></div>
                    <div className="flex items-center h-12 ml-6 gap-5">
                        <MdOutlineCardGiftcard className="text-xl"/>
                        <li className="font-light text-green-500 hover:text-orange-500 hover:underline transition duration-300 cursor-pointer text-base"
                            onClick={() => setIsActiveSection("gift-card")}>
                            Karty podarunkowe
                        </li>
                    </div>
                </ul>
            </div>
            <div className="bg-white flex-col gap-4 mt-2 rounded-md">
                <ul className="flex-col gap-14">
                    <div className="flex items-center h-12 ml-6 gap-5">
                        <TbLogout2 className="text-xl"/>
                        <li className="font-light text-green-500 hover:text-orange-500 hover:underline transition duration-300 cursor-pointer text-base">
                            Wylogowanie
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    );
}