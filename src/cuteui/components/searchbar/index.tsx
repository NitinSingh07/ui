'use client';
import { Clear } from '@mui/icons-material';
import Image from 'next/image';
import React from 'react';

import Loader from '@/cuteui/components/loader';
import { cn } from '@/cuteui/lib/cn';
import SearchIcon from '@public/components/search.svg';

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string;
  value: string;
  shape?: 'circle' | 'square';
  onClose?: () => void;
  className?: string;
  isSelected?: boolean;
  hasDropdown?: boolean;
  isLoading?: boolean;
}

export const Search = ({
  onChange,
  placeholderText,
  value,
  shape = 'circle',
  onClose,
  isSelected,
  hasDropdown,
  isLoading,
  ...props
}: SearchBarProps) => {
  const clearSearch = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };
  return (
    <div
      style={{ ...props, borderRadius: shape === 'circle' ? '48px' : '6px' }}
      className={cn('relative w-auto flex items-center bg-text-hint', props.className)}
    >
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        {hasDropdown && isLoading ? (
          <div className="scale-75">
            <Loader />
          </div>
        ) : (
          <Image src={SearchIcon} alt="icon" className="mx-2 h-6 w-6" />
        )}
      </div>
      <input
        type="text"
        value={value}
        placeholder={placeholderText}
        style={{ ...props, borderRadius: shape === 'circle' ? '48px' : '6px' }}
        className={cn(
          'pl-12 h-11 w-full pr-3 py-2 bodyMedium bg-background-offsetWeak text-text-primary border-none focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary-main placeholder:text-text-secondary',
          (value || isSelected) && 'ring-1 ring-inset ring-primary-main',
          props.className
        )}
        onChange={onChange}
      />
      <div>
        {value && (
          <Clear
            className="absolute transform -translate-y-1/2 right-3 h-6 w-6 cursor-pointer text-text-secondary"
            onClick={onClose ? onClose : clearSearch}
          />
        )}
      </div>
    </div>
  );
};
