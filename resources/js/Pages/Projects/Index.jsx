import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
  const { projects = [], flash = {} } = usePage().props;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete the project "${name}"?`)) {
      router.delete(`/projects/${id}`, {
        onSuccess: () => alert("✅ Project deleted successfully!"),
        onError: () => alert("❌ Failed to delete project. Please try again."),
      });
    }
  };

  // Filtered project list
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      (project.owner?.name &&
        project.owner.name.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h1 className="text-3xl font-semibold text-gray-800">Projects</h1>
          <Link
            href="/projects/create"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-all"
          >
            + New Project
          </Link>
        </div>

        {/* Flash Message */}
        {flash.success && (
          <div className="bg-green-100 border border-green-400 text-green-800 p-3 rounded-lg mb-5 shadow-sm">
            {flash.success}
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 mb-5 rounded-lg shadow-sm flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Search */}
          <div className="w-full sm:w-2/3">
            <input
              type="text"
              placeholder="Search by project name or owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Filter */}
          <div className="w-full sm:w-1/3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Table */}
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
              {filteredProjects.length > 0 ? (
                filteredProjects.map((p) => (
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
