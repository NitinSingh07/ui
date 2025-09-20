'use client';

import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

interface RecipientsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: RecipientsData) => void;
  onDataChange?: (data: RecipientsData) => void;
}

interface RecipientsData {
  customerPool: string;
  recipientType: 'cohorts' | 'targetAudience' | 'payloadBased';
  searchQuery: string;
  selectedAudience: string;
}

const RecipientsPanel: React.FC<RecipientsPanelProps> = ({
  isOpen,
  onClose,
  onSave,
  onDataChange,
}) => {
  const [customerPool, setCustomerPool] = useState('');
  const [recipientType, setRecipientType] = useState<'cohorts' | 'targetAudience' | 'payloadBased'>(
    'cohorts'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');

  // Update data whenever form values change
  useEffect(() => {
    updateData();
  }, [customerPool, recipientType, searchQuery, selectedAudience]);

  const updateData = () => {
    const data: RecipientsData = {
      customerPool,
      recipientType,
      searchQuery,
      selectedAudience,
    };
    if (onDataChange) {
      onDataChange(data);
    }
  };

  const handleSave = () => {
    const data: RecipientsData = {
      customerPool,
      recipientType,
      searchQuery,
      selectedAudience,
    };
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute left-[14px] top-[8px] w-[480px] h-[680px] bg-white rounded-xl shadow-lg z-20 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3 ">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center  transition-colors"
            title="Go back"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
          <h2 className="text-black font-size-[16px] font-weight-600">Choose recipient type</h2>
        </div>
        <button
          className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          title="Information"
        >
          <InfoOutlinedIcon fontSize="small" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Scrollable Content */}
        <div className="flex-1">
          {/* Customer Pool */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-black font-size-[14px] font-weight-400 mb-2">
              Customer pool <span className="text-red-500">*</span>
            </label>
            <select
              value={customerPool}
              onChange={(e) => setCustomerPool(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              aria-label="Select customer pool"
            >
              <option value="">Select</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
          </div>

          {/* Search Input - Only show after customer pool selection */}
          {customerPool && (
            <div className="mb-4">
              <div className="relative">
                <SearchIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                  fontSize="small"
                />
                <input
                  type="text"
                  placeholder="Search target audience"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedAudience(e.target.value); // Update selected audience as user types
                  }}
                  className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
          {/* Radio Buttons */}
          <div className="mb-6">
            <div className="flex gap-6">
              <label
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setRecipientType('cohorts')}
              >
                {recipientType === 'cohorts' ? (
                  <RadioButtonCheckedIcon className="text-green-500" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon className="text-gray-400" fontSize="small" />
                )}
                <span className="text-sm text-black">Cohorts</span>
              </label>
              <label
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setRecipientType('targetAudience')}
              >
                {recipientType === 'targetAudience' ? (
                  <RadioButtonCheckedIcon className="text-green-500" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon className="text-gray-400" fontSize="small" />
                )}
                <span className="text-sm text-black">Target Audience</span>
              </label>
              <label
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setRecipientType('payloadBased')}
              >
                {recipientType === 'payloadBased' ? (
                  <RadioButtonCheckedIcon className="text-green-500" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon className="text-gray-400" fontSize="small" />
                )}
                <span className="text-sm text-black">Payload based</span>
              </label>
            </div>
          </div>

          {/* Selected Audience */}
          {selectedAudience && customerPool && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-green-600">
                <InfoOutlinedIcon fontSize="small" />
                <span className="text-sm">Selected target audience: {selectedAudience}</span>
              </div>
            </div>
          )}

          {/* No recipient selected message */}
          {!customerPool && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-gray-500">
                <InfoOutlinedIcon fontSize="small" />
                <span className="text-sm">No recipient selected</span>
              </div>
            </div>
          )}
        </div>

        {/* Save Button - Fixed at bottom right */}
        <div className="flex justify-end mb-16 ">
          <button
            onClick={handleSave}
            disabled={!customerPool || !recipientType}
            className={`w-[81px] h-[40px] rounded-[6px] font-medium transition-colors flex items-center justify-center ${
              customerPool && recipientType
                ? 'bg-[#389F7F] text-white hover:bg-[#2d7a5f]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipientsPanel;
