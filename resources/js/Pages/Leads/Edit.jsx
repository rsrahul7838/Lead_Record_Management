import React, { useState } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Edit() {
    // ✅ Get lead and list of users (agents) from backend
    const { lead, users = [] } = usePage().props;

    // ✅ Initialize form with existing lead data
    const [form, setForm] = useState({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        status: lead.status || "New",
        notes: lead.notes || "",
        assigned_to: lead.assigned_to || "", // NEW field for agent
    });

    // ✅ Handle input change
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    // ✅ Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(`/leads/${lead.id}`, form, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Lead updated successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Error updating lead!",
                    text: "Please check your input and try again.",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg">
                {/* === Header === */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Edit Lead
                    </h1>

                    {/* Back Button */}
                    <Link
                        href="/leads"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        ← Back
                    </Link>
                </div>

                {/* === Edit Form === */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Phone
                        </label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* === NEW: Agent Dropdown === */}
                    <div>
                        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Assigned Agent
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
                        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            rows="4"
                        />
                    </div>

                    {/* === Submit Button === */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Update Lead
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
