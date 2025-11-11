import React, { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Index() {
  const { followups = [], agents = [], filters = {}, flash = {} } = usePage().props;

  const [mode, setMode] = useState(filters.mode || "");
  const [agent, setAgent] = useState(filters.agent || "");
  const [status, setStatus] = useState(filters.status || "");
  const [from, setFrom] = useState(filters.from || "");
  const [to, setTo] = useState(filters.to || "");

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('follow-ups.index'), { mode, agent, status, from, to }, { preserveState: true, replace: true });
  };

  const handleDelete = (id, title = "this follow-up") => {
    Swal.fire({
      title: `Delete ${title}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('follow-ups.destroy', id), {
          onSuccess: () => {
            Swal.fire({ icon: "success", title: "Deleted", timer: 1200, showConfirmButton: false });
          },
        });
      }
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Follow-ups</h1>
          <Link href={route('follow-ups.create')} className="bg-blue-600 text-white px-4 py-2 rounded">New Follow-up</Link>
        </div>

        {flash.success && <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{flash.success}</div>}

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
          <select value={mode} onChange={e => setMode(e.target.value)} className="border p-2 rounded">
            <option value="">All Modes</option>
            <option>Call</option>
            <option>Visit</option>
            <option>Email</option>
            <option>Other</option>
          </select>

          <select value={agent} onChange={e => setAgent(e.target.value)} className="border p-2 rounded">
            <option value="">All Agents</option>
            {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>

          <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded">
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="missed">Missed</option>
            <option value="done">Done</option>
          </select>

          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="border p-2 rounded" />
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="border p-2 rounded" />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
            <button type="button" onClick={() => { setMode(''); setAgent(''); setStatus(''); setFrom(''); setTo(''); router.get(route('follow-ups.index')) }} className="bg-gray-200 px-4 py-2 rounded">Reset</button>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">When</th>
                <th className="p-3">Mode</th>
                <th className="p-3">Lead / Client</th>
                <th className="p-3">Agent</th>
                <th className="p-3">Summary</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {followups.map(f => (
                <tr key={f.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{f.followup_at ? new Date(f.followup_at).toLocaleString() : '—'}</td>
                  <td className="p-3">{f.mode}</td>
                  <td className="p-3">
                    {f.lead ? <Link href={route('leads.show', f.lead.id)} className="text-blue-600">{f.lead.name}</Link> : null}
                    {f.client ? <div>{f.client.name}</div> : null}
                  </td>
                  <td className="p-3">{f.user?.name}</td>
                  <td className="p-3">{f.summary ? f.summary.slice(0,80) + (f.summary.length>80?'...':'') : '—'}</td>
                  <td className="p-3">{f.done ? 'Done' : (f.followup_at && new Date(f.followup_at) < new Date() ? 'Missed' : 'Upcoming')}</td>
                  <td className="p-3 text-center">
                    <Link href={route('follow-ups.edit', f.id)} className="text-yellow-600 mr-2">Edit</Link>
                    <button onClick={() => handleDelete(f.id, `${f.lead?.name || f.client?.name || 'follow-up'}`)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
              {followups.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">No follow-ups found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
