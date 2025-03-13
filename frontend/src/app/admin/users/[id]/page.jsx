import {getUser} from "../../../../utils/getUser";
import {getUserForView} from "../../../../utils/getUserForView";
import UserView from "./UserView";

export default async function Page({ params }) {
    const id = (await params).id;
    const  {authUser, token} = await getUser();

    try {
        const {user, roles, errors} = await getUserForView({id, token});

        if (user) {
            return <UserView user={user} roles={roles} token={token}/>
        }

        return <UserView errors={errors} />
    } catch (error) {
        return <UserView errors={error.message} />;
    }

}