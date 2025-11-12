import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    Folder,
    Users,
    Settings,
    User,
    Layout,
    ChevronDown,
    ChevronRight,
    Building2,
    Calendar as CalendarIcon,
    PhoneCall,
    CreditCard,
    Shield,
    BarChart2,
} from "lucide-react";

export default function Sidebar({ auth }) {
    const { url, props } = usePage();
    const appName = props?.app?.name || "ProjectManager";

    const [openMenu, setOpenMenu] = useState(null);

    const menu = [
        { label: "Dashboard", href: "/dashboard", icon: <Home size={16} /> },
        {
            label: "Projects",
            href: route("projects.index"),
            icon: <Folder size={16} />,
        },
        {
            label: "Tasks",
            icon: <User size={16} />,
            submenu: [
                {
                    label: "All Tasks",
                    href: route("tasks.index"),
                    icon: <User size={14} />,
                },
                {
                    label: "Task Board",
                    href: route("tasks.board"),
                    icon: <Layout size={14} />,
                },
            ],
        },
        {
            label: "Leads",
            href: route("leads.index"),
            icon: <Users size={16} />,
        },
        {
            label: "Properties",
            href: route("properties.index"),
            icon: <Building2 size={14} />,
        },
        {
            label: "Clients",
            icon: <Users size={16} />,
            submenu: [
                {
                    label: "Clients List",
                    href: route("clients.index"),
                    icon: <Users size={14} />,
                },
                {
                    label: "Follow-Up Calendar",
                    href: route("clients.calendar"),
                    icon: <CalendarIcon size={14} />,
                },
            ],
        },
        {
            label: "Follow-ups",
            icon: <PhoneCall size={16} />,
            submenu: [
                {
                    label: "All Follow-ups",
                    href: route("follow-ups.index"),
                    icon: <PhoneCall size={14} />,
                },
                {
                    label: "Today's Follow-ups",
                    href: route("follow-ups.today"),
                    icon: <CalendarIcon size={14} />,
                },
            ],
        },
        {
            label: "Payments",
            href: route("payments.index"),
            icon: <CreditCard size={16} />,
        },
        {
            label: "Agent Dashboard",
            href: route("agent.dashboard"),
            icon: <Users size={16} />,
        },
        {
            label: "Settings",
            href: route("settings.index"),
            icon: <Settings size={16} />,
        },
        {
            label: "User Management",
            href: route("users.index"),
            icon: <User size={16} />,
        },
        {
            label: "Reports",
            href: route("reports.index"),
            icon: <BarChart2 size={16} />,
        },
        {
            label: "Roles & Permissions",
            href: route("roles.index"),
            icon: <Shield size={16} />,
        },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
                {appName}
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1 flex-1">
                {menu.map((item, i) => (
                    <div key={i}>
                        {!item.submenu ? (
                            // Simple menu link
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                    url.startsWith(item.href)
                                        ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                                        : ""
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ) : (
                            // Menu with submenu
                            <div>
                                <button
                                    onClick={() =>
                                        setOpenMenu(
                                            openMenu === item.label
                                                ? null
                                                : item.label
                                        )
                                    }
                                    className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                    {openMenu === item.label ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <ChevronRight size={16} />
                                    )}
                                </button>

                                {openMenu === item.label && (
                                    <div className="ml-6 mt-1 space-y-1">
                                        {item.submenu.map((sub, j) => (
                                            <Link
                                                key={j}
                                                href={sub.href}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                                    url.startsWith(sub.href)
                                                        ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                                                        : ""
                                                }`}
                                            >
                                                {sub.icon}
                                                <span>{sub.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    Signed in as
                </div>
                <div className="font-medium">{auth?.user?.name}</div>
                <div className="text-xs text-gray-500">{auth?.user?.email}</div>
            </div>
        </aside>
    );
}
