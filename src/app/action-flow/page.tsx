'use client';

import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EditIcon from '@mui/icons-material/Edit';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';

const ActionFlow = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const workflows = useMemo(
    () => [
      {
        id: 1,
        name: 'Notification for influencers',
        description: 'This flow deals specifically churn users and all their impacts.',
      },
      {
        id: 2,
        name: 'Influencer Engageme...',
        description: 'This flow deals specifically churn users and all their impacts.',
      },
      {
        id: 3,
        name: 'Influencer Notification System',
        description: 'This flow deals specifically churn users and all their impacts.',
      },
      {
        id: 4,
        name: 'Influencer Outreach Notification',
        description: 'This flow deals specifically churn users and all their impacts.',
      },
      {
        id: 5,
        name: 'Influencer Collaboration Reminder',
        description: 'This flow deals specifically churn users and all their impacts.',
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return workflows;
    return workflows.filter((w) => w.name.toLowerCase().includes(q));
  }, [workflows, searchQuery]);

  return (
    <div className="min-h-screen bg-background-default flex">
      {/* Sidebar */}
      <aside className="w-[220px] min-h-screen bg-white border-r border-divider flex flex-col justify-between">
        <div>
          {/* Top brand and back */}
          <div className="h-16 flex items-center gap-3 px-4 border-b border-divider">
            <div className="w-8 h-8 rounded bg-primary-main/10 text-primary-main flex items-center justify-center">
              <ViewListOutlinedIcon fontSize="small" />
            </div>
            <button className="ml-auto text-text-secondary hover:text-text-primary transition-colors">
              <ChevronLeftIcon />
            </button>
          </div>

          {/* Project name */}
          <div className="px-4 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E9F1FF] text-[#A855F7] flex items-center justify-center text-xs font-semibold">
              AB
            </div>
            <div className="flex-1">
              <div className="text-sm text-text-primary">Project name</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-2 text-sm">
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <DashboardOutlinedIcon fontSize="small" className="text-text-secondary" />
                Dashboard
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <ViewListOutlinedIcon fontSize="small" className="text-text-secondary" />
                Services
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <SettingsOutlinedIcon fontSize="small" className="text-text-secondary" />
                Configurations
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <GroupOutlinedIcon fontSize="small" className="text-text-secondary" />
                Members
              </a>
            </div>

            {/* Divider */}
            <div className="px-4 py-3 text-xs text-text-secondary">NOTIFICATION</div>

            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <ListAltOutlinedIcon fontSize="small" className="text-text-secondary" />
                Notification Handler
              </a>
            </div>

            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer bg-[#E6F4F1] text-[#1D9D74]">
                <ViewListOutlinedIcon fontSize="small" />
                Action flow
              </a>
            </div>

            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <ViewListOutlinedIcon fontSize="small" className="text-text-secondary" />
                Groups
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <ListAltOutlinedIcon fontSize="small" className="text-text-secondary" />
                Templates
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <GroupOutlinedIcon fontSize="small" className="text-text-secondary" />
                Customers
              </a>
            </div>
            <div className="px-2 py-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-background-offsetWeak cursor-pointer text-text-primary">
                <ListAltOutlinedIcon fontSize="small" className="text-text-secondary" />
                Logs
              </a>
            </div>
          </nav>
        </div>

        {/* Bottom org selector */}
        <div className="px-4 py-3 border-t border-divider flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#E9F1FF] flex items-center justify-center text-[#A855F7] text-sm">
            G
          </div>
          <div className="flex-1">
            <div className="text-sm text-text-primary">Google</div>
            <div className="text-xs text-text-secondary">2443454454</div>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 min-h-screen flex flex-col">
        {/* Top header bar */}
        <div className="h-16 bg-white border-b border-divider flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary-main/10 text-primary-main flex items-center justify-center">
              <ViewListOutlinedIcon fontSize="small" />
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
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
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
                '& fieldset': { borderColor: 'var(--divider)' },
                '&:hover fieldset': { borderColor: 'var(--divider)' },
                '&.Mui-focused fieldset': { borderColor: 'var(--primary-main)' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-text-secondary" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Right top + to create new project */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-md border border-divider bg-white text-text-primary hover:bg-background-offsetWeak"
            aria-label="Create project"
          >
            <AddIcon fontSize="small" />
          </button>
        </div>

        {/* Table */}
        <div className="px-6 pb-8">
          <div className="rounded-lg border border-divider overflow-hidden bg-white">
            {/* Header */}
            <div className="bg-background-offsetWeak border-b border-divider px-6 py-3 text-sm font-medium text-text-primary grid grid-cols-12">
              <div className="col-span-6">Action flow name</div>
              <div className="col-span-5"></div>
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
                  <div className="col-span-6 text-text-primary">{w.name}</div>
                  <div className="col-span-5 text-text-secondary">
                    This flow deals specifically churn users and all their impacts.
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <IconButton size="small" sx={{ color: 'var(--success-main)' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
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
