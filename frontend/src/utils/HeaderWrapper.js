"use client";

import { usePathname } from "next/navigation";
import AdminNavHeader from "../components/admin/AdminNavHeader";
import AdminBreadcrumbs from "../components/admin/AdminBreadcrumbs";

export default function HeaderWrapper() {
    const pathname = usePathname();

    if (!pathname) return null;

    const hideHeaderOnRoutes = ["/admin/users/create"];
    const showHeader = !hideHeaderOnRoutes.includes(pathname);

    return showHeader ? <AdminNavHeader/> : <div className="flex items-center px-6 mt-4"><AdminBreadcrumbs/></div>;
        }
