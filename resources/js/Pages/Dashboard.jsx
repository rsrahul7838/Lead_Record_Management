import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ stats }) {
    usePage().props.app.name
    usePage().props.app.theme
    return (
    <AuthenticatedLayout>
        <AppLayout>
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard title="Total Projects" value={stats.totalProjects} />
                <StatCard title="Active Projects" value={stats.activeProjects} />
                <StatCard title="Total Leads" value={stats.totalLeads} />
            </div>
        </AppLayout>
        </AuthenticatedLayout>

    );
}

function StatCard({ title, value }) {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-sm text-gray-500 dark:text-gray-400">{title}</h2>
            <p className="text-3xl font-semibold mt-2">{value}</p>
        </div>
    );
}

