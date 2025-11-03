import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function AuthenticatedLayout({ title, children }) {
  const { auth } = usePage().props;

  return (
    <>
      <Head title={title || 'Project Manager'} />

      {/* Breeze-style outer wrapper — can include responsive nav if you had one */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Pass auth down into the AppLayout which renders sidebar/topbar */}
        <AppLayout auth={auth}>
          {children}
        </AppLayout>
      </div>
    </>
  );
}
