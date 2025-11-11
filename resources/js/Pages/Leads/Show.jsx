import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show() {
  const { lead, followups = [] } = usePage().props;

  return (
    <AuthenticatedLayout>
      <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Lead Details
          </h1>
          <Link
            href={route("leads.index")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:text-white px-4 py-2 rounded"
          >
            ← Back
          </Link>
        </div>

        {/* Lead Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p><strong>Name:</strong> {lead.name}</p>
            <p><strong>Email:</strong> {lead.email || "—"}</p>
            <p><strong>Phone:</strong> {lead.phone || "—"}</p>
          </div>
          <div>
            <p><strong>Owner:</strong> {lead.owner?.name || "—"}</p>
            <p><strong>Status:</strong> {lead.status}</p>
          </div>
        </div>

        {/* Notes */}
        {lead.notes && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{lead.notes}</p>
          </div>
        )}

        {/* Follow-Up Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Follow-Up History
            </h2>
            <Link
              href={route("follow-ups.create", { lead_id: lead.id })}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Log Follow-Up
            </Link>
          </div>

          {followups.length === 0 ? (
            <p className="text-gray-500 italic">No follow-ups yet.</p>
          ) : (
            <ul className="space-y-3">
              {followups.map((f) => (
                <li
                  key={f.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      {f.mode} — {f.user?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {f.followup_at
                        ? new Date(f.followup_at).toLocaleString()
                        : "—"}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {f.summary || "No summary provided."}
                  </p>
                  <div className="text-xs mt-2 text-gray-500">
                    Status:{" "}
                    {f.done
                      ? "✅ Completed"
                      : f.followup_at &&
                        new Date(f.followup_at) < new Date()
                      ? "⚠️ Missed"
                      : "📅 Upcoming"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
