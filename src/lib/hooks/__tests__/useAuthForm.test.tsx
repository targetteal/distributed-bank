import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuthForm } from '../useAuthForm';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

jest.mock('@/lib/supabase', () => ({
    supabase: {
        auth: {
            signInWithPassword: jest.fn(),
            signUp: jest.fn()
        }
    }
}));

describe('useAuthForm', () => {
    const mockRouter = {
        push: jest.fn(),
        refresh: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    describe('login form', () => {
        const validLoginData = {
            email: 'test@example.com',
            password: 'Password123'
        };

        it('handles successful login', async () => {
            (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({ error: null });
            
            const { result } = renderHook(() => useAuthForm('login'));

            await act(async () => {
                await result.current.form.setValue('email', validLoginData.email);
                await result.current.form.setValue('password', validLoginData.password);
                await result.current.onSubmit();
            });

            expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
                email: validLoginData.email,
                password: validLoginData.password
            });
            expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
            expect(mockRouter.refresh).toHaveBeenCalled();
            expect(result.current.error).toBeNull();
        });

        it('handles login error', async () => {
            const mockError = new Error('An error occurred');
            (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({ error: mockError });
            
            const { result } = renderHook(() => useAuthForm('login'));

            await act(async () => {
                await result.current.form.setValue('email', validLoginData.email);
                await result.current.form.setValue('password', validLoginData.password);
                await result.current.onSubmit();
            });

            expect(result.current.error).toBe('An error occurred');
            expect(mockRouter.push).not.toHaveBeenCalled();
        });
    });

    describe('register form', () => {
        const validRegisterData = {
            email: 'test@example.com',
            password: 'Password123',
            confirmPassword: 'Password123'
        };

        it('handles successful registration', async () => {
            (supabase.auth.signUp as jest.Mock).mockResolvedValue({ error: null });
            
            const { result } = renderHook(() => useAuthForm('register'));

            await act(async () => {
                await result.current.form.setValue('email', validRegisterData.email);
                await result.current.form.setValue('password', validRegisterData.password);
                await result.current.form.setValue('confirmPassword', validRegisterData.confirmPassword);
                await result.current.onSubmit();
            });

            expect(supabase.auth.signUp).toHaveBeenCalledWith({
                email: validRegisterData.email,
                password: validRegisterData.password
            });
            expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
        });
    });
});
