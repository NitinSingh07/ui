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
    <div className="absolute left-[14px] top-[8px] w-[480px] h-[681px] bg-white rounded-xl shadow-lg z-20 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center transition-colors"
            title="Go back"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
          <h2 className="text-black font-size-[16px] font-weight-600">Add condition details</h2>
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
          {/* Condition Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-black font-size-[14px] font-weight-400 mb-2">
              Condition name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter condition name"
                value={conditionName}
                onChange={(e) => setConditionName(e.target.value)}
                className="w-full h-10 px-3 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                ▼
              </div>
            </div>
          </div>

          <div className='flex flex-col border border-[#F0F0F0] rounded-md p-2'>
            {/* Data Property */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black font-size-[14px] font-weight-400 mb-2">
                Data property <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select data property"
                  value={dataProperty}
                  onChange={(e) => setDataProperty(e.target.value)}
                  className="w-full h-10 px-3 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Operator */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black font-size-[14px] font-weight-400 mb-2">
                Operator <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select operator"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="w-full h-10 px-3 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Value */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black font-size-[14px] font-weight-400 mb-2">
                Value <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Add Another Button */}
            <div className="mb-6">
              <button
                onClick={handleAddAnother}
                className="w-[132px] h-[32px] bg-white text-[#389F7F] border border-[#389F7F] rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                <AddIcon fontSize="small" />
                Add another
              </button>
            </div>
          </div>
        </div>

        {/* Save Button - Fixed at bottom */}
        <div className="flex justify-end mb-16">
          <button
            onClick={handleSave}
            disabled={!conditionName || !dataProperty || !operator || !value}
            className={`w-[81px] h-[40px] rounded-[6px] font-medium transition-colors flex items-center justify-center ${
              conditionName && dataProperty && operator && value
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

export default ConditionPanel;
