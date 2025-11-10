import React, { useState } from "react";
import { router, usePage, Link } from "@inertiajs/react"; 
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
  const { projects, users } = usePage().props;
  const [form, setForm] = useState({
    project_id: "",
    assigned_to: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    due_date: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post("/tasks", form);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Create Task</h1>

          {/* ✅ Back Button */}
          <Link
            href="/tasks"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="project_id"
            value={form.project_id}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            name="assigned_to"
            value={form.assigned_to}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Assign To</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <input
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
