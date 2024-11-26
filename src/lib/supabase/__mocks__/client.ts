export const createClient = jest.fn(() => ({
    from: jest.fn(() => ({
        select: jest.fn(() => ({
            eq: jest.fn(() => ({
                single: jest.fn(() => ({ data: null, error: null }))
            }))
        }))
    })),
    auth: {
        getUser: jest.fn(() => Promise.resolve({ data: { user: null }, error: null }))
    }
}));
