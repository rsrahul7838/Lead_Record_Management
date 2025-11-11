import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Today() {
  const { followUps = [] } = usePage().props;

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Today's Follow-ups</h1>
          <Link
            href={route('follow-ups.index')}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Back to All
          </Link>
        </div>

        {followUps.length > 0 ? (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">When</th>
                  <th className="p-3">Lead / Client</th>
                  <th className="p-3">Agent</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3">Summary</th>
                </tr>
              </thead>
              <tbody>
                {followUps.map(f => (
                  <tr key={f.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{f.followup_at ? new Date(f.followup_at).toLocaleString() : '—'}</td>
                    <td className="p-3">{f.lead?.name || f.client?.name || '—'}</td>
                    <td className="p-3">{f.user?.name || '—'}</td>
                    <td className="p-3">{f.mode}</td>
                    <td className="p-3">{f.summary || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic mt-6 text-center">No follow-ups scheduled for today 🎉</p>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
