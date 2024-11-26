import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Distributed Bank',
  description: 'Create a new account for Distributed Bank',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
