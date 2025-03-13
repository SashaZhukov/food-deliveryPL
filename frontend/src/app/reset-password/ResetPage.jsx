"use client";

import React, {useState} from "react";
import GreenButton from "../../components/ui/GreenButton";
import config from "../../config";
import {toast} from "react-hot-toast";
import Link from "next/link";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";

export default function Page({ error = null, token, email}) {
    if (error) {
        return (
            <div className="flex justify-center align-content-center">
                {error?.message}
            </div>
        );
    }


    const [formData, setFormData] = useState([
        {name: "password", label: "Password", value: ""},
        {name: "password_confirmation", label: "Password confirmation", value: ""},
    ])

    const [err, setError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const handleChange = (event) => {
        const {name, value} = event.target

        setFormData(prevState =>
            prevState.map(field =>
                field.name === name ? {...field, value} : field
            )
        );
    }

    const saveData = async (event) => {
        event.preventDefault()

        const dataToSend = formData.reduce((obj, field) => {
            obj[field.name] = field.value
            return obj
        }, {})

        dataToSend.token = token
        dataToSend.email = email

        try {
            const response = await fetch(`${config.API_URL}/api/save-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json()

            if (response.status === 200) {
                setIsSuccess(true)
                toast.success(data.message)

            }

            setError(data.message)

            } catch (error) {
            console.error('Request error', error);
            setError(error || 'An error occurred when sending the request');
            }

        }

    return (
        <div className="flex flex-col justify-center gap-12 items-center min-h-screen">
            {isSuccess ? (
                <Link href="/">
                    <GreenButton label={"Back to home Page"} />
                </Link>
            ) : (
                <form className="flex flex-col gap-4 max-w-sm w-full" onSubmit={saveData}>
                    <div className="flex justify-center text-green-500 text-3xl font-bold">
                        Change your password
                    </div>
                    {formData.map(({name, value, label}, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <label className="text-lg">{label}</label>
                            <div className="flex items-center relative">
                                <input type={isVisible ? 'text' : 'password'}
                                       name={name}
                                       value={value}
                                       onChange={handleChange}
                                       className="border border-green-500 pl-2 h-9 rounded-lg w-full focus:outline-none placeholder:text-sm"
                                       placeholder="Enter new password"
                                />
                                {isVisible ?
                                    <FaRegEye onClick={() => setIsVisible(!isVisible)}
                                              className="absolute text-gray-400 right-3 cursor-pointer"/> :
                                    <FaRegEyeSlash onClick={() => setIsVisible(!isVisible)}
                                                   className="absolute right-3 text-gray-400 cursor-pointer"/>}
                            </div>
                        </div>
                    ))}
                    {err && (
                        <div className="bg-red-500 px-2 rounded-md py-1.5 text-white mt-[-4px]">
                            {err}
                        </div>
                    )}
                    <GreenButton label={"Save"}/>
                </form>
            )}
        </div>
    );

}