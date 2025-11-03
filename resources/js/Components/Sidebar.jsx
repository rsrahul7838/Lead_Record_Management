import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Home, Folder, Users, Settings, User } from 'lucide-react';

export default function Sidebar({ auth }) {
  const { url } = usePage();

  const menu = [
    { label: 'Dashboard', href: '/dashboard', icon: <Home size={16} /> },
    { label: 'Projects', href: '/projects', icon: <Folder size={16} /> },
    { label: 'Leads', href: '/leads', icon: <Users size={16} /> },
    { label: 'Settings', href: '/settings', icon: <Settings size={16} /> },
    { label: 'User Management', href: '/user_management', icon: <User size={16} />},

  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="px-6 py-4 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
        ProjectManager
      </div>

      <nav className="p-4 space-y-1 flex-1">
        {menu.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
              url.startsWith(it.href) ? 'bg-gray-200 dark:bg-gray-700 font-semibold' : ''
            }`}
          >
            {it.icon}
            <span>{it.label}</span>
          </Link>
        ))}
      </nav>
      

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-300">Signed in as</div>
        <div className="font-medium">{auth?.user?.name}</div>
        <div className="text-xs text-gray-500">{auth?.user?.email}</div>
      </div>
    </aside>
  );
}
