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
    <div className="fixed left-[14px] top-[85px] w-[480px] h-[681px] bg-white rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] z-20 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-[24px] px-[24px] pb-[24px]">
        <div className="flex items-center gap-[12px]">
          <button
            onClick={onClose}
            className="w-[24px] h-[24px] flex items-center justify-center text-[#1F1F1F] hover:text-[#3B82F6] transition-colors"
            title="Go back"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
          <h2 className="text-[16px] font-semibold text-[#1F1F1F] leading-[24px]">
            Choose recipient type
          </h2>
        </div>
        <button
          className="w-[20px] h-[20px] flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
          title="Information"
        >
          <InfoOutlinedIcon fontSize="small" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-[24px]">
        <div className="space-y-[24px] pb-[24px]">
          {/* Customer Pool */}
          <div>
            <label className="block text-[14px] font-medium text-[#1F1F1F] mb-[8px] leading-[20px]">
              Customer pool <span className="text-[#EF4444]">*</span>
            </label>
            <select
              value={customerPool}
              onChange={(e) => setCustomerPool(e.target.value)}
              className="w-full h-[40px] px-[12px] border border-[#D1D5DB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white text-[14px] text-[#1F1F1F] appearance-none cursor-pointer"
              aria-label="Select customer pool"
            >
              <option value="" className="text-[#9CA3AF]">
                Select
              </option>
              <option value="Instagram" className="text-[#1F1F1F]">
                Instagram
              </option>
              <option value="Facebook" className="text-[#1F1F1F]">
                Facebook
              </option>
              <option value="Twitter" className="text-[#1F1F1F]">
                Twitter
              </option>
              <option value="LinkedIn" className="text-[#1F1F1F]">
                LinkedIn
              </option>
            </select>
          </div>

          {/* Search Input - Only show after customer pool selection */}
          {customerPool && (
            <div>
              <div className="relative">
                <SearchIcon
                  className="absolute left-[12px] top-1/2 transform -translate-y-1/2 text-[#9CA3AF]"
                  fontSize="small"
                />
                <input
                  type="text"
                  placeholder="Search target audience"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedAudience(e.target.value);
                  }}
                  className="w-full h-[40px] pl-[40px] pr-[12px] border border-[#D1D5DB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[14px] text-[#1F1F1F] placeholder:text-[#9CA3AF] bg-white"
                />
              </div>
            </div>
          )}

          {/* No recipient selected message */}
          {!customerPool && (
            <div>
              <div className="flex items-center gap-[8px] text-[#9CA3AF]">
                <InfoOutlinedIcon fontSize="small" />
                <span className="text-[14px] leading-[20px]">No recipient selected</span>
              </div>
            </div>
          )}

          {/* Radio Buttons */}
          <div>
            <div className="flex gap-[24px]">
              <label
                className="flex items-center gap-[8px] cursor-pointer"
                onClick={() => setRecipientType('cohorts')}
              >
                {recipientType === 'cohorts' ? (
                  <RadioButtonCheckedIcon className="text-[#1D9D74]" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon className="text-[#9CA3AF]" fontSize="small" />
                )}
                <span className="text-[14px] text-[#1F1F1F] leading-[20px]">Cohorts</span>
              </label>
              <label
                className="flex items-center gap-[8px] cursor-pointer"
                onClick={() => setRecipientType('targetAudience')}
              >
                {recipientType === 'targetAudience' ? (
                  <RadioButtonCheckedIcon className="text-[#1D9D74]" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon className="text-[#9CA3AF]" fontSize="small" />
                )}
                <span className="text-[14px] text-[#1F1F1F] leading-[20px]">Target Audience</span>
              </label>
              <label
                className="flex items-center gap-[8px] cursor-pointer"
                onClick={() => setRecipientType('payloadBased')}
              >
                {recipientType === 'payloadBased' ? (
                  <RadioButtonCheckedIcon className="text-[#1D9D74]" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon className="text-[#9CA3AF]" fontSize="small" />
                )}
                <span className="text-[14px] text-[#1F1F1F] leading-[20px]">Payload based</span>
              </label>
            </div>
          </div>

          {/* Selected Audience */}
          {selectedAudience && customerPool && (
            <div>
              <div className="flex items-center gap-[8px] text-[#1D9D74]">
                <InfoOutlinedIcon fontSize="small" />
                <span className="text-[14px] leading-[20px]">
                  Selected target audience: {selectedAudience}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className="px-[24px] py-[24px] bg-white">
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={!customerPool || !recipientType}
            className={`w-[81px] h-[40px] rounded-[8px] font-medium text-[14px] transition-colors flex items-center justify-center ${
              customerPool && recipientType
                ? 'bg-[#1D9D74] text-white hover:bg-[#1a8a66] shadow-sm'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
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
