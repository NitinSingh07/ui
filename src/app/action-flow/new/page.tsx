'use client';

import BoltIcon from '@mui/icons-material/Bolt';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StorageIcon from '@mui/icons-material/Storage';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HubIcon from '@mui/icons-material/Hub';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewActionFlowPage = () => {
  const router = useRouter();
  const [showHandlerPanel, setShowHandlerPanel] = useState(false);
  const [handlerData, setHandlerData] = useState({
    name: '',
    description: '',
    tag: '',
    notificationType: '',
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Header */}
      <div className="h-16 bg-[#FFFFFF] flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E9F1FF] text-[#A855F7] flex items-center justify-center">
            <BoltIcon fontSize="small" />
          </div>
          <h1 className="text-lg font-medium text-text-primary">Untitled</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4  border border-[#389F7F] text-[#1D9D74] rounded-md flex items-center gap-2 hover:bg-[#F0F9F4] transition-colors">
            <SaveIcon fontSize="small" />
            Save
          </button>
          <button className="h-9 px-4 rounded-md bg-[#E5E7EB] text-[#9CA3AF] flex items-center gap-2 cursor-not-allowed">
            <SendIcon fontSize="small" />
            Publish
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pt-[8px] relative">
        {/* Left Handler Panel - Overlay */}
        {showHandlerPanel && (
          <div className="absolute left-[14px]  w-[380px] h-[680px] bg-[#FFFFFF] rounded-xl flex flex-col z-10 shadow-lg">
            <div className="pt-[24px] pb-[24px] pl-[12px] pr-[12px] flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-text-primary mb-6">
                Enter Handler details
              </h2>

              <div className="space-y-6 flex-1">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Select"
                    value={handlerData.name}
                    onChange={(e) => setHandlerData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="Select"
                    value={handlerData.description}
                    onChange={(e) =>
                      setHandlerData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tag Field */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Tag</label>
                  <select
                    value={handlerData.tag}
                    onChange={(e) => setHandlerData((prev) => ({ ...prev, tag: e.target.value }))}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="urgent">Urgent</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Notification Type Field */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Notification type
                  </label>
                  <select
                    value={handlerData.notificationType}
                    onChange={(e) =>
                      setHandlerData((prev) => ({ ...prev, notificationType: e.target.value }))
                    }
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="push">Push Notification</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
              </div>

              {/* Save Button - Fixed at bottom right */}
              <div className="mt-auto flex  justify-end">
                <button
                  className="w-[81px] h-[40px] bg-[#1D9D74]  text-white rounded-md font-medium hover:bg-[#1a8a66] transition-colors"
                  onClick={() => {
                    console.log('Handler data saved:', handlerData);
                    setShowHandlerPanel(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Backdrop/Overlay */}
        {showHandlerPanel && (
          <div
            className="absolute inset-0 bg-black bg-opacity-20 z-5"
            onClick={() => setShowHandlerPanel(false)}
          />
        )}

        {/* Canvas */}
        <div className="absolute inset-0 bg-zinc-100">
          {/* Left toolbar */}
          <div className="absolute left-[14px] top-[232px] w-[56px] h-[432px] bg-[#BBBBBB] rounded-lg flex flex-col items-center py-4 gap-3 shadow-sm">
            {/* 1. Database Icon - Digest */}
            <button className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors">
              <StorageIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 2. Hierarchical Structure - Binary/Multiple Conditions */}
            <button className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors">
              <AccountTreeIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 3. Network/Connections - Channel Router */}
            <button className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors">
              <HubIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 4. Clock with Plus - Schedule */}
            <button className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors">
              <ScheduleIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 5. Clock with Hourglass - Delay */}
            <button className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors">
              <HourglassEmptyIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 6. Document/Page - Template */}
            <button className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors">
              <DescriptionIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 7. Person with Plus - Recipients */}
            <button className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors">
              <PersonAddIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 8. Calendar - Schedule */}
            <button className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors">
              <CalendarTodayIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 9. Large Hierarchical Structure - Workflow Node */}
            <button className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors">
              <AccountTreeOutlinedIcon fontSize="small" className="text-text-secondary" />
            </button>
          </div>

          {/* Center start button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <button
                className="px-6 py-3 rounded-lg bg-[#2F2F2F] text-white text-sm font-medium shadow-lg hover:bg-[#404040] transition-colors flex items-center gap-2"
                onClick={() => setShowHandlerPanel(true)}
              >
                <BoltIcon fontSize="small" />
                Click to start
              </button>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-divider rounded-full px-4 py-2 flex items-center gap-4 shadow-sm">
            <button className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
              <UndoIcon fontSize="small" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
              <RedoIcon fontSize="small" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
              <RemoveIcon fontSize="small" />
            </button>
            <span className="text-sm text-text-secondary">100%</span>
            <button className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
              <AddIcon fontSize="small" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
              <HelpOutlineIcon fontSize="small" />
            </button>
          </div>

          {/* Right bottom button */}
          <div className="absolute right-[16px] bottom-[16px] w-[52px] h-[52px] bg-[#FAFAFA] border border-[#DEDEDE] rounded-lg flex items-center justify-center shadow-sm">
            <AutoAwesomeIcon fontSize="small" className="text-text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewActionFlowPage;