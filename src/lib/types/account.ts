export type PersonalAccount = {
    id: string;
    user_id: string;
    account_number: string;
    balance: number;
    created_at: string;
    updated_at: string;
    status: 'active' | 'frozen' | 'closed';
}

export type PersonalAccountCreate = Omit<PersonalAccount, 'id' | 'created_at' | 'updated_at' | 'account_number'>;
