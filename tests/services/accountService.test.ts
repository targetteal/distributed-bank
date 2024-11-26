import { createPersonalAccount } from '../../src/services/accountService';
import { createSupabaseServerComponentClient } from '@/lib/supabase-server';

// Mock the Supabase server component client
jest.mock('@/lib/supabase-server', () => ({
    createSupabaseServerComponentClient: jest.fn()
}));

describe('createPersonalAccount', () => {
    const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn(),
        insert: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (createSupabaseServerComponentClient as jest.Mock).mockReturnValue(mockSupabase);
    });

    it('should create a new personal account for a user', async () => {
        // Arrange
        const userId = 'user-123';
        
        // Mock check for existing account
        mockSupabase.select.mockReturnThis();
        mockSupabase.eq.mockReturnThis();
        mockSupabase.single.mockResolvedValueOnce({ 
            data: null, 
            error: { code: 'PGRST116' } 
        });
        
        // Mock account creation
        mockSupabase.insert.mockReturnThis();
        mockSupabase.select.mockReturnThis();
        mockSupabase.single.mockResolvedValueOnce({ 
            data: { 
                user_id: userId, 
                balance: 0, 
                type: 'checking' 
            }, 
            error: null 
        });

        // Act
        const account = await createPersonalAccount(userId);

        // Assert
        expect(mockSupabase.from).toHaveBeenCalledWith('accounts');
        expect(mockSupabase.select).toHaveBeenCalled();
        expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', userId);
        expect(account).toEqual(expect.objectContaining({
            user_id: userId,
            balance: 0,
            type: 'checking'
        }));
    });

    it('should throw an error if an account already exists for the user', async () => {
        // Arrange
        const userId = 'user-123';
        
        // Mock existing account
        mockSupabase.select.mockReturnThis();
        mockSupabase.eq.mockReturnThis();
        mockSupabase.single.mockResolvedValueOnce({ 
            data: { account_id: 'existing-account' }, 
            error: null 
        });

        // Act & Assert
        await expect(createPersonalAccount(userId)).rejects.toThrow('Account already exists for this user.');
    });

    it('should throw an error if checking accounts fails', async () => {
        // Arrange
        const userId = 'user-123';
        
        // Mock error checking accounts
        mockSupabase.select.mockReturnThis();
        mockSupabase.eq.mockReturnThis();
        mockSupabase.single.mockResolvedValueOnce({ 
            data: null, 
            error: { code: 'SOME_OTHER_ERROR' } 
        });

        // Act & Assert
        await expect(createPersonalAccount(userId)).rejects.toThrow('Error checking existing accounts');
    });
});
