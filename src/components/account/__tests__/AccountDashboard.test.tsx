import { render, screen, waitFor, act } from '@testing-library/react';
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

const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com'
};

describe('AccountDashboard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        const useUser = jest.requireMock('@supabase/auth-helpers-nextjs').useUser;
        useUser.mockReturnValue(mockUser);
    });

    it('renders loading state initially', async () => {
        (getPersonalAccount as jest.Mock).mockImplementation(
            () => new Promise(resolve => setTimeout(() => resolve(mockAccount), 100))
        );

        await act(async () => {
            render(<AccountDashboard />);
        });

        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    it('displays account information when loaded', async () => {
        (getPersonalAccount as jest.Mock).mockResolvedValue(mockAccount);

        await act(async () => {
            render(<AccountDashboard />);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Account Overview')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
        expect(screen.getByText(/\$100\.50/)).toBeInTheDocument();
        expect(screen.getByText(/active/i)).toBeInTheDocument();
    });

    it('handles error state correctly', async () => {
        const error = new Error('Account not found');
        (getPersonalAccount as jest.Mock).mockRejectedValue(error);

        await act(async () => {
            render(<AccountDashboard />);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
        });

        expect(screen.getByText('No Account Found')).toBeInTheDocument();
        expect(screen.getByText('There was an error loading your account information.')).toBeInTheDocument();
    });

    it('shows frozen status when account is frozen', async () => {
        const frozenAccount = { ...mockAccount, status: 'frozen' };
        (getPersonalAccount as jest.Mock).mockResolvedValue(frozenAccount);

        await act(async () => {
            render(<AccountDashboard />);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
        });

        expect(screen.getByText(/frozen/i)).toBeInTheDocument();
    });

    it('formats large balance amounts correctly', async () => {
        const accountWithLargeBalance = { ...mockAccount, balance: 1234567.89 };
        (getPersonalAccount as jest.Mock).mockResolvedValue(accountWithLargeBalance);

        await act(async () => {
            render(<AccountDashboard />);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
        });

        // Using regex to match the balance since it might be split into multiple elements
        expect(screen.getByText(/1234567\.89/)).toBeInTheDocument();
    });
});
