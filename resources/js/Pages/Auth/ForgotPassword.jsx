import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            {/* Background */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">

                {/* Card */}
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">

                    {/* Accent Decoration */}
                    <div className="absolute w-40 h-40 bg-blue-200 rounded-full opacity-30 -top-10 -right-10"></div>

                    {/* BACK BUTTON */}
                    <div className="mb-4">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back to Login
                        </Link>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Enter your email and we will send you a password reset link.
                        </p>
                    </div>

                    {/* Status */}
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={submit}>
                        
                        {/* Email Field */}
                        <div className="relative mt-4">
                            <label
                                htmlFor="email"
                                className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-gray-600"
                            >
                                Email Address
                            </label>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring focus:ring-blue-200"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 flex justify-end">
                            <PrimaryButton
                                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200 disabled:opacity-50"
                                disabled={processing}
                            >
                                Email Password Reset Link
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
