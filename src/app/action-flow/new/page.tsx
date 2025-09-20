'use client';

import BoltIcon from '@mui/icons-material/Bolt';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
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
import RecipientsPanel from './components/RecipientsPanel';
import ConditionPanel from './components/ConditionPanel';
import WorkflowNode from './components/WorkflowNode';

const NewActionFlowPage = () => {
  const router = useRouter();
  const [showHandlerPanel, setShowHandlerPanel] = useState(false);
  const [handlerData, setHandlerData] = useState({
    name: '',
    description: '',
    tag: '',
    notificationType: '',
  });
  const [workflowNode, setWorkflowNode] = useState<any>(null);
  const [recipientsNode, setRecipientsNode] = useState<any>(null);
  const [conditionNode, setConditionNode] = useState<any>(null);
  const [showRecipientsPanel, setShowRecipientsPanel] = useState(false);
  const [showConditionPanel, setShowConditionPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveHandler = async () => {
    if (!handlerData.name.trim()) {
      alert('Please enter a name for the handler');
      return;
    }

    setIsLoading(true);

    try {
      // Get existing workflows from localStorage
      const existingWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');

      // Create new workflow
      const newWorkflow = {
        id: Date.now(), // Use timestamp as unique ID
        name: handlerData.name,
        description: handlerData.description,
        tag: handlerData.tag,
        notificationType: handlerData.notificationType,
        type: 'handler',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to existing workflows
      const updatedWorkflows = [...existingWorkflows, newWorkflow];

      // Save to localStorage
      localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));

      // Create workflow node for display
      setWorkflowNode({
        id: newWorkflow.id,
        name: handlerData.name,
        description: handlerData.description,
        type: 'handler',
        position: { x: 400, y: 200 }, // Center position
      });

      // Close the panel
      setShowHandlerPanel(false);

      // Reset form data
      setHandlerData({
        name: '',
        description: '',
        tag: '',
        notificationType: '',
      });

      // Update the page title
      document.title = handlerData.name || 'Untitled';

      // Trigger refresh of the listing page
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error saving workflow:', error);
      alert('Failed to save workflow. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecipients = (data: any) => {
    // Create recipients node
    setRecipientsNode({
      id: Date.now() + 1,
      name: 'Recipients',
      description: `You are using ${data.selectedAudience} cohort from ${data.customerPool} pool.`,
      type: 'recipients',
      position: { x: 0, y: 0 }, // Position will be handled by flexbox
      recipientsData: data,
    });
  };

  const handleRecipientsDataChange = (data: any) => {
    // Update recipients node in real-time
    if (recipientsNode) {
      setRecipientsNode({
        ...recipientsNode,
        description: `You are using ${data.selectedAudience} cohort from ${data.customerPool} pool.`,
        recipientsData: data,
      });
    }
  };

  const handleSaveCondition = (data: any) => {
    // Create condition node
    setConditionNode({
      id: Date.now() + 2,
      name: 'Condition',
      description: `if ${data.dataProperty}== ${data.value}`,
      type: 'condition',
      position: { x: 0, y: 0 },
      conditionData: data,
    });
  };

  const handleConditionDataChange = (data: any) => {
    // Update condition node in real-time
    if (conditionNode) {
      setConditionNode({
        ...conditionNode,
        description: `if ${data.dataProperty}== ${data.value}`,
        conditionData: data,
      });
    }
  };

  const handleStorageIconClick = () => {
    if (workflowNode) {
      // Create initial recipients node when panel opens
      if (!recipientsNode) {
        setRecipientsNode({
          id: Date.now() + 1,
          name: 'Recipients',
          description: 'You are using Active users cohort from Instagram pool.',
          type: 'recipients',
          position: { x: 0, y: 0 },
          recipientsData: {
            customerPool: 'Instagram',
            recipientType: 'cohorts',
            searchQuery: 'Active users',
            selectedAudience: 'Active users',
          },
        });
      }
      setShowRecipientsPanel(true);
    } else {
      alert('Please create a handler first by clicking "Click to start"');
    }
  };

  const handleConditionIconClick = () => {
    if (workflowNode) {
      // Create initial condition node when panel opens
      if (!conditionNode) {
        setConditionNode({
          id: Date.now() + 2,
          name: 'Condition',
          description: 'if Usertype== influencer',
          type: 'condition',
          position: { x: 0, y: 0 },
          conditionData: {
            conditionName: 'Instagram',
            dataProperty: 'Usertype',
            operator: 'Is equal to',
            value: 'Influencer',
          },
        });
      }
      setShowConditionPanel(true);
    } else {
      alert('Please create a handler first by clicking "Click to start"');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Header */}
      <div className="h-16 bg-[#FFFFFF] flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E9F1FF] text-[#A855F7] flex items-center justify-center">
            <BoltIcon fontSize="small" />
          </div>
          <h1 className="text-lg font-medium text-text-primary">
            {workflowNode ? workflowNode.name : 'Untitled'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            className={`h-9 px-4 border rounded-md flex items-center gap-2 transition-all duration-300 ${
              recipientsNode
                ? 'border-[#389F7F] text-[#1D9D74] bg-white hover:bg-[#F0F9F4]'
                : 'border-[#389F7F] text-[#1D9D74] hover:bg-[#F0F9F4]'
            }`}
          >
            <SaveIcon fontSize="small" />
            {recipientsNode ? 'Edit' : 'Save'}
          </button>
          <button
            className={`h-9 px-4 rounded-md flex items-center gap-2 transition-all duration-300 ${
              recipientsNode
                ? 'bg-[#1D9D74] text-white hover:bg-[#1a8a66] cursor-pointer transform hover:scale-105'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
            }`}
            disabled={!recipientsNode}
          >
            <SendIcon
              fontSize="small"
              className={`transition-transform duration-300 ${
                recipientsNode ? 'transform -rotate-12' : ''
              }`}
            />
            Publish
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pt-[8px] relative">
        {/* Recipients Panel - Overlay */}
        <RecipientsPanel
          isOpen={showRecipientsPanel}
          onClose={() => setShowRecipientsPanel(false)}
          onSave={handleSaveRecipients}
          onDataChange={handleRecipientsDataChange}
        />

        {/* Condition Panel - Overlay */}
        <ConditionPanel
          isOpen={showConditionPanel}
          onClose={() => setShowConditionPanel(false)}
          onSave={handleSaveCondition}
          onDataChange={handleConditionDataChange}
        />

        {/* Left Handler Panel - Overlay */}
        {showHandlerPanel && (
          <div className="absolute left-[14px] top-[8px] w-[380px] h-[680px] bg-white rounded-xl shadow-lg flex flex-col z-20 overflow-hidden">
            <div className="pt-[24px] pb-[24px] pl-[12px] pr-[12px] flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-black mb-6">Enter Handler details</h2>

              <div className="space-y-6 flex-1">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter handler name"
                    value={handlerData.name}
                    onChange={(e) => setHandlerData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Description</label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={handlerData.description}
                    onChange={(e) =>
                      setHandlerData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tag Field */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Tag</label>
                  <select
                    value={handlerData.tag}
                    onChange={(e) => setHandlerData((prev) => ({ ...prev, tag: e.target.value }))}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    aria-label="Select tag"
                  >
                    <option value="">Select</option>
                    <option value="urgent">Urgent</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Notification Type Field */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Notification type
                  </label>
                  <select
                    value={handlerData.notificationType}
                    onChange={(e) =>
                      setHandlerData((prev) => ({ ...prev, notificationType: e.target.value }))
                    }
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    aria-label="Select notification type"
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
                  className="w-[81px] h-[40px] bg-[#1D9D74]  text-white rounded-md font-medium hover:bg-[#1a8a66] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSaveHandler}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Backdrop/Overlay - Only behind handler panel */}
        {showHandlerPanel && (
          <div
            className="absolute left-[14px] top-[8px] w-[380px] h-[680px] bg-black bg-opacity-20 z-[5] rounded-xl"
            onClick={() => setShowHandlerPanel(false)}
          />
        )}

        {/* Canvas */}
        <div className="absolute inset-0 bg-zinc-100">
          {/* Left toolbar */}
          <div className="absolute left-[14px] top-[232px] w-[56px] h-[432px] bg-[#BBBBBB] rounded-lg flex flex-col items-center py-4 gap-3 shadow-sm z-10">
            {/* 1. Database Icon - Recipients */}
            <button
              className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors"
              onClick={handleStorageIconClick}
              title="Add Recipients"
            >
              <StorageIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 2. Hierarchical Structure - Binary/Multiple Conditions */}
            <button
              className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors"
              title="Add Conditions"
              onClick={handleConditionIconClick}
            >
              <AccountTreeIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 3. Network/Connections - Channel Router */}
            <button
              className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors"
              title="Add Channel Router"
            >
              <HubIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 4. Clock with Plus - Schedule */}
            <button
              className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors"
              title="Add Schedule"
            >
              <ScheduleIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 5. Clock with Hourglass - Delay */}
            <button
              className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors"
              title="Add Delay"
            >
              <HourglassEmptyIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 6. Document/Page - Template */}
            <button
              className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors"
              title="Add Template"
            >
              <DescriptionIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 7. Person with Plus - Recipients */}
            <button
              className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors"
              title="Add Recipients"
            >
              <PersonAddIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 8. Calendar - Schedule */}
            <button
              className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors"
              title="Add Calendar"
            >
              <CalendarTodayIcon fontSize="small" className="text-text-secondary" />
            </button>

            {/* 9. Large Hierarchical Structure - Workflow Node */}
            <button
              className="w-8 h-8 bg-background-offsetWeak rounded-md flex items-center justify-center hover:bg-background-offsetWeak/80 transition-colors"
              title="Add Workflow Node"
            >
              <AccountTreeOutlinedIcon fontSize="small" className="text-text-secondary" />
            </button>
          </div>

          {/* Center content - either start button or workflow nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
            {workflowNode ? (
              <div className="flex flex-col items-center gap-4">
                {/* Handler Node */}
                <WorkflowNode
                  id={workflowNode.id}
                  name={workflowNode.name}
                  description={workflowNode.description}
                  type="handler"
                  position={{ x: 0, y: 0 }}
                />

                {/* Connection Line */}
                {recipientsNode && <div className="w-[2px] h-[46px] bg-gray-300"></div>}

                {/* Recipients Node */}
                {recipientsNode && (
                  <WorkflowNode
                    id={recipientsNode.id}
                    name={recipientsNode.name}
                    description={recipientsNode.description}
                    type="recipients"
                    position={{ x: 0, y: 0 }}
                    recipientsData={recipientsNode.recipientsData}
                  />
                )}

                {/* Connection Line */}
                {conditionNode && <div className="w-[2px] h-[46px] bg-gray-300"></div>}

                {/* Condition Node */}
                {conditionNode && (
                  <WorkflowNode
                    id={conditionNode.id}
                    name={conditionNode.name}
                    description={conditionNode.description}
                    type="condition"
                    position={{ x: 0, y: 0 }}
                    conditionData={conditionNode.conditionData}
                  />
                )}
              </div>
            ) : (
              <div className="text-center">
                <button
                  className="px-6 py-3 rounded-lg bg-[#2F2F2F] text-white text-sm font-medium shadow-lg hover:bg-[#404040] transition-colors flex items-center gap-2"
                  onClick={() => setShowHandlerPanel(true)}
                >
                  <BoltIcon fontSize="small" />
                  Click to start
                </button>
              </div>
            )}
          </div>

          {/* Bottom toolbar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-divider rounded-full px-4 py-2 flex items-center gap-4 shadow-sm z-10">
            <button
              className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              title="Undo"
            >
              <UndoIcon fontSize="small" />
            </button>
            <button
              className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              title="Redo"
            >
              <RedoIcon fontSize="small" />
            </button>
            <button
              className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              title="Zoom Out"
            >
              <RemoveIcon fontSize="small" />
            </button>
            <span className="text-sm text-text-secondary">100%</span>
            <button
              className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              title="Zoom In"
            >
              <AddIcon fontSize="small" />
            </button>
            <button
              className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              title="Help"
            >
              <HelpOutlineIcon fontSize="small" />
            </button>
          </div>

          {/* Right bottom button */}
          <div className="absolute right-[16px] bottom-[16px] w-[52px] h-[52px] bg-[#FAFAFA] border border-[#DEDEDE] rounded-lg flex items-center justify-center shadow-sm z-10">
            <AutoAwesomeIcon fontSize="small" className="text-text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewActionFlowPage;
