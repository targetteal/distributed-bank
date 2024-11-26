'use client';

import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PersonalAccountCardProps {
    accountId: string;
    balance: number;
    createdAt: string;
}

export function PersonalAccountCard({ 
    accountId, 
    balance, 
    createdAt 
}: PersonalAccountCardProps) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Account {accountId.slice(-4)}</h3>
                <span className="text-sm text-gray-500">
                    Created: {new Date(createdAt).toLocaleDateString()}
                </span>
            </div>
            <div className="text-3xl font-bold text-green-600">
                {formatCurrency(balance)}
            </div>
            <div className="flex space-x-2">
                <Button variant="subtle" size="sm">
                    View Details
                </Button>
                <Button variant="outline" size="sm">
                    Transfer
                </Button>
            </div>
        </div>
    );
}
