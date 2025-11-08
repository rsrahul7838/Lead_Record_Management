import React, { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function AuthenticatedLayout({ title, children }) {
    const { auth, app } = usePage().props;

    const appName = app?.name || "My App";
    const theme = app?.theme?.toLowerCase() || "light";

    // Automatically apply theme to <html> tag
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <>
            <Head title={title || appName} />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {/* Header Section */}
                {/* <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        </header> */}

                {/* Main Application Layout (includes sidebar, topbar, etc.) */}
                <AppLayout auth={auth}>
                    <main className="p-6">{children}</main>
                </AppLayout>
            </div>
        </>
    );
}
