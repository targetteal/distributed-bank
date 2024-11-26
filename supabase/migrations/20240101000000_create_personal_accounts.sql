-- Create personal_accounts table
CREATE TABLE personal_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    account_number TEXT UNIQUE NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'closed')) NOT NULL,
    CONSTRAINT positive_balance CHECK (balance >= 0)
);

-- Create function to generate account number
CREATE OR REPLACE FUNCTION generate_account_number()
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
    exists_already BOOLEAN;
BEGIN
    LOOP
        -- Generate a random 10-digit number
        new_number := LPAD(FLOOR(RANDOM() * 10000000000)::TEXT, 10, '0');
        
        -- Check if this number already exists
        SELECT EXISTS (
            SELECT 1 FROM personal_accounts WHERE account_number = new_number
        ) INTO exists_already;
        
        -- If it doesn't exist, we can use it
        IF NOT exists_already THEN
            RETURN new_number;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically generate account number
CREATE OR REPLACE FUNCTION set_account_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.account_number IS NULL THEN
        NEW.account_number := generate_account_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_account_number
    BEFORE INSERT ON personal_accounts
    FOR EACH ROW
    EXECUTE FUNCTION set_account_number();

-- Set up RLS policies
ALTER TABLE personal_accounts ENABLE ROW LEVEL SECURITY;

-- Users can only view their own accounts
CREATE POLICY "Users can view own accounts"
    ON personal_accounts
    FOR SELECT
    USING (auth.uid() = user_id);

-- Only system can insert accounts
CREATE POLICY "System can insert accounts"
    ON personal_accounts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can only update status of their own accounts
CREATE POLICY "Users can update account status"
    ON personal_accounts
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_personal_accounts_updated_at
    BEFORE UPDATE ON personal_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to prevent direct balance updates
CREATE OR REPLACE FUNCTION prevent_direct_balance_updates()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.balance != OLD.balance THEN
        RAISE EXCEPTION 'Direct balance updates are not allowed. Use transactions instead.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_balance_updates
    BEFORE UPDATE ON personal_accounts
    FOR EACH ROW
    EXECUTE FUNCTION prevent_direct_balance_updates();
