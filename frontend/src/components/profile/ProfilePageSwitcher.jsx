"use client";

import ProfileDetails from  './ProfileDetails'
import ProfileAddress from "./ProfileAddress";


const pages = {
    "details": ProfileDetails,
    "address": ProfileAddress,
}

const ProfilePageSwitcher = ({ user, activeSection }) => {

    const PageComponent = pages[activeSection]

    if (!PageComponent) {
        return <div className="p-5 text-red-500">Strona nie została znaleziona</div>;
    }

    if (activeSection === "details") {
        return <PageComponent user={user}/>
    }

    return <PageComponent />
}

export default ProfilePageSwitcher;