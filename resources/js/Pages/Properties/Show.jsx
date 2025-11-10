import React, { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show() {
  const { property } = usePage().props;
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const images = property.media?.filter(m => m.type === 'image') || [];

  return (
    <AuthenticatedLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold">{property.name}</h1>
            <div className="text-sm text-gray-600">{property.type} • {property.location}</div>
          </div>
          <div className="flex gap-2">
            <Link href={route('properties.edit', property.id)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</Link>
            <Link href={route('properties.index')} className="bg-gray-300 px-4 py-2 rounded">Back</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Details</h3>
              <p>{property.description}</p>
              <div className="mt-3 text-sm text-gray-600">
                <div>Price: {property.price ? Number(property.price).toLocaleString() : '—'}</div>
                <div>Project: {property.project?.name || '—'}</div>
                <div>Agent: {property.agent?.name || '—'}</div>
                <div>Status: {property.status}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-3">Gallery</h3>
              {images.length === 0 && <div className="text-gray-500">No images uploaded.</div>}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.map(img => (
                  <button key={img.id} onClick={() => { setCurrent(img); setOpen(true); }} className="overflow-hidden rounded">
                    <img src={`/storage/${img.path}`} alt={img.filename} className="w-full h-28 object-cover rounded" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Quick Info</h3>
              <div className="text-sm">
                <div>Location: {property.location}</div>
                <div>Type: {property.type}</div>
                <div>Status: {property.status}</div>
                <div>Price: {property.price}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Documents</h3>
              <ul className="space-y-2">
                {property.media?.filter(m => m.type !== 'image').map(m => (
                  <li key={m.id}>
                    <a href={`/storage/${m.path}`} target="_blank" rel="noreferrer" className="text-blue-600">{m.filename || 'Document'}</a>
                  </li>
                ))}
                {property.media?.filter(m => m.type !== 'image').length === 0 && <li className="text-gray-500">No documents</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Lightbox modal */}
        {open && current && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setOpen(false)}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded max-w-3xl max-h-[80vh] overflow-auto">
              <img src={`/storage/${current.path}`} alt={current.filename} className="max-w-full max-h-[70vh] object-contain" />
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
