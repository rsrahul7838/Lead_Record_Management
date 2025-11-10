import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
  const { projects = [], agents = [] } = usePage().props;
  const [form, setForm] = useState({
    name: '',
    type: 'Residential',
    location: '',
    price: '',
    status: 'Available',
    project_id: '',
    assigned_agent_id: '',
    description: '',
  });
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});
  const handleFiles = (e) => setMediaFiles(Array.from(e.target.files));

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    mediaFiles.forEach(f => data.append('media[]', f));
    router.post(route('properties.store'), data, { forceFormData: true });
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Create Property</h1>
        <form onSubmit={submit} className="space-y-4">
          <input name="name" placeholder="Property name" value={form.name} onChange={handleChange} className="border p-2 w-full" required />
          <div className="grid grid-cols-2 gap-3">
            <select name="type" value={form.type} onChange={handleChange} className="border p-2">
              <option>Residential</option>
              <option>Commercial</option>
            </select>
            <select name="status" value={form.status} onChange={handleChange} className="border p-2">
              <option>Available</option>
              <option>Sold</option>
              <option>Reserved</option>
            </select>
          </div>
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border p-2 w-full" />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 w-full" />
          <select name="project_id" value={form.project_id} onChange={handleChange} className="border p-2 w-full">
            <option value="">Assign to project (optional)</option>
            {projects.map(pr => <option key={pr.id} value={pr.id}>{pr.name}</option>)}
          </select>
          <select name="assigned_agent_id" value={form.assigned_agent_id} onChange={handleChange} className="border p-2 w-full">
            <option value="">Assign to agent (optional)</option>
            {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>

          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full" />

          <div>
            <label className="block mb-1">Images / Documents</label>
            <input type="file" multiple onChange={handleFiles} />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => window.history.back()} className="bg-gray-300 px-4 py-2 rounded">Back</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
