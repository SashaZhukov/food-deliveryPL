import '../globals.css';
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import React from "react";
import ProfileContent from "../../components/profile/ProfileContent";
import {getUser} from "../../utils/getUser";
import {redirect} from "next/navigation";

export default async function Page() {

    const user = await getUser();

    if (!user) {
        console.error('User is null, redirecting to home page.');
        redirect('/');
    }

    return (
        <div className="px-48 bg-custom-gray h-full min-h-screen">
            <header className="flex justify-start items-center pt-10">
                <div className="flex flex-col gap-5">
                    <Link href="/" className="font-bold text-green-500 text-4xl">
                        FoodlyGo
                    </Link>
                </div>
                <div className="font-bold text-gray-800 text-2xl ml-auto mr-72">
                    MY ACCOUNT
                </div>
            </header>
            <div className="flex flex-row gap-2 mt-6 items-center">
                <Link href="/"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 hover:text-gray-900 transition duration-300 shadow-md">
                    <IoArrowBack className="text-lg"/>
                    <span className="text-base font-light">powrót</span>
                </Link>
            </div>

            <div className="mt-10">
                <ProfileContent user={user}/>
            </div>
        </div>
    )
}

