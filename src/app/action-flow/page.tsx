'use client';

import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventIcon from '@mui/icons-material/Event';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import { InputAdornment, TextField } from '@mui/material';
import React, { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ActionFlow = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [workflows, setWorkflows] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempDesc, setTempDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch workflows from localStorage
  const fetchWorkflows = () => {
    try {
      const storedWorkflows = localStorage.getItem('workflows');
      if (storedWorkflows) {
        const data = JSON.parse(storedWorkflows);
        setWorkflows(data);
      } else {
        // Initialize with empty array if no data exists
        setWorkflows([]);
      }
    } catch (error) {
      console.error('Error fetching workflows from localStorage:', error);
      setWorkflows([]);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  // Listen for storage events to refresh when new workflows are created
  useEffect(() => {
    const handleStorageChange = () => {
      fetchWorkflows();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return workflows;
    return workflows.filter((w) => w.name.toLowerCase().includes(q));
  }, [workflows, searchQuery]);

  const startEdit = (id: number, currentName: string, currentDesc: string) => {
    setEditingId(id);
    setTempName(currentName);
    setTempDesc(currentDesc);
  };

  const commitEdit = () => {
    if (editingId == null) return;

    setIsLoading(true);
    try {
      // Get current workflows from localStorage
      const storedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');

      // Update the specific workflow
      const updatedWorkflows = storedWorkflows.map((w) =>
        w.id === editingId
          ? {
              ...w,
              name: tempName.trim() || w.name,
              description: tempDesc.trim() || w.description,
              updatedAt: new Date().toISOString(),
            }
          : w
      );

      // Save back to localStorage
      localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));

      // Update state
      setWorkflows(updatedWorkflows);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating workflow:', error);
      alert('Failed to update workflow. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-default flex">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? 'w-16' : 'w-[220px]'} h-[900px] bg-white border-r border-[#DEDEDE] flex flex-col justify-between transition-all`}
      >
        <div>
          {/* Top brand and back */}
          <div className="h-16 flex items-center gap-3 px-4 ">
            <div className="w-8 h-8 rounded bg-primary-main/10 text-primary-main flex items-center justify-center">
              <ViewListOutlinedIcon fontSize="small" />
            </div>
            <button
              className="ml-auto text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setCollapsed((v) => !v)}
              aria-label="Collapse sidebar"
            >
              <ChevronLeftIcon className={`${collapsed ? 'rotate-180' : ''} transition`} />
            </button>
          </div>

          {/* Project name */}
          <div className="px-4 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E9F1FF] text-[#A855F7] flex items-center justify-center text-xs font-semibold">
              AB
            </div>
            {!collapsed && (
              <div className="flex-1">
                <div className="text-sm text-text-primary">Project name</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="mt-2   text-sm">
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <HomeIcon fontSize="small" className="text-text-secondary" />
                {!collapsed && <span>Dashboard</span>}
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <GridViewIcon fontSize="small" className="text-text-secondary" />
                {!collapsed && <span>Services</span>}
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <SettingsIcon fontSize="small" className="text-text-secondary" />
                {!collapsed && <span>Configurations</span>}
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <PersonAddIcon fontSize="small" className="text-text-secondary" />
                {!collapsed && <span>Members</span>}
              </a>
            </div>

            {/* Divider */}
            {!collapsed && (
              <div className="px-4 py-3 text-xs text-text-secondary">NOTIFICATION</div>
            )}

            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <EventIcon fontSize="small" className="text-text-secondary" />
                {!collapsed && <span>Notification Handler</span>}
              </a>
            </div>

            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer bg-[#E6F4F1] text-[#1D9D74]">
                <MoreHorizIcon fontSize="small" />
                {!collapsed && <span>Action flow</span>}
              </a>
            </div>

            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <GroupIcon fontSize="small" className="text-text-secondary" />
                {!collapsed && <span>Groups</span>}
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <ArticleIcon fontSize="small" className="text-text-secondary" />
                {!collapsed && <span>Templates</span>}
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <GroupIcon fontSize="small" className="text-text-secondary" />
                {!collapsed && <span>Customers</span>}
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <AccessTimeIcon fontSize="small" className="text-text-secondary" />
                {!collapsed && <span>Logs</span>}
              </a>
            </div>
          </nav>
        </div>

        {/* Bottom org selector */}
        <div className="px-4 py-3  flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center text-white text-sm">
            <LanguageIcon fontSize="small" />
          </div>
          {!collapsed && (
            <div className="flex-1">
              <div className="text-sm text-text-primary">Google</div>
              <div className="text-xs text-text-secondary">2443454454</div>
            </div>
          )}
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 min-h-screen flex flex-col">
        {/* Top header bar */}
        <div className="h-16 bg-white border-b border-[#DEDEDE] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-green-500 text-white flex items-center justify-center">
              <span className="text-sm font-bold">↑</span>
            </div>
            <h1 className="text-lg font-medium text-text-primary">Action flow</h1>
          </div>
          <div className="flex items-center gap-3">
            <NotificationsNoneOutlinedIcon className="text-text-secondary" />
            <div className="w-8 h-8 rounded-full bg-[#E9F1FF] text-[#A855F7] flex items-center justify-center text-xs font-semibold">
              AB
            </div>
          </div>
        </div>

        {/* Search + Add */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between  rounded-full">
          <TextField
            placeholder="Search flow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{
              width: '344px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFFFFF',
                height: 40,
                borderRadius: '9999px', // Makes it pill-shaped
                '& fieldset': {
                  borderColor: '#E5E7EB',
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#E5E7EB',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#E5E7EB',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Add button in correct position */}
          <button
            className="flex items-center justify-center w-[40px] h-[40px] rounded-md border border-green-500 hover:bg-green-600 transition-colors"
            aria-label="Create project"
            onClick={() => router.push('/action-flow/new')}
          >
            <AddIcon fontSize="small" className="text-green-500" />
          </button>
        </div>

        {/* Table */}
        <div className="px-6 pb-8">
          <div className="rounded-lg  overflow-hidden bg-white">
            {/* Header */}
            <div className="bg-background-offsetWeak border-b border-divider px-6 py-3 text-sm font-medium text-text-primary grid grid-cols-12">
              <div className="col-span-5">Action flow name</div>
              <div className="col-span-6">Description</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Rows */}
            <div>
              {filtered.map((w, i) => (
                <div
                  key={w.id}
                  className={`grid grid-cols-12 px-6 py-4 text-sm hover:bg-background-offsetWeak transition-colors ${
                    i !== filtered.length - 1 ? 'border-b border-[#E5E7EB]' : ''
                  }`}
                >
                  <div className="col-span-5 text-text-primary">
                    {editingId === w.id ? (
                      <input
                        autoFocus
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={commitEdit}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') commitEdit();
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        className="w-full bg-transparent outline-none border border-[#D1D5DB] rounded px-2 py-1"
                        aria-label="Edit workflow name"
                      />
                    ) : (
                      <span>{w.name}</span>
                    )}
                  </div>
                  <div className="col-span-6 text-text-secondary">
                    {editingId === w.id ? (
                      <input
                        value={tempDesc}
                        onChange={(e) => setTempDesc(e.target.value)}
                        onBlur={commitEdit}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') commitEdit();
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        className="w-full bg-transparent outline-none border border-[#D1D5DB] rounded px-2 py-1"
                        aria-label="Edit workflow description"
                      />
                    ) : (
                      <span>{w.description}</span>
                    )}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      className="w-6 h-6 flex items-center justify-center text-green-500 hover:text-green-600 transition-colors"
                      onClick={() => startEdit(w.id, w.name, w.description)}
                      aria-label="Edit row"
                    >
                      <EditIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActionFlow;
