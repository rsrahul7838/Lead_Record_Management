import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit() {
  const { client, agents } = usePage().props;
  const [form, setForm] = useState(client);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(route("clients.update", client.id), form);
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Client</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} className="border p-2 w-full" required />
          <input name="email" value={form.email || ""} onChange={handleChange} className="border p-2 w-full" />
          <input name="phone" value={form.phone || ""} onChange={handleChange} className="border p-2 w-full" />
          <input name="budget" type="number" value={form.budget || ""} onChange={handleChange} className="border p-2 w-full" />
          <input name="preferred_location" value={form.preferred_location || ""} onChange={handleChange} className="border p-2 w-full" />
          <select name="assigned_agent_id" value={form.assigned_agent_id || ""} onChange={handleChange} className="border p-2 w-full">
            <option value="">Assign to Agent</option>
            {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <textarea name="notes" value={form.notes || ""} onChange={handleChange} className="border p-2 w-full" />
          <input type="date" name="next_followup_date" value={form.next_followup_date || ""} onChange={handleChange} className="border p-2 w-full" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => history.back()} className="bg-gray-300 px-4 py-2 rounded">Back</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
