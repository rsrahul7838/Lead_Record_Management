import React from 'react';
import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';

export default function AppLayout({ children, auth }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar receives auth */}
      <Sidebar auth={auth} />

      <div className="flex-1 flex flex-col">
        {/* Topbar receives auth */}
        <Topbar auth={auth} />

        {/* page content */}
        <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
