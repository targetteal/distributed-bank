require('@testing-library/jest-dom');

import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Supabase client
jest.mock('@supabase/auth-helpers-nextjs', () => ({
    createServerComponentClient: jest.fn(() => ({
        auth: {
            getSession: jest.fn().mockResolvedValue({
                data: { 
                    session: {
                        user: {
                            id: 'test-user-id',
                            email: 'test@example.com'
                        }
                    }
                },
                error: null
            })
        },
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null })
    })),
    createRouteHandlerClient: jest.fn(() => ({
        auth: {
            getSession: jest.fn().mockResolvedValue({
                data: { 
                    session: {
                        user: {
                            id: 'test-user-id',
                            email: 'test@example.com'
                        }
                    }
                },
                error: null
            })
        }
    })),
    createClientComponentClient: jest.fn(() => ({
        auth: {
            signInWithPassword: jest.fn().mockResolvedValue({
                data: { user: { id: 'test-user-id' } },
                error: null
            }),
            signUp: jest.fn().mockResolvedValue({
                data: { user: { id: 'test-user-id' } },
                error: null
            }),
            getSession: jest.fn().mockResolvedValue({
                data: { 
                    session: {
                        user: {
                            id: 'test-user-id',
                            email: 'test@example.com'
                        }
                    }
                },
                error: null
            })
        },
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null })
    }))
}));
