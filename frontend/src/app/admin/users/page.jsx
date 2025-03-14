import {getUser} from "../../../utils/getUser";
import {redirect} from "next/navigation";
import config from "../../../config";
import UserListPage from  "./UserListPage"


export default async function () {
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

    const users = await res.json();

    return (
        <UserListPage users={users}/>
    );
}