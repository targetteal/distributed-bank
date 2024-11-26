# AI Coder Guidelines

## Code Quality
1. Write **comprehensive unit tests** for every function and module using **Jest** to ensure robust functionality.
2. Follow **TypeScript best practices** and adhere to **ESLint rules** for maintaining code quality.
3. Use **descriptive variable and function names** to enhance clarity and readability.
4. Provide **TSDoc comments** for all functions, detailing parameters, return types, and functionality.

## Architecture and Modularity
5. Ensure **all code is modular**, reusable, and adheres to SOLID principles.
6. Utilize **React components with Schadcn** for consistent UI patterns and reusable logic.
7. Follow **Next.js conventions**, leveraging its file-based routing and API route structure for backend functionality.
8. Use **Supabase for database operations** and authentication, managing data through its schema-driven API.

## Styling and Design
9. Use **Tailwind CSS** for styling, adhering to a consistent design system.
10. Implement utility-first styling to maintain a balance between clarity and flexibility.
11. Leverage **Tailwind's JIT mode** for optimal performance during development and production builds.

## Error Handling and Security
12. Implement **error boundaries** in React to gracefully handle UI crashes.
13. Use Supabase's **RLS (Row-Level Security)** to enforce fine-grained access control.
14. Validate inputs and API requests using **Zod** or similar libraries to ensure type-safe validation.

## Performance and Optimization
15. Prioritize **server-side rendering (SSR)** or **static site generation (SSG)** via Next.js for SEO-critical pages.
16. Use **React's Suspense and lazy loading** for code splitting and improving initial page load times.
17. Optimize **Supabase queries** with indexes and tailored schema design for high performance.

## Documentation and Testing
18. Document all API endpoints and workflows using **Supabase Swagger** or custom documentation tools.
19. Write **automated tests** for React components using **React Testing Library**.
20. Mock Supabase services in tests to ensure independence and faster execution.
21. Use **Playwright or Cypress** for end-to-end testing of the Next.js application.

## Features and Functionality
22. Support **complex queries** and real-time updates using Supabase's subscriptions.
23. Ensure **file storage is secure and scalable** with Supabase's storage solution.
24. Leverage **React Schadcn's primitives** for accessible, consistent components.

## Best Practices
25. Maintain a clear separation of concerns in React components and hooks.
26. Avoid hardcoding configurations; use environment variables and Next.js' built-in **dotenv** support for flexibility.
27. Always consider scalability and future maintainability when designing components or architecture.


