"use client";

import { usePathname } from "next/navigation";
import AdminNavHeader from "../components/admin/AdminNavHeader";
import AdminBreadcrumbs from "../components/admin/AdminBreadcrumbs";

export default function HeaderWrapper() {
    const pathname = usePathname();

    if (!pathname) return null;

    const shouldHideHeader = pathname.startsWith("/admin/users/");

    return shouldHideHeader ? (
        <div className="flex items-center px-6 mt-4">
            <AdminBreadcrumbs/>
        </div>
    ) : (
        <AdminNavHeader/>
    );
}


