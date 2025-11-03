import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { stats = {}, leadStatusSummary = {}, recentProjects = [], recentLeads = [] } = usePage().props;

  const COLORS = ['#60A5FA', '#FBBF24', '#34D399', '#F87171'];
  const chartData = Object.entries(leadStatusSummary || {}).map(([name, value]) => ({ name, value }));

  return (
    <AuthenticatedLayout title="Dashboard">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-sm text-gray-500">Total Projects</h3>
            <div className="text-3xl font-bold">{stats.projects ?? 0}</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-sm text-gray-500">Total Leads</h3>
            <div className="text-3xl font-bold">{stats.leads ?? 0}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Leads by Status</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={90} label>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent lists... */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Recent Projects</h3>
            <ul className="space-y-2">
              {recentProjects.map((p) => (
                <li key={p.id} className="text-sm">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.status} • {new Date(p.created_at).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Recent Leads</h3>
            <ul className="space-y-2">
              {recentLeads.map((l) => (
                <li key={l.id} className="text-sm">
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-gray-500">{l.email} • {l.status}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
