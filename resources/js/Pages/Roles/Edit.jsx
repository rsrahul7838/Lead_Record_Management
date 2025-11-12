import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit() {
    const { role, permissions, rolePermissions } = usePage().props;

    const [form, setForm] = useState({
        name: role.name,
        permissions: rolePermissions,
    });

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
        router.put(route("roles.update", role.id), form);
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Edit Role</h1>

                <form onSubmit={submit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />

                    <div>
                        <h3 className="font-semibold mb-2">Permissions:</h3>
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
