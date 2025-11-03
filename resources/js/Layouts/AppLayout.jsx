import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Sun, Moon, Settings } from 'lucide-react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    // Toggle dark mode
    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
                <div className="px-6 py-4 text-lg font-semibold border-b border-gray-200 dark:border-gray-700">
                    Project Manager
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2">
                    <NavItem href={route('dashboard')} label="Dashboard" />
                    <NavItem href="#" label="Projects" />
                    <NavItem href="#" label="Leads" />
                    <NavItem href="#" label="Reports" />
                    <NavItem href="#" label="Settings" />
                </nav>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="h-16 bg-white dark:bg-gray-800 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-lg font-medium">
                        {usePage().props.title || 'Dashboard'}
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            title="Toggle theme"
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <Link
                            href={route('dashboard')}
                            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            title="Settings"
                        >
                            <Settings size={18} />
                        </Link>

                        <div className="flex items-center">
                            <span className="text-sm mr-2">{auth.user.name}</span>
                            <form method="POST" action={route('logout')}>
                                <button
                                    type="submit"
                                    className="text-xs text-red-500 hover:text-red-700"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}

function NavItem({ href, label }) {
    return (
        <Link
            href={href}
            className="block px-3 py-2 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
            {label}
        </Link>
    );
}
