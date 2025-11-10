import React, { useState } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit() {
  const { task, projects, users } = usePage().props;

  const [form, setForm] = useState({
    project_id: task.project_id || "",
    assigned_to: task.assigned_to || "",
    title: task.title || "",
    description: task.description || "",
    priority: task.priority || "Medium",
    status: task.status || "Pending",
    due_date: task.due_date || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(`/tasks/${task.id}`, form);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Edit Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Select */}
          <div>
            <label className="block mb-1 text-sm font-medium">Project</label>
            <select
              name="project_id"
              value={form.project_id}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block mb-1 text-sm font-medium">Assigned To</label>
            <select
              name="assigned_to"
              value={form.assigned_to}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              rows="3"
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-1 text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block mb-1 text-sm font-medium">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={form.due_date || ""}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <Link
              href={route("tasks.index")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              ← Back
            </Link>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
