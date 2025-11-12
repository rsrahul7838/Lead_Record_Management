import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Index() {
    const { roles = [], permissions = [], flash = {} } = usePage().props;

    const [search, setSearch] = useState("");
    const [filterPermission, setFilterPermission] = useState("All");

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This role will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("roles.destroy", id), {
                    onSuccess: () =>
                        Swal.fire(
                            "Deleted!",
                            "Role has been removed.",
                            "success"
                        ),
                });
            }
        });
    };

    // 🔍 Filtered roles by search or permission
    const filteredRoles = roles.filter((role) => {
        const matchesSearch =
            role.name.toLowerCase().includes(search.toLowerCase()) ||
            role.permissions.some((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );

        const matchesPermission =
            filterPermission === "All" ||
            role.permissions.some((p) => p.name === filterPermission);

        return matchesSearch && matchesPermission;
    });

    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
                        Role Management
                    </h1>
                    <Link
                        href={route("roles.create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow transition"
                    >
                        + Add Role
                    </Link>
                </div>

                {/* Flash Message */}
                {flash.success && (
                    <div className="bg-green-50 border border-green-300 text-green-800 p-3 rounded-lg mb-5 shadow-sm">
                        ✅ {flash.success}
                    </div>
                )}

                {/* Search + Filter Bar */}
                <div className="bg-white dark:bg-gray-800 p-4 mb-5 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <input
                        type="text"
                        placeholder="🔍 Search by role or permission..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-full sm:w-2/3 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                    />

                    <select
                        value={filterPermission}
                        onChange={(e) => setFilterPermission(e.target.value)}
                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                    >
                        <option value="All">All Permissions</option>
                        {permissions.map((p) => (
                            <option key={p.id} value={p.name}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <table className="w-full text-sm text-gray-700 dark:text-gray-300">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-xs font-semibold">
                            <tr>
                                <th className="py-3 px-4 text-left">
                                    Role Name
                                </th>
                                <th className="py-3 px-4 text-left">
                                    Permissions
                                </th>
                                <th className="py-3 px-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoles.length > 0 ? (
                                filteredRoles.map((role) => (
                                    <tr
                                        key={role.id}
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                                            {role.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            {role.permissions.length > 0 ? (
                                                role.permissions.map((p) => (
                                                    <span
                                                        key={p.id}
                                                        className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded mr-1 mb-1"
                                                    >
                                                        {p.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic">
                                                    No permissions
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center space-x-3">
                                            <Link
                                                href={route(
                                                    "roles.edit",
                                                    role.id
                                                )}
                                                className="text-indigo-600 hover:underline font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(role.id)
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
                                        colSpan="3"
                                        className="py-6 text-center text-gray-500 dark:text-gray-400 italic"
                                    >
                                        No matching roles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Total Count */}
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-3 text-right">
                    Showing <strong>{filteredRoles.length}</strong> of{" "}
                    <strong>{roles.length}</strong> roles
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
