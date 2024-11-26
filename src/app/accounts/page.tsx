import { CreateAccountButton } from "@/components/accounts/CreateAccountButton";
import { PersonalAccountCard } from "@/components/accounts/PersonalAccountCard";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function AccountsPage() {
    const supabase = createSupabaseServerComponentClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    const { data: accounts, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', session.user.id);

    if (error) {
        console.error('Error fetching accounts:', error);
        return (
            <div className="container mx-auto py-8">
                <div className="text-red-500">
                    Error loading accounts: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Your Accounts</h1>
                <CreateAccountButton userId={session.user.id} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts && accounts.length > 0 ? (
                    accounts.map((account) => (
                        <PersonalAccountCard
                            key={account.id}
                            accountId={account.id}
                            balance={parseFloat(account.balance)}
                            createdAt={account.created_at}
                        />
                    ))
                ) : (
                    <p className="text-muted-foreground col-span-full text-center py-8">
                        You don't have any accounts yet. Create one to get started!
                    </p>
                )}
            </div>
        </div>
    );
}
