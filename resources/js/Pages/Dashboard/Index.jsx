import React from 'react';
import { usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard() {
  const { stats, leadStatusSummary, recentProjects, recentLeads } = usePage().props;

  const COLORS = ['#60A5FA', '#FBBF24', '#34D399', '#F87171'];

  const chartData = Object.entries(leadStatusSummary || {}).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <div className="p-6 space-y-6">
        {/* === Stats === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Projects" value={stats.totalProjects} />
          <StatCard title="Active Projects" value={stats.activeProjects} />
          <StatCard title="Total Leads" value={stats.totalLeads} />
          <StatCard title="Total Users" value={stats.totalUsers} />
        </div>

        {/* === Chart === */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Leads by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* === Recent Activities === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTable title="Recent Projects" data={recentProjects} />
          <RecentTable title="Recent Leads" data={recentLeads} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
      <h2 className="text-sm text-gray-500 dark:text-gray-400">{title}</h2>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}

function RecentTable({ title, data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2 text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
