import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Background */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">

                {/* Card */}
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">

                    {/* Accent Decoration */}
                    <div className="absolute w-40 h-40 bg-blue-200 rounded-full opacity-30 -top-10 -right-10"></div>

                    {/* Logo & Title */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
                            className="w-14 mb-3 drop-shadow"
                            alt="Logo"
                        />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Welcome Back
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Login to manage your real estate leads
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={submit}>

                        {/* Email Field */}
                        <div className="relative mt-4">
                            <InputLabel
                                htmlFor="email"
                                value="Email Address"
                                className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-gray-600"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring focus:ring-blue-200"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password Field */}
                        <div className="relative mt-6">
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-gray-600"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring focus:ring-blue-200"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember Me */}
                        <div className="mt-4 flex items-center gap-2">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-gray-400 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Remember me</span>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                                >
                                    Forgot Password?
                                </Link>
                            )}

                            <PrimaryButton
                                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={processing}
                            >
                                Log In
                            </PrimaryButton>
                        </div>
                    </form>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <Link
                            href={route('register')}
                            className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
