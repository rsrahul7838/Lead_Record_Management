import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const { leads = [], flash = {} } = usePage().props;
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this lead?")) {
            router.delete(`/leads/${id}`);
        }
    };

    // Filtered data based on search & status
    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.name.toLowerCase().includes(search.toLowerCase()) ||
            (lead.email &&
                lead.email.toLowerCase().includes(search.toLowerCase()));
        const matchesStatus =
            statusFilter === "All" || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Leads Management
                    </h1>
                    <Link
                        href="/leads/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-200 shadow"
                    >
                        + New Lead
                    </Link>
                </div>

                {/* Flash Message */}
                {flash.success && (
                    <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-5 shadow-sm">
                        {flash.success}
                    </div>
                )}

                {/* Search + Filter Bar */}
                <div className="bg-white p-4 mb-5 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3 w-full sm:w-2/3">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-1/3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="All">All Statuses</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Phone</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.length > 0 ? (
                                filteredLeads.map((lead, index) => (
                                    <tr
                                        key={lead.id}
                                        className={`border-t hover:bg-gray-50 transition-colors duration-150 ${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-50"
                                        }`}
                                    >
                                        <td className="py-3 px-4 font-medium text-gray-900">
                                            {lead.name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">
                                            {lead.email}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">
                                            {lead.phone}
                                        </td>
                                        <td>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    lead.status === "New"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : lead.status ===
                                                          "Contacted"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : lead.status ===
                                                          "Qualified"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={route(
                                                        "leads.show",
                                                        lead.id
                                                    )}
                                                    className="text-blue-600 hover:underline mr-3"
                                                >
                                                    View
                                                </Link>

                                                <Link
                                                    href={`/leads/${lead.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(lead.id)
                                                    }
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-6 text-center text-gray-500"
                                    >
                                        No leads found.
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
