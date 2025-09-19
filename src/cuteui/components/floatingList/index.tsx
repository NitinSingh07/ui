'use client';
import React, { useState } from 'react';

import { Search } from '../searchbar';

export interface IFloatingListProps {
  searchResults?: string[]; // Accepts an array of search results
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input changes
  placeholderText?: string; // Optional placeholder text
  resultLabel?: React.ReactNode; // Optional label component to display with results
}

const SwiftFloatingList = ({
  searchResults,
  onChange,
  placeholderText = 'Search',
  resultLabel,
}: IFloatingListProps) => {
  const [value, setValue] = useState(''); // Local state for input value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value); // Update local state
    onChange(e); // Call the passed onChange function
  };

  return (
    <div className="rounded-lg w-48 bg-text-hint shadow-[0px_4px_64px_0px_#6F7D9A1C]">
      <div className="p-4">
        <Search
          onChange={handleChange}
          placeholderText={placeholderText} // Use the passed placeholder text
          shape="circle"
          value={value} // Use the passed value
          className="bg-background-offsetWeak border-background-disabled"
        />
      </div>
      <div>
        {searchResults?.map((result, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center gap-2 px-4 py-1">
              {resultLabel}
              <span>{result}</span>
            </div>
            {index < searchResults.length - 1 && (
              <hr className="my-2 border-t border-background-disabled" />
            )}
            {index === searchResults.length - 1 && <hr className="my-2 border-none" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SwiftFloatingList;
