'use client';

import Link from 'next/link';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { FormInput } from '@/components/ui/FormInput';
import { useAuthForm } from '@/lib/hooks/useAuthForm';

export default function LoginPage() {
  const { form: { register, formState: { errors } }, isLoading, error, onSubmit } = useAuthForm('login');

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={onSubmit} className="space-y-6">
        <FormInput
          id="email"
          type="email"
          label="Email"
          disabled={isLoading}
          error={errors.email}
          {...register('email')}
        />

        <FormInput
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          error={errors.password}
          {...register('password')}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            'Sign in'
          )}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
