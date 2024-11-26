import { RegisterForm } from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Distributed Bank',
  description: 'Create a new account for Distributed Bank',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg">
        <RegisterForm />
      </div>
    </main>
  );
}
