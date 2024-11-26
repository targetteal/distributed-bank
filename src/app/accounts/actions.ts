'use server';

import { db } from "@/utils/db";

export async function getPersonalAccounts(userId: string) {
    try {
        const accounts = await db('personal_accounts')
            .where({ user_id: userId })
            .select('*');

        return accounts.map(account => ({
            ...account,
            createdAt: new Date(account.created_at),
            updatedAt: new Date(account.updated_at),
        }));
    } catch (error) {
        console.error('Error fetching personal accounts:', error);
        throw new Error('Failed to fetch personal accounts');
    }
}
