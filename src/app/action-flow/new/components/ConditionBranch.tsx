'use client';

import React from 'react';
import AddIcon from '@mui/icons-material/Add';

interface ConditionBranchProps {
  onTrueClick?: () => void;
  onFalseClick?: () => void;
  showButtons?: boolean;
}

const ConditionBranchInner: React.FC<ConditionBranchProps> = ({
  onTrueClick,
  onFalseClick,
  showButtons = true,
}) => {
  return (
    <div className="flex flex-col items-center mt-4">
      {/* Simple connecting line down */}
      <div className="w-[2px] h-[20px] bg-gray-300"></div>

      {/* Branch split with SVG curves */}
      <div className="flex items-center justify-center gap-32 relative">
        {/* SVG for curvy arrows */}
        <svg
          width="280"
          height="100"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* Left curve (False) */}
          <path d="M 140 0 Q 100 30 60 60" stroke="#9CA3AF" strokeWidth="2" fill="none" />
          {/* Right curve (True) */}
          <path d="M 140 0 Q 180 30 220 60" stroke="#9CA3AF" strokeWidth="2" fill="none" />
          {/* False label */}
          <text x="10" y="25" fontSize="12" fill="#6B7280" textAnchor="middle">
            False
          </text>
          {/* True label */}
          <text x="200" y="25" fontSize="12" fill="#6B7280" textAnchor="middle">
            True
          </text>
        </svg>

        {/* Left side - False */}
        <div className="flex flex-col items-center" style={{ zIndex: 1 }}>
          {/* Add button - only show if showButtons is true */}
          {showButtons && (
            <div
              className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer mt-12"
              onClick={onFalseClick}
            >
              <AddIcon fontSize="small" className="text-black" />
            </div>
          )}
        </div>

        {/* Right side - True */}
        <div className="flex flex-col items-center" style={{ zIndex: 1 }}>
          {/* Add button - only show if showButtons is true */}
          {showButtons && (
            <div
              className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer mt-12"
              onClick={onTrueClick}
            >
              <AddIcon fontSize="small" className="text-black" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConditionBranch: React.FC<ConditionBranchProps> = (props) => {
  return <ConditionBranchInner {...props} />;
};

export default ConditionBranch;
