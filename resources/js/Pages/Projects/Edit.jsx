import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function Edit() {
  const { project } = usePage().props;
  const [form, setForm] = useState(project);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(`/projects/${project.id}`, form);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" value={form.description || ''} onChange={handleChange} className="border p-2 w-full" />
        <input type="date" name="start_date" value={form.start_date || ''} onChange={handleChange} className="border p-2 w-full" />
        <input type="date" name="end_date" value={form.end_date || ''} onChange={handleChange} className="border p-2 w-full" />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
