'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { Search } from '@/cuteui/components/searchbar';
import { cn } from '@/cuteui/lib/cn';
import dropdownIcon from '@public/dashboard/dropdown.svg';

interface SearchBarProps {
  list: string[];
  setSelectedItem: (item: string) => void;
  dropdownTitle: string;
  className?: string;
  isSearchEnabled?: boolean;
}

const SearchDropdown: React.FC<SearchBarProps> = ({
  list,
  setSelectedItem,
  dropdownTitle,
  isSearchEnabled = true,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [drop, setDrop] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDrop = () => {
    setDrop(!drop);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDrop(false);
    }
  };
  useEffect(() => {
    if (drop) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drop]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredList = searchTerm
    ? list.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
    : list;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className={cn(
          'h-10 w-[8.90rem] border border-primary-main rounded-md hover:cursor-pointer flex flex-row',
          props.className
        )}
        onClick={toggleDrop}
      >
        <div className={cn('text-primary-main my-auto ms-6 bodyMedium', props.className)}>
          {dropdownTitle}
        </div>
        <Image
          src={dropdownIcon}
          alt="dropdown"
          className="my-auto mx-3"
          width={16}
          height={16}
          priority
        />
      </div>
      {drop && (
        <div
          className={cn(
            'absolute top-11 right-0 z-10 bg-white rounded-[6px] py-3 px-4 shadow-[0_4px_64px_0_rgba(154,_164,_185,_0.25)]',
            props.className
          )}
        >
          {isSearchEnabled ? (
            <Search
              onChange={handleSearch}
              placeholderText={'search'}
              value={searchTerm}
              shape="circle"
            />
          ) : null}
          <div className="w-full max-h-44 overflow-y-auto mt-2 scrollbar flex flex-col">
            {filteredList.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  key={index}
                  onClick={() => {
                    setSelectedItem(item);
                    setDrop(false);
                  }}
                  className="flex items-center gap-2 px-4 py-1 cursor-pointer"
                >
                  {item}
                </div>
                {index < filteredList.length - 1 && (
                  <hr className="my-2 border-t border-background-disabled" />
                )}
                {index === filteredList.length - 1 && <hr className="border-none" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
