import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit() {
  const { followup, agents = [], flash = {} } = usePage().props;

  const [form, setForm] = useState({
    lead_id: followup.lead_id || "",
    client_id: followup.client_id || "",
    user_id: followup.user_id || "",
    mode: followup.mode || "Call",
    summary: followup.summary || "",
    followup_at: followup.followup_at
      ? new Date(followup.followup_at).toISOString().slice(0, 16)
      : "",
    done: followup.done || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(route("follow-ups.update", followup.id), form);
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Edit Follow-up
        </h1>

        {flash.success && (
          <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
            {flash.success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Agent Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Assigned Agent</label>
            <select
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Agent</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm font-medium mb-1">Mode</label>
            <select
              name="mode"
              value={form.mode}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            >
              <option>Call</option>
              <option>Visit</option>
              <option>Email</option>
              <option>Other</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Next Follow-up Date/Time
            </label>
            <input
              type="datetime-local"
              name="followup_at"
              value={form.followup_at}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-1">Summary / Notes</label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
              placeholder="Add your notes or meeting summary..."
              rows="4"
            ></textarea>
          </div>

          {/* Done Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="done"
              checked={form.done}
              onChange={handleChange}
              id="done"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="done" className="text-sm text-gray-700 dark:text-gray-300">
              Mark as completed
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 text-gray-800 dark:text-white px-4 py-2 rounded"
            >
              Back
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
