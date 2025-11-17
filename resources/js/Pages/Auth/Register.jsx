import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Background */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">

                {/* Card */}
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">

                    {/* Accent Bubble */}
                    <div className="absolute w-40 h-40 bg-blue-200 rounded-full opacity-30 -top-10 -right-10"></div>

                    {/* Back Button */}
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
                        <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Join our CRM platform and start managing leads efficiently
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={submit}>

                        {/* Name */}
                        <div className="relative mt-4">
                            <InputLabel
                                htmlFor="name"
                                value="Full Name"
                                className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-gray-600"
                            />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm 
                                transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring focus:ring-blue-200"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="John Doe"
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Email */}
                        <div className="relative mt-6">
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
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm 
                                transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring focus:ring-blue-200"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
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
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm 
                                transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring focus:ring-blue-200"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Confirm Password */}
                        <div className="relative mt-6">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-gray-600"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm 
                                transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring focus:ring-blue-200"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                placeholder="••••••••"
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex items-center justify-between">

                            <Link
                                href={route('login')}
                                className="text-sm text-blue-600 hover:text-blue-800 underline"
                            >
                                Already registered?
                            </Link>

                            <PrimaryButton
                                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md 
                                transition-all duration-200 disabled:opacity-50"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
