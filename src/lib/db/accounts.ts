import { createClient } from '@/lib/supabase/client';
import { PersonalAccount, PersonalAccountCreate } from '../types/account';

export async function createPersonalAccount(userId: string): Promise<PersonalAccount | null> {
    const supabase = createClient();
    
    const { data, error } = await supabase
        .from('personal_accounts')
        .insert([
            { 
                user_id: userId,
                status: 'active',
                balance: 0
            }
        ])
        .select()
        .single();
    
    if (error) {
        console.error('Error creating personal account:', error);
        return null;
    }
    
    return data;
}

export async function getPersonalAccount(userId: string): Promise<PersonalAccount | null> {
    const supabase = createClient();
    
    const { data, error } = await supabase
        .from('personal_accounts')
        .select('*')
        .eq('user_id', userId)
        .single();
    
    if (error) {
        console.error('Error fetching personal account:', error);
        return null;
    }
    
    return data;
}

export async function updateAccountStatus(accountId: string, status: PersonalAccount['status']): Promise<boolean> {
    const supabase = createClient();
    
    const { error } = await supabase
        .from('personal_accounts')
        .update({ status })
        .eq('id', accountId);
    
    if (error) {
        console.error('Error updating account status:', error);
        return false;
    }
    
    return true;
}
