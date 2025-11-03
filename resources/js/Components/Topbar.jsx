import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Moon, Sun, Settings, User } from 'lucide-react';

export default function Topbar({ auth }) {
  // dark mode stored in localStorage
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="text-lg font-semibold"> {/* dynamic page title could be injected via Inertia Head */} </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Toggle dark mode"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <Link href="#" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Settings size={16} />
        </Link>

        <div className="flex items-center gap-2">
          <User size={16} />
          <span className="text-sm">{auth?.user?.name}</span>
        </div>

        {/* Logout using Inertia Link method="post" ensures CSRF token and Laravel logout route are respected */}
        <form method="POST" action={route('logout')}>
          <Link href={route('logout')} method="post" as="button" className="ml-4 text-sm text-red-600 hover:underline">
            Logout
          </Link>
        </form>
      </div>
    </header>
  );
}
