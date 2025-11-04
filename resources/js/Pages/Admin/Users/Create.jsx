import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react'; 

export default function Create({ roles }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('users.store'));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create User" />

      <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* ✅ Header with Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Create New User</h2>

          <Link
            href={route('users.index')}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label className="block">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="block">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
            />
            {errors.password && <div className="text-red-500">{errors.password}</div>}
          </div>

          <div className="mb-3">
            <label className="block">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block">Role</label>
            <select
              className="w-full p-2 border rounded"
              value={data.role_id}
              onChange={(e) => setData('role_id', e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            {errors.role_id && <div className="text-red-500">{errors.role_id}</div>}
          </div>

          <button
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            {processing ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
