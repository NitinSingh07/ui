'use client';

import BoltIcon from '@mui/icons-material/Bolt';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'next/navigation';
import React from 'react';

const EditActionFlowPage = () => {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="min-h-screen bg-background-default flex flex-col">
      {/* Header */}
      <div className="h-16 bg-white border-b border-divider flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary-main/10 text-primary-main flex items-center justify-center">
            <BoltIcon fontSize="small" />
          </div>
          <h1 className="text-lg font-medium text-text-primary">{`Editing flow #${id}`}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 border border-[#D1E7DD] text-[#1D9D74] rounded-md flex items-center gap-2">
            <SaveIcon fontSize="small" />
            Save
          </button>
          <button className="h-9 px-4 rounded-md bg-[#E5E7EB] text-[#9CA3AF] flex items-center gap-2 cursor-not-allowed">
            <SendIcon fontSize="small" />
            Publish
          </button>
        </div>
      </div>

      {/* Canvas (same as new) */}
      <div className="flex-1 relative">
        <div className="absolute left-3 top-24 w-10 bg-white border border-divider rounded-xl flex flex-col items-center py-3 gap-4 shadow-sm">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className="w-6 h-6 bg-background-offsetWeak rounded-md" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="px-5 py-2 rounded-lg bg-[#2F2F2F] text-white text-sm shadow">
            ⚡ Click to start
          </button>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-divider rounded-full px-3 py-2 flex items-center gap-4 shadow-sm">
          <span className="text-xl leading-none">+</span>
          <span className="text-xl leading-none">−</span>
          <span className="text-xl leading-none">↺</span>
          <span className="text-xl leading-none">⟳</span>
          <span className="text-xl leading-none">?</span>
        </div>
        <div className="absolute right-6 bottom-10 w-10 h-10 rounded-lg bg-white border border-divider flex items-center justify-center shadow-sm">
          ✨
        </div>
      </div>
    </div>
  );
};

export default EditActionFlowPage;
