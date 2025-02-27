"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminBreadcrumbs() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    return (
        <div className="flex">
            {segments.map((seg, index) => {
                const path = "/" + segments.slice(0, index + 1).join("/");
                const label = seg
                const isLast = index === segments.length - 1;

                return (
                    <span key={path} className="flex items-center text-lg">
                        {index !== 0 && <span>&nbsp;/&nbsp;</span>}
                        {isLast ? (
                            <span className="capitalize text-green-500">{label}</span>
                        ) : (
                            <Link href={path} className="capitalize text-gray-800">
                                {label}
                            </Link>
                        )}
                    </span>
                    );
            })}
        </div>
    );
}
