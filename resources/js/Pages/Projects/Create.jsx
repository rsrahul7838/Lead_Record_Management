import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Create() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'Pending',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/projects', form);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Project name" className="border p-2 w-full" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="border p-2 w-full" />
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="border p-2 w-full" />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
