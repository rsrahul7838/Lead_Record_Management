import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const {
        properties = [],
        projects = [],
        agents = [],
        filters = {},
        flash = {},
    } = usePage().props;

    const [q, setQ] = useState(filters.q || "");
    const [status, setStatus] = useState(filters.status || "");
    const [type, setType] = useState(filters.type || "");
    const [minPrice, setMinPrice] = useState(filters.min_price || "");
    const [maxPrice, setMaxPrice] = useState(filters.max_price || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("properties.index"),
            { q, status, type, min_price: minPrice, max_price: maxPrice },
            { preserveState: true, replace: true }
        );
    };

    const handleDelete = (id, name) => {
        Swal.fire({
            title: `Delete "${name}"?`,
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/properties/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Properties has been deleted successfully.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Properties</h1>
                    <Link
                        href={route("properties.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + New Property
                    </Link>
                </div>

                {flash.success && (
                    <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
                        {flash.success}
                    </div>
                )}

                <form
                    onSubmit={handleSearch}
                    className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4"
                >
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search name or location"
                        className="border p-2 rounded md:col-span-2"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">All Status</option>
                        <option>Available</option>
                        <option>Sold</option>
                        <option>Reserved</option>
                    </select>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">All Type</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                    </select>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min Price"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max Price"
                        className="border p-2 rounded"
                    />
                    <div className="md:col-span-6 flex gap-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded">
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setQ("");
                                setStatus("");
                                setType("");
                                setMinPrice("");
                                setMaxPrice("");
                                router.get(
                                    route("properties.index"),
                                    {},
                                    { preserveState: true }
                                );
                            }}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Project</th>
                                <th className="p-3">Agent</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Media</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-900"
                                >
                                    <td className="p-3">{p.name}</td>
                                    <td className="p-3">{p.type}</td>
                                    <td className="p-3">{p.location}</td>
                                    <td className="p-3">
                                        {p.price
                                            ? Number(p.price).toLocaleString()
                                            : "—"}
                                    </td>
                                    <td className="p-3">
                                        {p.project?.name || "—"}
                                    </td>
                                    <td className="p-3">
                                        {p.agent?.name || "—"}
                                    </td>
                                    <td className="p-3">{p.status}</td>
                                    <td className="p-3">
                                        {p.media?.length || 0}
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        <Link
                                            href={route(
                                                "properties.show",
                                                p.id
                                            )}
                                            className="text-blue-600"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route(
                                                "properties.edit",
                                                p.id
                                            )}
                                            className="text-yellow-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(p.id, p.name)
                                            }
                                            className="text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {properties.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="p-6 text-center text-gray-500"
                                    >
                                        No properties found.
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
