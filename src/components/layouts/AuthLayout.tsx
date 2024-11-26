'use client';

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Distributed Bank
          </h1>
          <h2 className="text-xl text-center text-gray-600 mb-8">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
