import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useRouter } from 'next/navigation';
import useAuthForm from '../useAuthForm';
import { supabase } from '@/lib/supabase';

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
            // Arrange
            (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({ 
                error: null,
                data: { user: {} }
            });
            
            // Act
            const { result } = renderHook(() => useAuthForm('login'));

            await act(async () => {
                result.current.form.setValue('email', validLoginData.email);
                result.current.form.setValue('password', validLoginData.password);
                await result.current.onSubmit();
            });

            // Assert
            expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
                email: validLoginData.email,
                password: validLoginData.password
            });
            expect(mockRouter.push).toHaveBeenCalledWith('/accounts');
            expect(result.current.error).toBeNull();
        });

        it('handles login error', async () => {
            // Arrange
            const mockError = { message: 'Invalid credentials' };
            (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({ 
                error: mockError 
            });
            
            // Act
            const { result } = renderHook(() => useAuthForm('login'));

            await act(async () => {
                result.current.form.setValue('email', validLoginData.email);
                result.current.form.setValue('password', validLoginData.password);
                await result.current.onSubmit();
            });

            // Assert
            expect(result.current.error).toBe('Invalid credentials');
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
            // Arrange
            (supabase.auth.signUp as jest.Mock).mockResolvedValue({ 
                error: null,
                data: { user: {} }
            });
            
            // Act
            const { result } = renderHook(() => useAuthForm('register'));

            await act(async () => {
                result.current.form.setValue('email', validRegisterData.email);
                result.current.form.setValue('password', validRegisterData.password);
                result.current.form.setValue('confirmPassword', validRegisterData.confirmPassword);
                await result.current.onSubmit();
            });

            // Assert
            expect(supabase.auth.signUp).toHaveBeenCalledWith({
                email: validRegisterData.email,
                password: validRegisterData.password
            });
            expect(mockRouter.push).toHaveBeenCalledWith('/accounts');
        });

        it('handles registration error', async () => {
            // Arrange
            const mockError = { message: 'Registration failed' };
            (supabase.auth.signUp as jest.Mock).mockResolvedValue({ 
                error: mockError 
            });
            
            // Act
            const { result } = renderHook(() => useAuthForm('register'));

            await act(async () => {
                result.current.form.setValue('email', validRegisterData.email);
                result.current.form.setValue('password', validRegisterData.password);
                result.current.form.setValue('confirmPassword', validRegisterData.confirmPassword);
                await result.current.onSubmit();
            });

            // Assert
            expect(result.current.error).toBe('Registration failed');
            expect(mockRouter.push).not.toHaveBeenCalled();
        });
    });
});
