import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { projects, flash } = usePage().props;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/projects/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + New Project
        </Link>
      </div>

      {flash.success && <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{flash.success}</div>}

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Owner</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.owner?.name}</td>
              <td className="p-2">{p.status}</td>
              <td className="p-2">
                <Link href={`/projects/${p.id}/edit`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                <Link as="button" method="delete" href={`/projects/${p.id}`} className="text-red-600 hover:underline">
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
