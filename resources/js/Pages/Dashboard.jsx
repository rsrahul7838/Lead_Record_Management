import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h2 className="text-sm text-gray-500">Total Projects</h2>
                            <p className="text-3xl font-semibold">{stats.totalProjects}</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h2 className="text-sm text-gray-500">Active Projects</h2>
                            <p className="text-3xl font-semibold">{stats.activeProjects}</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h2 className="text-sm text-gray-500">Total Leads</h2>
                            <p className="text-3xl font-semibold">{stats.totalLeads}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
