'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPersonalAccount } from '@/lib/db/accounts';
import { PersonalAccount } from '@/lib/types/account';
import { useUser } from '@supabase/auth-helpers-nextjs';
import { Skeleton } from '@/components/ui/skeleton';

const AccountDashboard = () => {
    const [account, setAccount] = useState<PersonalAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const user = useUser();

    useEffect(() => {
        async function loadAccount() {
            if (!user) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                const accountData = await getPersonalAccount(user.id);
                setAccount(accountData);
            } catch (error) {
                console.error('Error loading account:', error);
            } finally {
                setLoading(false);
            }
        }

        loadAccount();
    }, [user]);

    if (loading) {
        return (
            <div className="space-y-4" data-testid="loading-skeleton">
                <Skeleton className="h-[125px] w-full" />
                <Skeleton className="h-[125px] w-full" />
            </div>
        );
    }

    if (!account || !user) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No Account Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>There was an error loading your account information.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Account Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Account Number:</span>
                            <span className="font-mono">{account.account_number}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Balance:</span>
                            <span className="text-2xl font-bold">
                                ${account.balance.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Status:</span>
                            <span className={`capitalize ${
                                account.status === 'active' ? 'text-green-600' :
                                account.status === 'frozen' ? 'text-blue-600' :
                                'text-red-600'
                            }`}>
                                {account.status}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AccountDashboard;
