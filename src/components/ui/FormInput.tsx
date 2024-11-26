'use client';

import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, disabled, className = '', ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
            disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          disabled={disabled}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error.message}</p>
        )}
      </div>
    );
  }
);

export default FormInput;
