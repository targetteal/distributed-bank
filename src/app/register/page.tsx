'use client';

import { RegisterForm } from '@/components/auth/RegisterForm';
import { AuthLayout } from '@/components/layouts/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout title="Create Your Account">
      <RegisterForm />
    </AuthLayout>
  );
}
