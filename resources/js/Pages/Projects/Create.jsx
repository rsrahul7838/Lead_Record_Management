import React, { useState } from "react";
import { router, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
  const { errors } = usePage().props;

  const [form, setForm] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post("/projects", form);
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Create Project</h1>
          <Link
            href="/projects"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            ← Back
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter project name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
                placeholder="Brief project description..."
              ></textarea>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-8">
              <Link
                href="/projects"
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
