import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit() {
  const { payment = {}, properties = [], clients = [], flash = {} } = usePage().props;

  const { data, setData, put, processing, errors, progress } = useForm({
    property_id: payment.property_id || "",
    client_id: payment.client_id || "",
    amount: payment.amount || "",
    payment_date: payment.payment_date ? payment.payment_date : "",
    payment_mode: payment.payment_mode || "Cash",
    remarks: payment.remarks || "",
    receipt: null, // new file if user wants to replace
  });

  const [existingReceiptUrl, setExistingReceiptUrl] = useState(payment.receipt_path ? `/storage/${payment.receipt_path}` : null);
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
    put(route("payments.update", payment.id), { forceFormData: true });
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Payment</h1>

        {flash.success && <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{flash.success}</div>}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Property</label>
            <select value={data.property_id} onChange={(e) => setData("property_id", e.target.value)} className="border p-2 w-full rounded-md dark:bg-gray-700">
              <option value="">Select property</option>
              {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {errors.property_id && <div className="text-red-500 text-sm mt-1">{errors.property_id}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Client</label>
            <select value={data.client_id} onChange={(e) => setData("client_id", e.target.value)} className="border p-2 w-full rounded-md dark:bg-gray-700">
              <option value="">Select client</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.client_id && <div className="text-red-500 text-sm mt-1">{errors.client_id}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <input type="number" step="0.01" value={data.amount} onChange={(e) => setData("amount", e.target.value)} className="border p-2 w-full rounded-md dark:bg-gray-700" />
            {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Date</label>
            <input type="date" value={data.payment_date} onChange={(e) => setData("payment_date", e.target.value)} className="border p-2 w-full rounded-md dark:bg-gray-700" />
            {errors.payment_date && <div className="text-red-500 text-sm mt-1">{errors.payment_date}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Mode</label>
            <select value={data.payment_mode} onChange={(e) => setData("payment_mode", e.target.value)} className="border p-2 w-full rounded-md dark:bg-gray-700">
              <option>Cash</option>
              <option>Bank</option>
              <option>UPI</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Replace Receipt (optional)</label>
            <input type="file" accept=".pdf,image/*" onChange={(e) => setData("receipt", e.target.files[0])} className="w-full" />
            {progress && <div className="text-xs text-gray-500 mt-1">Uploading: {progress.percentage}%</div>}
            {errors.receipt && <div className="text-red-500 text-sm mt-1">{errors.receipt}</div>}

            {preview ? (
              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">New receipt preview</div>
                <img src={preview} alt="receipt preview" className="max-h-48 rounded" />
              </div>
            ) : existingReceiptUrl ? (
              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">Existing receipt</div>
                <a href={existingReceiptUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open receipt</a>
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea value={data.remarks} onChange={(e) => setData("remarks", e.target.value)} className="border p-2 w-full rounded-md dark:bg-gray-700" rows="3" />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={() => window.history.back()} className="bg-gray-300 px-4 py-2 rounded-md dark:bg-gray-700">Back</button>
            <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded-md">{processing ? "Updating..." : "Update Payment"}</button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
