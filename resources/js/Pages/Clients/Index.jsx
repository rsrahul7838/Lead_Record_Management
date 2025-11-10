import React, { useState } from "react";
import { usePage, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const {
        clients = [],
        agents = [],
        filters = {},
        flash = {},
    } = usePage().props;
    const [agent, setAgent] = useState(filters.agent_id || "");
    const [location, setLocation] = useState(filters.location || "");
    const [minBudget, setMinBudget] = useState(filters.min_budget || "");
    const [maxBudget, setMaxBudget] = useState(filters.max_budget || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("clients.index"),
            {
                agent_id: agent,
                location,
                min_budget: minBudget,
                max_budget: maxBudget,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleDelete = (id, name) => {
        Swal.fire({
            title: `Delete ${name}?`,
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("clients.destroy", id), {
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: `${name} has been deleted successfully.`,
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "Something went wrong while deleting the client.",
                        });
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Clients</h1>
                    <Link
                        href={route("clients.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + New Client
                    </Link>
                </div>

                {flash.success && (
                    <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
                        {flash.success}
                    </div>
                )}

                {/* Filters */}
                <form
                    onSubmit={handleSearch}
                    className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4"
                >
                    <select
                        value={agent}
                        onChange={(e) => setAgent(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">All Agents</option>
                        {agents.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                    <input
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Min Budget"
                        value={minBudget}
                        onChange={(e) => setMinBudget(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Max Budget"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Filter
                    </button>
                </form>

                <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Budget</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Agent</th>
                                <th className="p-3">Next Follow-up</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.length > 0 ? (
                                clients.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-3">{c.name}</td>
                                        <td className="p-3">
                                            {c.phone || "—"}
                                        </td>
                                        <td className="p-3">
                                            {c.email || "—"}
                                        </td>
                                        <td className="p-3">
                                            {c.budget
                                                ? "₹" +
                                                  c.budget.toLocaleString()
                                                : "—"}
                                        </td>
                                        <td className="p-3">
                                            {c.preferred_location || "—"}
                                        </td>
                                        <td className="p-3">
                                            {c.agent?.name || "—"}
                                        </td>
                                        <td className="p-3">
                                            {c.next_followup_date || "—"}
                                        </td>
                                        <td className="p-3 text-center">
                                            <Link
                                                href={route(
                                                    "clients.edit",
                                                    c.id
                                                )}
                                                className="text-blue-600 hover:underline mr-3"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(c.id, c.name)
                                                }
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="p-6 text-center text-gray-500"
                                    >
                                        No clients found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
