import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
  const { properties = [], clients = [], flash = {} } = usePage().props;

  const { data, setData, post, processing, errors, progress } = useForm({
    property_id: "",
    client_id: "",
    amount: "",
    payment_date: "",
    payment_mode: "Cash",
    remarks: "",
    receipt: null, 
  });

  // optional receipt preview
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!data.receipt) {
      setPreview(null);
      return;
    }
    const file = data.receipt;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, [data.receipt]);

  const submit = (e) => {
    e.preventDefault();
    // use `post` with multipart/form automatically
    post(route("payments.store"), {
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Add Payment</h1>

        {flash.success && (
          <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{flash.success}</div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Property <span className="text-red-500">*</span></label>
            <select
              value={data.property_id}
              onChange={(e) => setData("property_id", e.target.value)}
              required
              className="border p-2 w-full rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select property</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.property_id && <div className="text-red-500 text-sm mt-1">{errors.property_id}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Client <span className="text-red-500">*</span></label>
            <select
              value={data.client_id}
              onChange={(e) => setData("client_id", e.target.value)}
              required
              className="border p-2 w-full rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.client_id && <div className="text-red-500 text-sm mt-1">{errors.client_id}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹) <span className="text-red-500">*</span></label>
            <input
              type="number"
              step="0.01"
              value={data.amount}
              onChange={(e) => setData("amount", e.target.value)}
              required
              className="border p-2 w-full rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={data.payment_date}
              onChange={(e) => setData("payment_date", e.target.value)}
              required
              className="border p-2 w-full rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            {errors.payment_date && <div className="text-red-500 text-sm mt-1">{errors.payment_date}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Mode</label>
            <select
              value={data.payment_mode}
              onChange={(e) => setData("payment_mode", e.target.value)}
              className="border p-2 w-full rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option>Cash</option>
              <option>Bank</option>
              <option>UPI</option>
              <option>Other</option>
            </select>
            {errors.payment_mode && <div className="text-red-500 text-sm mt-1">{errors.payment_mode}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Receipt (PDF / image)</label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => setData("receipt", e.target.files[0])}
              className="w-full"
            />
            {progress && <div className="text-xs text-gray-500 mt-1">Uploading: {progress.percentage}%</div>}
            {errors.receipt && <div className="text-red-500 text-sm mt-1">{errors.receipt}</div>}
            {preview && (
              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">Preview</div>
                <img src={preview} alt="receipt preview" className="max-h-48 rounded shadow-sm" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              value={data.remarks}
              onChange={(e) => setData("remarks", e.target.value)}
              className="border p-2 w-full rounded-md dark:bg-gray-700 dark:border-gray-600"
              rows="3"
            />
            {errors.remarks && <div className="text-red-500 text-sm mt-1">{errors.remarks}</div>}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={() => window.history.back()} className="bg-gray-300 px-4 py-2 rounded-md dark:bg-gray-700">
              Back
            </button>
            <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded-md">
              {processing ? "Saving..." : "Save Payment"}
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
