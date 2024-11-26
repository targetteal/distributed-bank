# Distributed Bank for Collectives

A robust web and mobile-friendly application designed for members of a collective to manage their mutual credit accounts. This system facilitates transparency, secure transactions, and accountability within the group.

---

## Key Features

### 1. **User Roles**
   - **Members**: Can view their balances, make transfers, declare revenues.
   - **Data Accessors**: Have read-only access to all transactions and account data.
   - **Administrators**: Can configure system-wide settings (e.g., contribution percentages), create accounts, approve reversals, and manage members.

---

### 2. **Account Management**
   - **Individual Accounts**: Each member has a personal account to track their credits and debits.
   - **Shared Accounts**: Administrators can create accounts tied to the collective or specific projects. Shared accounts can have unique contribution percentages.

---

### 3. **Transfers**
   - **Categories**:
     - **Personal**: Transactions unrelated to the collective (e.g., selling personal items).
     - **Remuneration**: Payment for internal work performed by a member, debited from one of the collective’s account.
     - **Expense Reimbursement**: Refund for expenses paid by a member on behalf of the collective.
     - **Revenue Receipt**: Funds received by a member that belong to the collective, pending distribution.

   - **Features**:
     - Users can add descriptions or comments to each transfer.
     - Transaction details are 100% transparent and visible to all members, including values, descriptions, and involved parties.

---

### 4. **Revenue Declaration**
   - Members can declare revenues received on behalf of the collective or specific projects.
   - A fixed contribution percentage is automatically deducted and credited to the appropriate shared account.
   - No manual adjustment of contributions is allowed.

---

### 5. **Transaction History and Reporting**
   - A persistent, fully transparent log of all transactions accessible to all members.
   - Aggregate reports (e.g., balances by account, total transactions over a period) are available for insights into collective finances.
   - Transactions can be reversed or deleted only with administrator approval.

---

### 6. **Security**
   - Authentication with multi-factor verification for all users.
   - Role-based access control to ensure permissions are enforced.
   - Audit logs for tracking actions by administrators and users.

---

### 7. **AI-Powered Queries**
   - A built-in LLM answers user questions related to system data (e.g., “What is my current balance?”, “Which members owe the collective the most?”).

---

## Core Technologies

- **Authentication**: Multi-factor authentication with role-based access.
- **Frontend**: Responsive web app using modern frameworks (e.g., Tailwind CSS for UI design).
- **Backend**: RESTful API with support for real-time WebSocket notifications.
- **Database**: PostgreSQL for persistent, transparent, and secure data storage.
- **Reports**: Built-in aggregate reporting tools.

---

## Goals
The app prioritizes security, scalability, and usability, ensuring a seamless experience for members of small collectives (under 100 people) with low transaction volumes (fewer than 10 per day).

---

## Usage Scenarios

1. **Member Interaction**:
   - A member declares revenue of R$10,000 for a specific project.
   - The system automatically deducts 15% (R$1,500) and credits it to the shared account for that project.
   - The transaction and deduction are logged and visible to all members.

2. **Administrator Role**:
   - An admin creates a new shared account for a project with a unique contribution percentage (e.g., 20%).
   - They approve a reversal of an incorrect transaction after reviewing it.

3. **Transparency in Action**:
   - All members inspect the transaction logs to track the movement of funds, ensuring accountability within the collective.

---

## Development Considerations

### **Performance and Scalability**
   - Optimize the database for low-latency queries given the small scale of transactions.
   - Ensure the app adapts smoothly to mobile browsers and devices.

### **Security Measures**
   - Implement end-to-end encryption for sensitive data.
   - Require admin approval for high-impact actions like transaction reversals or deletions.

### **Extensibility**
   - Modular architecture to support future integrations (e.g., payment platforms like Pix or PayPal).

---

This document outlines the foundational features and architecture for the Distributed Bank for Collectives, ensuring alignment with the needs of collectives and their operational
