import { Typography, InputLabel } from '@mui/material';
import React from 'react';

import { cn } from '@/cuteui/lib/cn';

interface CustomTextFieldProps {
  id?: string;
  labelName: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  width?: string;
  height?: string;
  className?: string;
  labelClassName?: string;
  type?: string;
  disabled?: boolean;
  name?: string;
}

export const TextField: React.FC<CustomTextFieldProps> = ({
  id,
  labelName,
  placeholder = '',
  value,
  onChange,
  onKeyDown = () => {},
  error = false,
  errorMessage = '',
  required = false,
  className = '',
  labelClassName = '',
  type = 'text',
  disabled = false,
  name,
  ...props
}) => {
  return (
    <div className="w-full">
      <InputLabel htmlFor={id} className="mb-3 self-start">
        <Typography className={cn('text-text-primary bodyRegular', labelClassName)}>
          {labelName}
          {required && <span className="text-red-500"> *</span>}
        </Typography>
      </InputLabel>
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{ ...props }}
        disabled={disabled}
        className={cn(
          `border-0 bodyMedium rounded-md bg-text-hint p-2 w-full text-text-primary ring-1 ring-inset ring-text-secondary placeholder:text-text-secondary focus:ring-1 focus:ring-inset ${
            error ? 'focus:ring-red-500' : 'focus:ring-primary-main'
          } ${disabled ? 'opacity-50 cursor-not-allowed bg-background-disabled' : ''}`,
          className
        )}
      />
      {error && errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
