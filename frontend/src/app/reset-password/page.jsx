import ResetPage from "./ResetPage"
import config from "../../config";

export default async function Page({ searchParams }) {
    const params = await searchParams;

    const token = params.token;
    const email = params.email;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/check-user-for-reset?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;
    console.log("Sending request to:", url);
    if (!token || !email) {
        return <ResetPage error="Missing token or email" />;
    }

    try {
        const response = await fetch(`${config.API_URL}/api/check-user-for-reset?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json();
            return <ResetPage error={error || "An unknown error occurred."} />;
        }

        return <ResetPage token={token} email={email}/>;
    } catch (error) {
        return <ResetPage error={error || "Your token isn't active now"} />;
    }
}
