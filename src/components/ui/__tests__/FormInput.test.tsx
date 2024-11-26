import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from '../FormInput';

describe('FormInput', () => {
    it('renders with label and input', () => {
        render(
            <FormInput
                label="Email"
                id="email"
                type="email"
                placeholder="Enter your email"
            />
        );

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });

    it('shows error message when provided', () => {
        const error = { type: 'required', message: 'This field is required' };
        
        render(
            <FormInput
                label="Username"
                id="username"
                error={error}
            />
        );

        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('handles disabled state correctly', () => {
        render(
            <FormInput
                label="Password"
                id="password"
                type="password"
                disabled={true}
            />
        );

        expect(screen.getByLabelText('Password')).toBeDisabled();
    });

    it('applies custom className', () => {
        render(
            <FormInput
                label="Name"
                id="name"
                className="custom-class"
            />
        );

        const input = screen.getByLabelText('Name');
        expect(input.className).toContain('custom-class');
    });

    it('handles user input correctly', async () => {
        const user = userEvent.setup();
        render(
            <FormInput
                label="Search"
                id="search"
                type="search"
            />
        );

        const input = screen.getByLabelText('Search');
        await user.type(input, 'test input');
        expect(input).toHaveValue('test input');
    });
});
