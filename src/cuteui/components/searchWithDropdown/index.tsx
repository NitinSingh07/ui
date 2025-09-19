'use client';
import { Clear } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

import Loader from '@/cuteui/components/loader';
import { cn } from '@/cuteui/lib/cn';
import SearchIcon from '@public/components/search.svg';

interface FilterOption {
  value: string;
  label: string;
}

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
  filterOptions?: FilterOption[];
  onFilterChange?: (filters: string[]) => void;
  defaultFilter?: string[];
  multiSelect?: boolean;
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
  filterOptions = [],
  onFilterChange,
  defaultFilter = ['viewAll'],
  multiSelect = false,
  ...props
}: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<FilterOption[]>(() => {
    if (multiSelect) {
      return filterOptions.filter((option) => defaultFilter.includes(option.value));
    } else {
      const singleFilter = Array.isArray(defaultFilter) ? defaultFilter[0] : defaultFilter;
      return [
        filterOptions.find((option) => option.value === singleFilter) ||
          filterOptions[0] || { value: 'viewAll', label: 'view all' },
      ];
    }
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const clearSearch = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleSelect = (option: FilterOption) => {
    if (multiSelect) {
      let newSelectedOptions: FilterOption[];

      if (option.value === 'viewAll') {
        // If "view all" is selected, clear all other selections
        newSelectedOptions = [option];
      } else {
        const isAlreadySelected = selectedOptions.some(
          (selected) => selected.value === option.value
        );

        if (isAlreadySelected) {
          // Remove the option if already selected
          newSelectedOptions = selectedOptions.filter(
            (selected) => selected.value !== option.value
          );
          // If no options left, select "view all"
          if (newSelectedOptions.length === 0) {
            const viewAllOption = filterOptions.find((opt) => opt.value === 'viewAll');
            newSelectedOptions = viewAllOption ? [viewAllOption] : [];
          }
        } else {
          // Add the option and remove "view all" if it was selected
          newSelectedOptions = [
            ...selectedOptions.filter((selected) => selected.value !== 'viewAll'),
            option,
          ];
        }
      }

      setSelectedOptions(newSelectedOptions);

      if (onFilterChange) {
        onFilterChange(newSelectedOptions.map((opt) => opt.value));
      }
    } else {
      // Single select behavior (original)
      setSelectedOptions([option]);
      setIsOpen(false);
      if (onFilterChange) {
        onFilterChange([option.value]);
      }
    }
  };

  const getDisplayText = () => {
    if (selectedOptions.length === 0) return 'view all';
    if (selectedOptions.length === 1) return selectedOptions[0].label;
    if (selectedOptions.some((opt) => opt.value === 'viewAll')) return 'view all';
    return `${selectedOptions.length} selected`;
  };

  const isOptionSelected = (option: FilterOption) => {
    return selectedOptions.some((selected) => selected.value === option.value);
  };

  return (
    <div
      style={{ ...props, borderRadius: shape === 'circle' ? '48px' : '6px' }}
      className={cn(
        'relative w-auto flex items-center bg-text-hint overflow-visible z-50',
        props.className,
        'w-[360px]'
      )}
    >
      {/* Search Icon / Loader */}
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        {hasDropdown && isLoading ? (
          <div className="scale-75">
            <Loader />
          </div>
        ) : (
          <Image src={SearchIcon} alt="icon" className="mx-2 h-6 w-6" />
        )}
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        placeholder={placeholderText}
        style={{ ...props, borderRadius: shape === 'circle' ? '48px' : '6px' }}
        className={cn(
          'pl-12 h-11 w-full pr-28 py-2 bodyMedium bg-background-offsetWeak text-text-primary border-none focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary-main placeholder:text-text-secondary',
          (value || isSelected) && 'ring-1 ring-inset ring-primary-main',
          props.className
        )}
        onChange={onChange}
      />

      {/* Clear Button */}
      {value && (
        <Clear
          className="absolute transform -translate-y-1/2 right-32 h-6 w-6 cursor-pointer text-text-secondary top-1/2"
          onClick={onClose ? onClose : clearSearch}
        />
      )}

      {/* Dropdown */}
      {hasDropdown && filterOptions.length > 0 && (
        <div ref={dropdownRef} className="absolute right-2 top-1/2 -translate-y-1/2 z-50">
          <div
            className="flex items-center space-x-1 cursor-pointer px-2 py-1 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-sm text-text-secondary">{getDisplayText()}</span>
            <ArrowDropDownIcon className="text-text-secondary" />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-[9999]">
              {filterOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    'px-3 py-2 cursor-pointer text-sm flex items-center justify-between',
                    isOptionSelected(option) &&
                      option.value !== 'viewAll' &&
                      'text-primary-main font-medium',
                    option.value === 'viewAll' && 'text-text-secondary'
                  )}
                >
                  <span>{option.label}</span>
                  {multiSelect && isOptionSelected(option) && (
                    <span className="text-primary-main text-xs">✓</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
