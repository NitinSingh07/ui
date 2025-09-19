'use client';

import React from 'react';
import BoltIcon from '@mui/icons-material/Bolt';
import EmailIcon from '@mui/icons-material/Email';
import StorageIcon from '@mui/icons-material/Storage';

interface WorkflowNodeProps {
  id: string;
  name: string;
  description: string;
  type: 'handler' | 'recipients';
  position: { x: number; y: number };
  recipientsData?: {
    customerPool: string;
    recipientType: string;
    selectedAudience: string;
  };
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  id,
  name,
  description,
  type,
  position,
  recipientsData,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'handler':
        return <BoltIcon fontSize="small" />;
      case 'recipients':
        return <EmailIcon fontSize="small" />;
      default:
        return <StorageIcon fontSize="small" />;
    }
  };

  const getDescription = () => {
    if (type === 'recipients' && recipientsData) {
      return `You are using ${recipientsData.selectedAudience} cohort from ${recipientsData.customerPool} pool.`;
    }
    return description;
  };

  const getBorderColor = () => {
    return type === 'recipients' ? 'border-l-green-500' : 'border-l-[#BBBBBB]';
  };

  const borderColor = type === 'recipients' ? '#10B981' : '#BBBBBB';

  return (
    <div
      className="bg-white rounded border-l-2 h-[72px] w-[200px] p-[10px] flex items-center gap-[4px] shadow-lg"
      style={{
        borderLeftColor: borderColor,
      }}
    >
      <div className="w-5 h-5 rounded bg-[#E9F1FF] text-[#A855F7] flex items-center justify-center flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex flex-col text-left flex-1">
        <h3 className="text-sm font-medium text-black  truncate leading-5">{name}</h3>
        <p className="text-xs text-black font-normal">{getDescription()}</p>
      </div>
    </div>
  );
};

export default WorkflowNode;
