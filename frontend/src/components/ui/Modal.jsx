import React, {useEffect, useState} from "react";
import { RxCross1 } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { toast } from 'react-hot-toast';
import { useAuth } from "../../context/AuthContext";


export default function Modal({isOpen, isClose}) {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const handleClearOnClose = () => {
        setEmail('');
        setPassword('');
        setErr('');
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                isClose();
                handleClearOnClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, isClose]);

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            isClose();
            handleClearOnClose();
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
                method: 'GET',
                credentials: 'include'
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: "include"
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

            login(data)

            isClose();

            toast.success(`${data.message}`);

        } catch (error) {
            setErr(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div onClick={handleClickOutside} className="fixed flex justify-center items-center bg-black inset-0 bg-opacity-50">
            <div className={err ? "bg-white w-[460px] h-[480px] rounded-lg relative" : "bg-white w-[460px] h-[460px] rounded-lg relative"}>
                <RxCross1 onClick={() => isClose() || handleClearOnClose()} className="h-8 w-8 absolute text-black rounded-full p-1.5 ml-auto mb-4 cursor-pointer top-1 right-1"/>
                <div className="flex flex-col gap-1 mt-7">
                    <div className="flex justify-center font-bold text-3xl">Zaloguj się</div>
                    <div className="px-8 mt-1 text-center font-light text-sm">
                        Twój profil zostanie utworzony podczas składania pierwszego zamówienia
                    </div>
                </div>
                <form className="flex flex-col gap-4 px-8 mt-7" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label>Twój adres e-mail</label>
                        <input className="border border-gray-400 rounded-md h-9 focus:outline-none px-2"
                               placeholder="Twój e-mail"
                               type="email"
                               value={email}
                               onChange={handleEmailChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Twoje hasło</label>
                        <div className="flex items-center relative">
                            <input className="border border-green-500 rounded-md h-9 focus:outline-none px-2 w-full"
                                   placeholder="Twoje hasło"
                                   type={isVisible ? "text" : "password"}
                                   value={password}
                                   onChange={handlePasswordChange}
                            />
                            { isVisible ?
                                <FaRegEye onClick={() => setIsVisible(!isVisible)} className="absolute text-gray-400 right-3 cursor-pointer"/> :
                                <FaRegEyeSlash onClick={() => setIsVisible(!isVisible)} className="absolute right-3 text-gray-400 cursor-pointer"/> }
                        </div>
                        <Link href="" className="text-sm text-end text-green-500">Zapomniałeś hasło?</Link>

                    </div>
                    <button type="submit" className="bg-green-500 mt-1 text-white py-1.5 rounded-md">Zalogować się</button>
                    {err &&
                        <div className="bg-red-500 px-2 rounded-md py-1.5 text-white mt-[-4px]">{err}</div>
                    }
                </form>
                <hr className={err ? "mt-3 bg-gray-200 h-[2px]" : "mt-10 bg-gray-200 h-[2px]"}/>
            </div>
        </div>
    );
}