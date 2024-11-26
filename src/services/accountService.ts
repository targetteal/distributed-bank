import { createSupabaseServerComponentClient } from '@/lib/supabase-server';

export async function createPersonalAccount(userId: string) {
    const supabase = createSupabaseServerComponentClient();

    // Check if an account already exists for the user
    const { data: existingAccount, error: checkError } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (checkError && checkError.code !== 'PGRST116') {
        throw new Error('Error checking existing accounts');
    }

    if (existingAccount) {
        throw new Error('Account already exists for this user.');
    }

    // Create new account
    const { data, error } = await supabase
        .from('accounts')
        .insert({
            user_id: userId,
            balance: 0,
            type: 'checking'
        })
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to create account: ${error.message}`);
    }

    return data;
}
