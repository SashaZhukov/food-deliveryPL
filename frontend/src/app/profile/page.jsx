import '../globals.css';
import { cookies } from 'next/headers';
import config from "../../config";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import React from "react";
import {redirect} from "next/navigation";
import ProfileContent from "../../components/profile/ProfileContent";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
        redirect('/');
    }

    let user = null;


    try {
        const res = await fetch(`${config.API_URL}/api/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            cache: 'no-store'
        });

        if (res.ok) {
            user = await res.json();
        } else {
            redirect('/')
        }
    } catch (error) {
        console.error('', error);
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

