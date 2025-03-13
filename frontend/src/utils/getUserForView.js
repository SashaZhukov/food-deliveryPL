import config from "../config";

export const getUserForView = async ({ id, token }) => {
    try {
        const response = await fetch( `${config.API_URL}/api/admin/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('User not found');
        }

        const res = await response.json();

        const user = res.user

        const roles = res.role

        return {user, roles, errors:null};
    } catch (error) {

        const errors = Array.isArray(error.message) ? error.message : [error.message]
        return {user:null, errors};
    }
}