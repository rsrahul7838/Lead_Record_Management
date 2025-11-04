import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
  const { projects = [], flash = {} } = usePage().props;

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete the project "${name}"?`)) {
      router.delete(`/projects/${id}`, {
        onSuccess: () => {
          alert("✅ Project deleted successfully!");
        },
        onError: () => {
          alert("❌ Failed to delete project. Please try again.");
        },
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Projects</h1>
          <Link
            href="/projects/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm"
          >
            + New Project
          </Link>
        </div>

        {/* Flash Message */}
        {flash.success && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 border border-green-300">
            {flash.success}
          </div>
        )}

        {/* Project Table */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Owner</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 transition border-b last:border-none"
                  >
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3">{p.owner?.name || "—"}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          p.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : p.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Link
                        href={`/projects/${p.id}/edit`}
                        className="text-blue-600 hover:underline mr-4 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
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
                    colSpan="4"
                    className="text-center text-gray-500 p-6 italic"
                  >
                    No projects found.
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
