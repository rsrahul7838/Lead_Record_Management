import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ leads, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const filterUrl = route('leads.index', { search, status });

    return (
        <AppLayout>
            <Head title="Leads" />
            {flash.success && <div className="text-green-600 mb-4">{flash.success}</div>}

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Leads</h1>
                <Link
                    href={route('leads.create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Lead
                </Link>
            </div>

            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                </select>
                <a
                    href={filterUrl}
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                    Filter
                </a>
            </div>

            <table className="w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Project</th>
                        <th className="p-3 text-left">Assigned To</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id} className="border-t dark:border-gray-700">
                            <td className="p-3">{lead.name}</td>
                            <td className="p-3">{lead.email}</td>
                            <td className="p-3">{lead.project?.name || '-'}</td>
                            <td className="p-3">{lead.assigned_user?.name || '-'}</td>
                            <td className="p-3">{lead.status}</td>
                            <td className="p-3">
                                <Link
                                    href={route('leads.edit', lead.id)}
                                    className="text-blue-500 hover:underline mr-2"
                                >
                                    Edit
                                </Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={route('leads.destroy', lead.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AppLayout>
    );
}
