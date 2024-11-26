# Distributed Bank

A banking system for collectives that enables transparent and secure financial management.

## Features

- User registration and authentication
- Personal and shared account management
- Secure and transparent transfers
- Revenue declaration and tracking
- Transaction history and reporting
- AI-powered financial queries

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase (Authentication & Database)
- React Hook Form with Zod validation
- Jest & React Testing Library

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Run tests:
   ```bash
   npm test
   ```

## Project Structure

```
src/
  ├── app/                # Next.js app directory
  ├── components/         # React components
  │   └── auth/          # Authentication components
  ├── lib/               # Utility functions and configurations
  └── tests/             # Test files
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

MIT
