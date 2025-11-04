import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Settings() {
  const { settings, flash } = usePage().props;
  const [form, setForm] = useState(settings);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("settings.update"), form);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6 max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {flash?.success && (
          <div className="bg-green-100 text-green-700 p-2 rounded">
            {flash.success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">App Name</label>
            <input
              name="app_name"
              value={form.app_name}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Timezone</label>
            <input
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Language</label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>French</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Theme</label>
            <select
              name="theme"
              value={form.theme}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
