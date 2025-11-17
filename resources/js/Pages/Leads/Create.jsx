import React, { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    // ✅ Receive list of users (agents) from backend
    const { users = [], projects = [] } = usePage().props;

    // ✅ Form state
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        status: "New",
        notes: "",
        assigned_to: "",
        project_id: "",
    });

    // ✅ Update field on input change
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    // ✅ Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/leads", form, {
            onSuccess: () => {
                alert("✅ Lead created successfully!");
            },
            onError: () => {
                alert("❌ Failed to create lead. Please try again.");
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                {/* === Header === */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Create Lead
                    </h2>
                    <Link
                        href="/leads"
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1 rounded-md text-sm font-medium"
                    >
                        ← Back
                    </Link>
                </div>

                {/* === Form === */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Lead Name
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Lead Name"
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Phone
                        </label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* === Agent Selection Dropdown === */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Assign Agent
                        </label>
                        <select
                            name="assigned_to"
                            value={form.assigned_to}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">Select Agent</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Project
                        </label>
                        <select
                            name="project_id"
                            value={form.project_id}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        >
                            <option value="">Select Project</option>
                            {projects.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option>New</option>
                            <option>Contacted</option>
                            <option>Qualified</option>
                            <option>Lost</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            placeholder="Additional notes..."
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            rows="3"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                        >
                            Save Lead
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
