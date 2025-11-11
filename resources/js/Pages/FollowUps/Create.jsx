import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
  const { lead = null, client = null, agents = [] } = usePage().props;

  const [form, setForm] = useState({
    lead_id: lead?.id || "",
    client_id: client?.id || "",
    user_id: "",
    mode: "Call",
    summary: "",
    followup_at: "",
    done: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    router.post(route("follow-ups.store"), form);
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          New Follow-up
        </h1>

        <form onSubmit={submit} className="space-y-5">
          {/* Agent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assign Agent <span className="text-red-500">*</span>
            </label>
            <select
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Communication Mode
            </label>
            <select
              name="mode"
              value={form.mode}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white"
            >
              <option>Call</option>
              <option>Visit</option>
              <option>Email</option>
              <option>Other</option>
            </select>
          </div>

          {/* Follow-up date/time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Follow-up Date & Time
            </label>
            <input
              type="datetime-local"
              name="followup_at"
              value={form.followup_at}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Summary / Notes
            </label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Summary or notes about this communication"
              className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white"
              rows="4"
            />
          </div>

          {/* Mark done */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                name="done"
                checked={form.done}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Mark as completed
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md dark:bg-gray-700 dark:text-white"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save Follow-up
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
