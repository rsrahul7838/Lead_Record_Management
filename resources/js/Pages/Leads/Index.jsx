import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Index() {
    // ✅ leads is now a paginator, so use leads.data
    const { leads, flash = {}, users = [] } = usePage().props;
    const [leadList, setLeadList] = useState(leads.data || []);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // ✅ Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This lead will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/leads/${id}`, {
                    onSuccess: () =>
                        Swal.fire(
                            "Deleted!",
                            "Lead removed successfully.",
                            "success"
                        ),
                });
            }
        });
    };

    // ✅ Assign Agent (from edit or modal)
    const handleAssign = async (leadId, agentId) => {
        try {
            const response = await axios.put(`/leads/${leadId}/assign`, {
                assigned_to: agentId,
            });

            if (response.data.success) {
                const updatedLead = response.data.lead;

                const updatedList = leadList.map((lead) =>
                    lead.id === leadId
                        ? {
                              ...lead,
                              assigned_to: updatedLead.assigned_to,
                              assignedTo: updatedLead.assignedTo,
                          }
                        : lead
                );

                setLeadList(updatedList);
                Swal.fire(
                    "Updated!",
                    "Agent assigned successfully.",
                    "success"
                );
            }
        } catch (err) {
            Swal.fire("Error!", "Failed to assign agent.", "error");
        }
    };

    // ✅ Filter leads by name/email/status
    const filteredLeads = leadList.filter((lead) => {
        const matchesSearch =
            lead.name?.toLowerCase().includes(search.toLowerCase()) ||
            lead.email?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "All" || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6">
                {/* === Header === */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
                        Leads Management
                    </h1>
                    <Link
                        href="/leads/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow transition"
                    >
                        + New Lead
                    </Link>
                </div>

                {/* === Flash Message === */}
                {flash.success && (
                    <div className="bg-green-50 border border-green-300 text-green-800 p-3 rounded-lg mb-4 shadow-sm">
                        ✅ {flash.success}
                    </div>
                )}

                {/* === Filters === */}
                <div className="bg-white dark:bg-gray-800 p-4 mb-5 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <input
                        type="text"
                        placeholder="🔍 Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full sm:w-2/3 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="All">All Statuses</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                    </select>
                </div>

                {/* === Leads Table === */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <table className="w-full text-sm text-gray-700 dark:text-gray-300">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-xs font-semibold">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Phone</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">
                                    Assigned Agent
                                </th>
                                <th className="py-3 px-4 text-left">Project</th>
                                <th className="py-3 px-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.length > 0 ? (
                                filteredLeads.map((lead, index) => (
                                    <tr
                                        key={lead.id}
                                        className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                                            index % 2 === 0
                                                ? "bg-white dark:bg-gray-900"
                                                : "bg-gray-50 dark:bg-gray-800"
                                        }`}
                                    >
                                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                                            {lead.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            {lead.email || "—"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {lead.phone || "—"}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    lead.status === "New"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : lead.status ===
                                                          "Contacted"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : lead.status ===
                                                          "Qualified"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {lead.status}
                                            </span>
                                        </td>

                                        {/* ✅ Assigned Agent — show name if exists */}
                                        <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                                            {lead.assignedTo?.name ||
                                                "— Unassigned —"}
                                        </td>
                                        <td className="py-3 px-4 font-medium">
                                            {lead.project?.name ||
                                                "— No Project —"}
                                        </td>

                                        {/* === Actions === */}
                                        <td className="py-3 px-4 text-center space-x-3">
                                            <Link
                                                href={route(
                                                    "leads.show",
                                                    lead.id
                                                )}
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/leads/${lead.id}/edit`}
                                                className="text-indigo-600 hover:underline font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(lead.id)
                                                }
                                                className="text-red-600 hover:underline font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-6 text-center text-gray-500 dark:text-gray-400 italic"
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
