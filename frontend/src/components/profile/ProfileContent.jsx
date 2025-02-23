"use client";

import React, {useState} from "react";
import Sidebar from "../ui/Sidebar";
import ProfilePageSwitcher from "./ProfilePageSwitcher";

export default function ProfileContent({ user }) {
    const [activeSection, setActiveSection] = useState("details");

    return (
        <div className="flex gap-12">
            <Sidebar isActiveSection={activeSection} setIsActiveSection={setActiveSection}/>
            <main className="flex-1 bg-white rounded-md min-h-full mb-24">
                <ProfilePageSwitcher user={user} activeSection={activeSection}/>
            </main>
        </div>
    );
}