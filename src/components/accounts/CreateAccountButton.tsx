'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface CreateAccountButtonProps {
    userId: string;
}

export function CreateAccountButton({ userId }: CreateAccountButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleCreateAccount = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('accounts')
                .insert({
                    user_id: userId,
                    balance: 0,
                    type: 'checking'
                })
                .select();

            if (error) throw error;

            // Refresh the page to show the new account
            router.refresh();
        } catch (err: any) {
            console.error('Error creating account:', err);
            setError(err.message || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Button 
                onClick={handleCreateAccount} 
                disabled={isLoading}
                variant="default"
                size="sm"
            >
                {isLoading ? 'Creating...' : 'Create New Account'}
            </Button>
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}
