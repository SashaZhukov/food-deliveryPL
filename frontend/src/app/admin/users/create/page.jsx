import {getUser} from "../../../../utils/getUser";
import CreatePage from "./CreatePage"
export default async function Page() {
    const {user, token} = await getUser()

    return (
        <CreatePage token={token}/>
    );
}