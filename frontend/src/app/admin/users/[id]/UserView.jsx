"use client";
import {toast} from "react-hot-toast";
import {useState} from "react";
import { RxCross2 } from "react-icons/rx";
import RedButton from "../../../../components/ui/RedButton";
import { useRouter } from "next/navigation";
import config from "../../../../config";

export default function UserView({ user = null, roles = null, errors = null, token}) {
    if (errors) {
        toast.error(errors)
        return (
            <div className="flex justify-center mt-56 text-4xl">
                Page not found
            </div>
        );
    }

    if (user && roles) {
        const [formData, setFormData] = useState([
            { name: "first_name", label: "First Name", value: user.first_name },
            { name: "last_name", label: "Last Name", value: user.last_name },
            { name: "email", label: "Email", value: user.email },
            { name: "role", label: "User Role", value: user.role.name },
        ]);

        const [editField, setEditField] = useState(null)
        const router = useRouter();
        const handleToggleEdit = (FieldName) => {
            if (editField && editField !== FieldName) {
                toast.error("Finish editing the current field first!")
                return;
            }

            setEditField(editField === FieldName ? null : FieldName)
        }
        const handleChange = (event) => {
            const {name, value} = event.target;

            setFormData(prevState =>  prevState.map(field =>
                field.name === name ? {...field, value} : field
            ))
        }

        const saveData = async (event) => {
            event.preventDefault();

            const updatedData = {}

            formData.forEach(field => {
                if (field.name === 'role') {
                    if (field.value !== user.role.name) {
                        updatedData[field.name] = field.value;
                    }
                } else if (user[field.name] !== field.value) {
                    updatedData[field.name] = field.value;
                }
            });

            if (Object.keys(updatedData).length === 0) {
                toast.error("No changes detected!");
                return;
            }

            try {
                const response = await fetch(`${config.API_URL}/api/admin/users/${user.id}/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include',
                    body: JSON.stringify(updatedData)
                });

                if (!response.ok) {
                   const error = await response.json();
                    toast.error(error.message);
                }

                const success = await response.json()
                closeEditSection();
                location.reload();
                toast.success(success.message);
            } catch (error) {
                console.error('Error while updating user:', error);
                toast.error('Error while updating user');
            }
        }

        const sendResetPass = async (event) => {
            event.preventDefault();
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/forgot-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: user.email
                    })
                });

                const data = await response.json()

                if (response.status === 200) {
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }

            } catch (error) {

            }
        }

        const deleteUser = async (event) => {
            event.preventDefault();

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${user.id}/delete`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include',
                });

                const data = await response.json()

                if (response.status === 200) {
                    router.push('/admin/users')
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

        const closeEditSection = (name) => {
            setEditField(null);

            setFormData(prevState =>
                prevState.map(field => {
                    if (field.name === name) {
                        return {
                            ...field,
                            value: name === "role" ? user.role.name : name === "password" ? "" : user[name]
                        };
                    }
                    return field;
                })
            );
        };

        return (
            <div className="flex flex-col mt-3 gap-10 px-12">
                <div className="flex flex-row items-center ml-auto gap-10">
                    <button
                        className="border border-white text-white py-2 px-2.5 transition-transform duration-300 hover:text-green-500 hover:border-green-500 hover:scale-105 hover:bg-white rounded-lg bg-green-500">Orders
                        history
                    </button>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col bg-white w-full h-fit rounded-lg p-8">
                        {formData.map(({name, label, value}) => {
                            const isEditing = editField === name
                            if (name === "role") {
                                return isEditing ? (
                                    <div key={name} className="flex flex-col">
                                        <div className="flex gap-4 items-center">
                                            <div className="text-xl font-bold text-black">{label}:</div>
                                            <div>
                                                <select value={value}
                                                        name="role"
                                                        onChange={handleChange}
                                                        className="border border-green-500 pl-2 h-7 rounded-lg focus:outline-none">
                                                    {roles.map((role) => (
                                                        <option key={role.name} value={role.name}>{role.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <RxCross2 className="hover:cursor-pointer"
                                                      onClick={() => closeEditSection(name)}/>
                                            <div
                                                onClick={saveData}
                                                className="text-green-500 text-lg hover:text-orange-500 hover:cursor-pointer ml-auto">Save
                                            </div>
                                        </div>
                                        <div className="relative my-3">
                                            <hr className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-gray-200"/>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={name} className="flex flex-col">
                                        <div className="flex gap-4 items-center">
                                            <div className="text-xl font-bold text-black">{label}:</div>
                                            <div className="text-base font-light text-gray-500">{value}</div>
                                            <div
                                                onClick={() => handleToggleEdit(name)}
                                                className="text-green-500 text-lg hover:text-orange-500 hover:cursor-pointer ml-auto">Edit
                                            </div>
                                        </div>
                                        <div className="relative my-3">
                                            <hr className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-gray-200"/>
                                        </div>
                                    </div>
                                )
                            }
                            return isEditing ? (
                                <div key={name} className="flex flex-col">
                                    <div className="flex gap-4 items-center">
                                        <div className="text-xl font-bold text-black">{label}:</div>
                                        <input
                                            className="border border-green-500 w-72 pl-2 h-7 rounded-lg focus:outline-none placeholder:text-sm"
                                            placeholder="Enter new password" value={value} name={name}
                                            onChange={handleChange}/>
                                        <RxCross2 className="hover:cursor-pointer"
                                                  onClick={() => closeEditSection(name)}/>
                                        <div
                                            onClick={saveData}
                                            className="text-green-500 text-lg hover:text-orange-500 hover:cursor-pointer ml-auto">Save
                                        </div>
                                    </div>
                                    <div className="relative my-3">
                                        <hr className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-gray-200"/>
                                    </div>
                                </div>
                            ) : (
                                <div key={name} className="flex flex-col">
                                    <div className="flex gap-4 items-center">
                                        <div className="text-xl font-bold text-black">{label}:</div>
                                        <div className="text-base font-light text-gray-500">{value}</div>
                                        <div
                                            onClick={() => handleToggleEdit(name)}
                                            className="text-green-500 text-lg hover:text-orange-500 hover:cursor-pointer ml-auto">Edit
                                        </div>
                                    </div>
                                    <div className="relative my-3">
                                        <hr className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-gray-200"/>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="flex flex-col">
                            <div className="flex gap-4 items-center">
                                <div className="text-xl font-bold text-black">User password:</div>
                                <div className="text-base font-light text-gray-500">You can only send a message to reset
                                    the password
                                </div>
                                <div
                                    onClick={sendResetPass}
                                    className="text-green-500 text-lg hover:text-orange-500 hover:cursor-pointer ml-auto">Send
                                </div>
                            </div>
                            <div className="relative my-3">
                                <hr className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-gray-200"/>
                            </div>
                        </div>
                        <div className="mt-3" onClick={deleteUser}>
                            <RedButton label={'User delete'}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}