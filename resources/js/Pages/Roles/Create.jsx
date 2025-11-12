import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    const { permissions = [] } = usePage().props;
    const [form, setForm] = useState({
        name: "",
        permissions: [],
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePermissionChange = (perm) => {
        setForm((prev) => {
            const selected = prev.permissions.includes(perm)
                ? prev.permissions.filter((p) => p !== perm)
                : [...prev.permissions, perm];
            return { ...prev, permissions: selected };
        });
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route("roles.store"), form);
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Create New Role</h1>

                <form onSubmit={submit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Role Name (e.g. Agent, Manager)"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />

                    <div>
                        <h3 className="font-semibold mb-2">
                            Assign Permissions:
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {permissions.map((p) => (
                                <label
                                    key={p.id}
                                    className="flex items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={form.permissions.includes(
                                            p.name
                                        )}
                                        onChange={() =>
                                            handlePermissionChange(p.name)
                                        }
                                    />
                                    <span>{p.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
