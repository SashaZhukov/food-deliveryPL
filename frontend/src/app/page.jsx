
import './globals.css';
import Navbar from "../components/layout/Navbar";
import { cookies } from 'next/headers';
import config from "../config";
import {AuthProvider} from "../context/AuthContext";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    let user = null;

    if (token) {
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
            }
        } catch (error) {
            console.error('', error)
        }
    }

    return (
        <AuthProvider initialUser={user}>
            <Navbar />
        </AuthProvider>
    )

}

