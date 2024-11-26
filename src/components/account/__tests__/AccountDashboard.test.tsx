import { render, screen, waitFor } from '@testing-library/react';
import { AccountDashboard } from '../AccountDashboard';
import { getPersonalAccount } from '@/lib/db/accounts';

// Mock the dependencies
jest.mock('@/lib/db/accounts');
jest.mock('@supabase/auth-helpers-nextjs', () => ({
    useUser: jest.fn()
}));
jest.mock('@/lib/supabase/client', () => ({
    createClient: jest.fn()
}));

const mockAccount = {
    id: 'test-account-id',
    user_id: 'test-user-id',
    account_number: '1234567890',
    balance: 100.50,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
};

describe('AccountDashboard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (getPersonalAccount as jest.Mock).mockResolvedValue(mockAccount);
        const useUser = jest.requireMock('@supabase/auth-helpers-nextjs').useUser;
        useUser.mockReturnValue({
            id: 'test-user-id',
            email: 'test@example.com'
        });
    });

    it('renders loading state initially', async () => {
        render(<AccountDashboard />);
        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    it('displays account information when loaded', async () => {
        render(<AccountDashboard />);

        await waitFor(() => {
            expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
        }, { timeout: 10000 });

        expect(screen.getByText('Account Overview')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
        expect(screen.getByText('$100.50')).toBeInTheDocument();
    });

    it('shows error state when account is not found', async () => {
        (getPersonalAccount as jest.Mock).mockRejectedValue(new Error('Account not found'));

        render(<AccountDashboard />);

        await waitFor(() => {
            expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
        }, { timeout: 10000 });

        expect(screen.getByText('No Account Found')).toBeInTheDocument();
    });

    it('handles user not being logged in', async () => {
        const useUser = jest.requireMock('@supabase/auth-helpers-nextjs').useUser;
        useUser.mockReturnValue(null);

        render(<AccountDashboard />);

        await waitFor(() => {
            expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
        }, { timeout: 10000 });

        expect(screen.getByText('No Account Found')).toBeInTheDocument();
    });
});
