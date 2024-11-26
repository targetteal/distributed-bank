import { AccountDashboard } from '@/components/account/AccountDashboard';
import { createServerClient } from '@/lib/supabase/server';
import { createPersonalAccount, getPersonalAccount } from '@/lib/db/accounts';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
    const supabase = createServerClient();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        redirect('/login');
    }

    // Check if user has an account, if not create one
    const account = await getPersonalAccount(session.user.id);
    if (!account) {
        await createPersonalAccount(session.user.id);
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Your Account</h1>
            <AccountDashboard />
        </div>
    );
}
