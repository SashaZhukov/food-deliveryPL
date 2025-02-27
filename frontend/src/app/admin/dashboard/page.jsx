import {getUser} from "../../../utils/getUser";
import {redirect} from "next/navigation";


export default async function Page() {
    const {user, token} = await getUser();

    if (user.role.name !== 'admin') {
        redirect('/')
    }
}