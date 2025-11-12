import React from "react";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export default function Reports() {
    const {
        leadsPerMonth,
        conversionRate,
        salesByProject,
        salesByAgent,
        revenueData,
    } = usePage().props;

    const COLORS = [
        "#4F46E5",
        "#16A34A",
        "#F59E0B",
        "#EF4444",
        "#0EA5E9",
        "#8B5CF6",
    ];

    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
                        📊 Reports & Analytics
                    </h1>
                    <div className="space-x-3">
                        <a
                            href={route("reports.export.excel")}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm"
                        >
                            ⬇️ Export Excel
                        </a>
                        <a
                            href={route("reports.export.pdf")}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm"
                        >
                            📄 Export PDF
                        </a>
                    </div>
                </div>

                {/* STATS OVERVIEW */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-100 dark:bg-blue-900 p-5 rounded-xl shadow text-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Conversion Rate
                        </h2>
                        <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-2">
                            {conversionRate}%
                        </p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 p-5 rounded-xl shadow text-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Total Leads (6 Months)
                        </h2>
                        <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-2">
                            {leadsPerMonth.reduce((a, b) => a + b.total, 0)}
                        </p>
                    </div>
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-5 rounded-xl shadow text-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Total Revenue (₹)
                        </h2>
                        <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-300 mt-2">
                            ₹
                            {revenueData
                                .reduce((a, b) => a + b.revenue, 0)
                                .toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>

                {/* 📅 Leads per Month Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                        Leads Per Month
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={leadsPerMonth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#4F46E5" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* 💰 Revenue Trend */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                        Monthly Revenue Trend
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#16A34A"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 🧩 Sales by Project */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                        Sales by Project
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                dataKey="sold_count"
                                data={salesByProject}
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {salesByProject.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* 👨‍💼 Sales by Agent */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                        Agent Sales Performance
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesByAgent}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sold_count" fill="#0EA5E9" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
