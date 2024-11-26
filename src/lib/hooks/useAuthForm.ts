import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const authSchema = {
  login: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
  register: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
};

type AuthType = keyof typeof authSchema;
type AuthFormData<T extends AuthType> = z.infer<typeof authSchema[T]>;

export function useAuthForm<T extends AuthType>(type: T) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AuthFormData<T>>({
    resolver: zodResolver(authSchema[type]),
  });

  const onSubmit = async (data: AuthFormData<T>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (type === 'login') {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (authError) throw authError;
      } else if (type === 'register') {
        const { error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (authError) throw authError;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    error,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
