import React, { useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit() {
  const { lead } = usePage().props;
  const [form, setForm] = useState(lead);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(`/leads/${lead.id}`, form);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Edit Lead</h1>
          {/* ✅ Back Button */}
          <Link
            href="/leads"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              name="name"
              value={form.name || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              value={form.email || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status || 'New'}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              rows="4"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Lead
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
