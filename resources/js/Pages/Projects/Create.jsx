import AppLayout from '@/Layouts/AppLayout';
import { useForm, Head } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        status: 'Pending',
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Project" />
            <h1 className="text-2xl mb-6 font-semibold">Create New Project</h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
                </div>

                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium">Status</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-medium">Start Date</label>
                        <input
                            type="date"
                            value={data.start_date}
                            onChange={(e) =>
                                setData('start_date', e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block font-medium">End Date</label>
                        <input
                            type="date"
                            value={data.end_date}
                            onChange={(e) =>
                                setData('end_date', e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save
                </button>
            </form>
        </AppLayout>
    );
}
