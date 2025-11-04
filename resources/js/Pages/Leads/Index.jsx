import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
  const { leads = [], flash = {} } = usePage().props;

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      router.delete(`/leads/${id}`);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Leads</h1>
          <Link href="/leads/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + New Lead
          </Link>
        </div>

        {flash.success && <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{flash.success}</div>}

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b">
                <td className="p-2">{lead.name}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.phone}</td>
                <td className="p-2">{lead.status}</td>
                <td className="p-2">
                  <Link href={`/leads/${lead.id}/edit`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                  <button onClick={() => handleDelete(lead.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
