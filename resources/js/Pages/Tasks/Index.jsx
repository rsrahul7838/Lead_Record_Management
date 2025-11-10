import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2"; 

export default function Index() {
  const { tasks = [], flash = {} } = usePage().props;

  // Local search/filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const handleDelete = (id, title) => {
    Swal.fire({
      title: `Delete "${title}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/tasks/${id}`, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Task has been deleted successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          },
        });
      }
    });
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project?.name.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter ? task.status === statusFilter : true;
    const matchPriority = priorityFilter
      ? task.priority === priorityFilter
      : true;

    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4 md:mb-0">
            Tasks
          </h1>
          <Link
            href="/tasks/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
          >
            + New Task
          </Link>
        </div>

        {/* Flash message */}
        {flash.success && (
          <div className="bg-green-100 text-green-800 border border-green-300 p-3 rounded-lg mb-4">
            {flash.success}
          </div>
        )}

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="🔍 Search by title or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full md:w-1/3 dark:bg-gray-700 dark:text-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full md:w-1/4 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full md:w-1/4 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setPriorityFilter("");
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Project</th>
                <th className="p-3 text-left">Assigned To</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                  >
                    <td className="p-3 font-medium text-gray-800 dark:text-gray-100">
                      {task.title}
                    </td>
                    <td className="p-3">{task.project?.name || "—"}</td>
                    <td className="p-3">{task.user?.name || "—"}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="p-3">{task.due_date || "—"}</td>
                    <td className="p-3 text-center">
                      <Link
                        href={`/tasks/${task.id}/edit`}
                        className="text-blue-600 hover:underline mr-3 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id, task.title)}
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
                    colSpan="7"
                    className="text-center text-gray-500 p-6 italic"
                  >
                    No matching tasks found.
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
