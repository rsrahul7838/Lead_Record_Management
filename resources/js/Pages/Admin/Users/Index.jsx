import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ users, roles, filters = {} }) {
  const [search, setSearch] = useState(filters.search || '');
  const [role, setRole] = useState(filters.role || '');

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(route('users.destroy', id));
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    router.get(route('users.index'), { search, role }, { preserveState: true });
  };

  return (
    <AuthenticatedLayout>
      <Head title="User Management" />

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <Link
            href={route('users.create')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            + Create User
          </Link>
        </div>

        {/* 🔍 Search and Filter Bar */}
        <form onSubmit={handleFilter} className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-1/3 dark:bg-gray-700 dark:text-white"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Roles</option>
            {roles.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>

        <table className="min-w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.roles.length > 0 ? user.roles[0].name : 'No Role'}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      href={route('users.edit', user.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
