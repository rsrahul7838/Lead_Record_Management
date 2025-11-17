import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">

                {/* NAVBAR */}
                <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
                            className="w-10"
                            alt="Logo"
                        />
                        <h1 className="text-2xl font-bold text-gray-800">Real Estate CRM</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-gray-700 font-medium hover:text-gray-900"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* HERO SECTION */}
                <div className="flex flex-1 flex-col items-center justify-center text-center px-6 py-16">

                    <h1 className="text-5xl font-extrabold text-gray-800 leading-snug drop-shadow-sm">
                        Manage Leads. Grow Sales.<br />
                        <span className="text-blue-600">Automate Real Estate Business.</span>
                    </h1>

                    <p className="mt-6 text-gray-600 text-lg max-w-2xl">
                        A modern CRM designed for real estate teams. Track leads, assign agents,
                        manage projects, and use AI-powered automation to close deals faster.
                    </p>

                    <div className="mt-10 flex gap-4">
                        <a
                            href="#features"
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Explore Features
                        </a>

                        <Link
                            href={auth.user ? route('dashboard') : route('register')}
                            className="px-6 py-3 bg-white border border-gray-400 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition"
                        >
                            {auth.user ? 'Go to Dashboard' : 'Get Started'}
                        </Link>
                    </div>
                </div>

                {/* FEATURES SECTION */}
                <div id="features" className="px-10 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Lead Management</h3>
                        <p className="text-gray-600">
                            Capture, filter & assign leads to agents with real-time tracking.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">AI Lead Intent</h3>
                        <p className="text-gray-600">
                            Analyze client messages to identify buying intent & seriousness.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Project Management</h3>
                        <p className="text-gray-600">
                            Manage properties, projects, inventory & documentation in one place.
                        </p>
                    </div>
                </div>

                {/* FOOTER */}
                <footer className="text-center py-6 text-gray-500 text-sm">
                    © {new Date().getFullYear()} Real Estate CRM — Powered by GrowTech - Rahul Srivastav
                </footer>
            </div>
        </>
    );
}
