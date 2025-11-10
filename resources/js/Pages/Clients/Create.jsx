import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
  const { agents = [] } = usePage().props;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    preferred_location: "",
    assigned_agent_id: "",
    notes: "",
    next_followup_date: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("clients.store"), form);
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Add New Client</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required className="border p-2 w-full" />
          <input name="email" placeholder="Email" onChange={handleChange} value={form.email} className="border p-2 w-full" />
          <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} className="border p-2 w-full" />
          <input name="budget" type="number" placeholder="Budget" onChange={handleChange} value={form.budget} className="border p-2 w-full" />
          <input name="preferred_location" placeholder="Preferred Location" onChange={handleChange} value={form.preferred_location} className="border p-2 w-full" />
          <select name="assigned_agent_id" value={form.assigned_agent_id} onChange={handleChange} className="border p-2 w-full">
            <option value="">Assign to Agent</option>
            {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <textarea name="notes" placeholder="Notes" onChange={handleChange} value={form.notes} className="border p-2 w-full" />
          <input type="date" name="next_followup_date" onChange={handleChange} value={form.next_followup_date} className="border p-2 w-full" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => history.back()} className="bg-gray-300 px-4 py-2 rounded">Back</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
