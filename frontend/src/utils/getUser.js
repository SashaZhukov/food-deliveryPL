import {cookies} from "next/headers";
import config from "../config";

export const getUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
        throw new Error('No token found')
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
            cache: "no-cache"
        });

        if (res.ok) {
            user = await res.json();
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error(error.message || 'An error occurred');
    }

    return {user, token}
}