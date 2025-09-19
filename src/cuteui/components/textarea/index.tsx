import { InputLabel, Typography } from '@mui/material';
import React from 'react';

import { cn } from '@/cuteui/lib/cn';

interface TextAreaProps {
  labelName: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  width?: string;
  height?: string;
  className?: string;
  labelClassName?: string;
  name?: string;
}

export const TextArea = ({
  labelName,
  placeholder = '',
  value,
  onChange,
  onKeyDown = () => {},
  error = false,
  errorMessage = '',
  required = false,
  className = '',
  name = '',
  labelClassName = '',
  height = '120px',
  ...props
}: TextAreaProps) => {
  return (
    <div>
      <InputLabel htmlFor={labelName} className="mb-3 self-start">
        <Typography className={cn('text-text-primary bodyRegular', labelClassName)}>
          {labelName}
          {required && <span className="text-red-500"> *</span>}
        </Typography>
      </InputLabel>
      <textarea
        id={labelName}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{ ...props, height }}
        className={cn(
          `resize-none w-full rounded-md bodyMedium border-0 ring-1 ring-inset ring-text-secondary p-2 focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-primary-main'} focus:ring-inset placeholder:text-text-secondary text-text-primary`,
          className
        )}
      ></textarea>
      {error && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
