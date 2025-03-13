"use client";

import React, {useState} from "react";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreatePage({ token }){
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [err, setErr] = useState("")
    const router = useRouter()

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
                credentials: "include",
                cache: "no-cache"
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (response.status === 422 && errorData.errors) {
                    const firstError = Object.values(errorData.errors)[0][0];
                    throw new Error(`${firstError}`);
                }

                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const data = await response.json();

            router.push('/admin/users')

            toast.success(`${data.message}`);

        } catch (error) {
            setErr(error.message);
        }
    }

    return (
        <div className="flex flex-col gap-4 w-[460px] mx-auto bg-white px-4 py-9 mt-20 h-fit">
            <div className="flex justify-center text-green-500 text-2xl font-bold">Create user</div>
            <form className="px-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label>First name</label>
                    <input className="border border-gray-400 rounded-md h-8 focus:outline-none px-2 focus:border-green-500"
                           placeholder="Enter first name"
                           type="text"
                           value={formData.first_name}
                           name="first_name"
                           onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Last name</label>
                    <input className="border border-gray-400 rounded-md h-8 focus:outline-none px-2 focus:border-green-500"
                           placeholder="Enter last name"
                           type="text"
                           value={formData.last_name}
                           name="last_name"
                           onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input className="border border-gray-400 rounded-md h-8 focus:outline-none px-2 focus:border-green-500"
                           placeholder="Enter email"
                           type="email"
                           value={formData.email}
                           name="email"
                           onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Password</label>
                    <input className="border border-gray-400 rounded-md h-8 focus:outline-none px-2 focus:border-green-500"
                           placeholder="Enter password"
                           type="password"
                           value={formData.password}
                           name="password"
                           onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Password confirmation</label>
                    <input className="border border-gray-400 rounded-md h-8 focus:outline-none px-2 focus:border-green-500"
                           placeholder="Enter password confirmation"
                           type="password"
                           value={formData.password_confirmation}
                           name="password_confirmation"
                           onChange={handleChange}
                    />
                </div>
                <button
                    className="mr-auto border border-green-500 text-green-500 rounded-lg px-4 py-1 mt-2 hover:text-orange-500 hover:border-orange-500"
                    type="submit">
                    Create
                </button>
                {err &&
                    <div className="bg-red-500 px-2 rounded-md py-1.5 text-white mt-[-4px]">{err}</div>
                }
            </form>
        </div>
    );
}