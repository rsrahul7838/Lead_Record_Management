import React from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BarChart3, Users, Home, Target } from "lucide-react";

export default function Index() {
  const { user, agents = [], selectedAgentId, myLeads, myProperties, stats } = usePage().props;

  // 🔄 Handle agent change for admin
  const handleAgentChange = (e) => {
    router.get(route("agent.index"), { agent_id: e.target.value });
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            👋 Welcome, {user.name}
          </h1>

          {/* ✅ Only for Admins — select Agent */}
          {user.roles?.includes("Super Admin") && (
            <select
              value={selectedAgentId}
              onChange={handleAgentChange}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 dark:bg-gray-700 dark:text-white"
            >
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* 🧭 Stats Section */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { title: "My Leads", icon: <Users size={18} />, color: "blue", value: stats.totalLeads },
            { title: "Sold Properties", icon: <Home size={18} />, color: "green", value: stats.totalSold },
            { title: "Target", icon: <Target size={18} />, color: "yellow", value: stats.target },
            { title: "Progress", icon: <BarChart3 size={18} />, color: "purple", value: `${stats.progress}%` },
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-${stat.color}-100 dark:bg-${stat.color}-900 p-4 rounded-xl shadow`}
            >
              <div className={`flex items-center gap-2 text-${stat.color}-800 dark:text-${stat.color}-200`}>
                {stat.icon}
                <h3 className="font-semibold">{stat.title}</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 🧾 Leads Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Recent Leads
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Project</th>
                  <th className="px-4 py-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {myLeads.length ? (
                  myLeads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-2">{lead.name}</td>
                      <td className="px-4 py-2">{lead.status}</td>
                      <td className="px-4 py-2">{lead.project?.name || "—"}</td>
                      <td className="px-4 py-2">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No leads assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🏘 Properties Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Assigned Properties
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Property</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {myProperties.length ? (
                  myProperties.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-2">{p.name}</td>
                      <td className="px-4 py-2">{p.location}</td>
                      <td className="px-4 py-2">{p.status}</td>
                      <td className="px-4 py-2">₹{Number(p.price).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No properties assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
