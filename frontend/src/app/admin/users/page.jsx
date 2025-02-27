import {getUser} from "../../../utils/getUser";
import Link from "next/link";
import {redirect} from "next/navigation";
import config from "../../../config";
import {it} from "node:test";


export default async function Page() {
    const { user, token} = await getUser();

    if (user.role.name !== 'admin') {
        redirect('/')
    }

    const res = await fetch(`${config.API_URL}/api/admin/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        cache: "no-cache"
    });

    if (!res.ok) {
        throw new Error('Error getting users')
    }

    const users = await  res.json();

    return (
        <div className="flex flex-col mt-8">
            <div className="flex items-center mx-24 px-6 py-6 bg-green-500 rounded-lg relative">
                <div className="text-xl text-white">Users list</div>
                <button className="ml-auto text-white border border-white py-1 px-2 rounded-lg transition-transform duration-300 hover:scale-105">
                    <Link href="">Create user</Link>
                </button>
            </div>
            <div className="bg-white py-9 -mt-12 mx-16 rounded-t-lg"></div>
            <table className="bg-white table-auto mx-16 rounded-b-lg">
                <thead>
                <tr className="border-b border-gray-200 h-12 text-green-500">
                    <th className="text-start pl-4 font-light text-base">Id</th>
                    <th className="text-start font-light text-base">Email</th>
                    <th className="text-start font-light text-base">Name</th>
                    <th className="text-start font-light text-base">Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map((item) => (
                    <tr key={item.id} className="h-14 border-b border-gray-200 text-gray-600">
                        <td className="text-start pl-4 font-light text-base">{item.id}</td>
                        <td className="text-start font-light text-base">{item.email}</td>
                        <td className="text-start font-light text-base">{item.first_name} {item.last_name}</td>
                        <td className="text-start font-light text-base">{item.role.name}</td>
                        <td className="text-green-500 font-light text-base hover:text-orange-500">
                            <Link href="">More...</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}