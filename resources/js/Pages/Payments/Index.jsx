import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Index() {
  const { payments, flash, filters } = usePage().props;
  const [search, setSearch] = useState(filters?.search || "");
  const [mode, setMode] = useState(filters?.mode || "");

  // 🔍 Handle Search and Filter
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(
      route("payments.index"),
      { search, mode },
      { preserveState: true, replace: true }
    );
  };

  // 🗑 SweetAlert Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This payment record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route("payments.destroy", id), {
          onSuccess: () => {
            Swal.fire("Deleted!", "The payment has been removed.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Failed to delete payment.", "error");
          },
        });
      }
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            💰 Payment Management
          </h1>
          <Link
            href={route("payments.create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            + Add Payment
          </Link>
        </div>

        {/* Flash Message */}
        {flash?.success && (
          <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg mb-4 shadow-sm">
            ✅ {flash.success}
          </div>
        )}

        {/* Search + Filter */}
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          <input
            type="text"
            placeholder="Search by property or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-1/3 dark:bg-gray-700 dark:text-white"
          />

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Modes</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Bank">Bank</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Filter
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Property</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Mode</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.data.length > 0 ? (
                payments.data.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={`border-b ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    } hover:bg-blue-50 dark:hover:bg-gray-700 transition`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {p.property?.name || "—"}
                    </td>
                    <td className="px-4 py-3">{p.client?.name || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-green-700">
                      ₹{Number(p.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          p.payment_mode === "Cash"
                            ? "bg-green-100 text-green-800"
                            : p.payment_mode === "UPI"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {p.payment_mode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(p.payment_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center space-x-3">
                      <Link
                        href={route("payments.edit", p.id)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Edit
                      </Link>

                      <a
                        href={route("payments.invoice", p.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline font-medium"
                      >
                        Invoice
                      </a>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:underline font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 dark:text-gray-400 py-6 italic"
                  >
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {payments.links?.length > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            {payments.links.map((link, i) => (
              <button
                key={i}
                disabled={!link.url}
                onClick={() => link.url && router.get(link.url)}
                className={`px-3 py-1 rounded-md ${
                  link.active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } disabled:opacity-50`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
