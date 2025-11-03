import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ projects }) {
    const { flash } = usePage().props;

    return (
        <AppLayout>
            <Head title="Projects" />
            {flash.success && (
                <div className="mb-4 text-green-600">{flash.success}</div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Projects</h1>
                <Link
                    href={route('projects.create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + New Project
                </Link>
            </div>

            <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Owner</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((p) => (
                        <tr key={p.id} className="border-t dark:border-gray-700">
                            <td className="p-3">{p.name}</td>
                            <td className="p-3">{p.status}</td>
                            <td className="p-3">{p.owner?.name}</td>
                            <td className="p-3 flex gap-3">
                                <Link
                                    href={route('projects.edit', p.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={route('projects.destroy', p.id)}
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
