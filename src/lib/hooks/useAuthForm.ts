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

  const onSubmit = async (formData: AuthFormData<T>) => {
    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (type === 'login') {
        result = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
      } else {
        result = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
      }

      if (result.error) {
        setError(result.error.message);
        setIsLoading(false);
        return;
      }

      // Redirect to accounts page after successful authentication
      router.push('/accounts');
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
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

export default useAuthForm;
