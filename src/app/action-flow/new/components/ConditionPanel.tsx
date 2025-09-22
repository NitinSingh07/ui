'use client';

import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';

interface ConditionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ConditionData) => void;
  onDataChange?: (data: ConditionData) => void;
}

interface ConditionData {
  conditionName: string;
  dataProperty: string;
  operator: string;
  value: string;
}

const ConditionPanel: React.FC<ConditionPanelProps> = ({
  isOpen,
  onClose,
  onSave,
  onDataChange,
}) => {
  const [conditionName, setConditionName] = useState('Instagram');
  const [dataProperty, setDataProperty] = useState('Usertype');
  const [operator, setOperator] = useState('Is equal to');
  const [value, setValue] = useState('Influencer');

  // Update data whenever form values change
  useEffect(() => {
    updateData();
  }, [conditionName, dataProperty, operator, value]);

  const updateData = () => {
    const data: ConditionData = {
      conditionName,
      dataProperty,
      operator,
      value,
    };
    if (onDataChange) {
      onDataChange(data);
    }
  };

  const handleSave = () => {
    const data: ConditionData = {
      conditionName,
      dataProperty,
      operator,
      value,
    };
    onSave(data);
    onClose();
  };

  const handleAddAnother = () => {
    // Reset form for adding another condition
    setConditionName('');
    setDataProperty('');
    setOperator('');
    setValue('');
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
            Add condition details
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
          {/* Condition Name */}
          <div>
            <label className="block text-[14px] font-medium text-[#1F1F1F] mb-[8px] leading-[20px]">
              Condition name <span className="text-[#EF4444]">*</span>
            </label>
            <select
              value={conditionName}
              onChange={(e) => setConditionName(e.target.value)}
              className="w-full h-[40px] px-[12px] border border-[#D1D5DB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white text-[14px] text-[#1F1F1F] appearance-none cursor-pointer"
              aria-label="Select condition name"
            >
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

          {/* Data Property */}
          <div>
            <label className="block text-[14px] font-medium text-[#1F1F1F] mb-[8px] leading-[20px]">
              Data property <span className="text-[#EF4444]">*</span>
            </label>
            <select
              value={dataProperty}
              onChange={(e) => setDataProperty(e.target.value)}
              className="w-full h-[40px] px-[12px] border border-[#D1D5DB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white text-[14px] text-[#1F1F1F] appearance-none cursor-pointer"
              aria-label="Select data property"
            >
              <option value="Usertype" className="text-[#1F1F1F]">
                Usertype
              </option>
              <option value="Age" className="text-[#1F1F1F]">
                Age
              </option>
              <option value="Location" className="text-[#1F1F1F]">
                Location
              </option>
              <option value="Activity" className="text-[#1F1F1F]">
                Activity
              </option>
            </select>
          </div>

          {/* Operator */}
          <div>
            <label className="block text-[14px] font-medium text-[#1F1F1F] mb-[8px] leading-[20px]">
              Operator <span className="text-[#EF4444]">*</span>
            </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full h-[40px] px-[12px] border border-[#D1D5DB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white text-[14px] text-[#1F1F1F] appearance-none cursor-pointer"
              aria-label="Select operator"
            >
              <option value="Is equal to" className="text-[#1F1F1F]">
                Is equal to
              </option>
              <option value="Is not equal to" className="text-[#1F1F1F]">
                Is not equal to
              </option>
              <option value="Contains" className="text-[#1F1F1F]">
                Contains
              </option>
              <option value="Does not contain" className="text-[#1F1F1F]">
                Does not contain
              </option>
            </select>
          </div>

          {/* Value */}
          <div>
            <label className="block text-[14px] font-medium text-[#1F1F1F] mb-[8px] leading-[20px]">
              Value <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-[40px] px-[12px] border border-[#D1D5DB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[14px] text-[#1F1F1F] placeholder:text-[#9CA3AF] bg-white"
            />
          </div>

          {/* Add Another Button */}
          <div>
            <button
              onClick={handleAddAnother}
              className="w-[132px] h-[32px] bg-white text-[#1D9D74] border border-[#1D9D74] rounded-[8px] font-medium text-[14px] transition-colors flex items-center justify-center gap-[8px] hover:bg-[#F0F9F4]"
            >
              <AddIcon fontSize="small" />
              Add another
            </button>
          </div>
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className="px-[24px] py-[24px] bg-white">
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={!conditionName || !dataProperty || !operator || !value}
            className={`w-[81px] h-[40px] rounded-[8px] font-medium text-[14px] transition-colors flex items-center justify-center ${
              conditionName && dataProperty && operator && value
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

export default ConditionPanel;
