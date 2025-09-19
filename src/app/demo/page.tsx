'use client';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

import { CustomSelect } from '@/cuteui/components/custom-select';

function DropDown() {
  // --- helpers to normalize MUI SelectChangeEvent unions ---
  const toStringVal = (e: SelectChangeEvent<string | string[]>) => {
    const v = e.target.value;
    return Array.isArray(v) ? (v[0] ?? '') : v;
  };
  const toArrayVal = (e: SelectChangeEvent<string | string[]>) => {
    const v = e.target.value;
    return Array.isArray(v) ? v : typeof v === 'string' ? v.split(',') : [];
  };

  // --- SINGLE states ---
  const [singleBasic, setSingleBasic] = useState<string>('');
  const [singleSearch, setSingleSearch] = useState<string>('');
  const [singleIcons, setSingleIcons] = useState<string>('');
  const [singleAvatars, setSingleAvatars] = useState<string>('');
  const [singlePill, setSinglePill] = useState<string>('');

  // --- MULTI states ---
  const [multiBasic, setMultiBasic] = useState<string[]>([]);
  const [multiSearch, setMultiSearch] = useState<string[]>([]);
  const [multiRich, setMultiRich] = useState<string[]>([]);
  const [multiPill, setMultiPill] = useState<string[]>([]);

  // --- demo data ---
  const simpleOptions = ['Option 1', 'Option 2', 'Option 3'];

  const iconOptions = [
    { value: 'edu', label: 'Education', icon: <SchoolIcon fontSize="small" /> },
    { value: 'work', label: 'Work', icon: <WorkIcon fontSize="small" /> },
    { value: 'community', label: 'Community', icon: <PeopleIcon fontSize="small" /> },
  ];

  const avatarOptions = [
    { value: 'alpha', label: 'Alpha', avatarUrl: '/avatars/a.png' },
    { value: 'beta', label: 'Beta', avatarUrl: '/avatars/b.png' },
    { value: 'gamma', label: 'Gamma', avatarUrl: '/avatars/c.png' },
  ];

  const multiOptions = [
    { value: 'students', label: 'Students' },
    { value: 'teachers', label: 'Teachers' },
    { value: 'parents', label: 'Parents' },
    { value: 'alumni', label: 'Alumni' },
  ];

  return (
    <div className="p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-text-primary">CustomSelect — Examples</h1>

      {/* 1) Single — basic */}
      <section className="max-w-sm">
        <h2 className="mb-2 text-text-primary">Single — basic</h2>
        <CustomSelect
          value={singleBasic}
          onChange={(e) => setSingleBasic(toStringVal(e))}
          options={simpleOptions}
          placeholder="Choose an option"
        />
        <p className="mt-2 text-sm text-text-secondary">Selected: {singleBasic || '—'}</p>
      </section>

      {/* 2) Single — with search */}
      <section className="max-w-sm">
        <h2 className="mb-2 text-text-primary">Single — with search</h2>
        <CustomSelect
          value={singleSearch}
          onChange={(e) => setSingleSearch(toStringVal(e))}
          options={simpleOptions}
          showSearch
          placeholder="Search & select"
        />
        <p className="mt-2 text-sm text-text-secondary">Selected: {singleSearch || '—'}</p>
      </section>

      {/* 3) Single — icons */}
      <section className="max-w-sm">
        <h2 className="mb-2 text-text-primary">Single — with icons</h2>
        <CustomSelect
          value={singleIcons}
          onChange={(e) => setSingleIcons(toStringVal(e))}
          options={iconOptions}
          showIcon
          placeholder="Select category"
          showPlaceholderInMenu
        />
        <p className="mt-2 text-sm text-text-secondary">Selected: {singleIcons || '—'}</p>
      </section>

      {/* 4) Single — avatars */}
      <section className="max-w-sm">
        <h2 className="mb-2 text-text-primary">Single — with avatars</h2>
        <CustomSelect
          value={singleAvatars}
          onChange={(e) => setSingleAvatars(toStringVal(e))}
          options={avatarOptions}
          showAvatar
          placeholder="Pick a member"
          showPlaceholderInMenu
        />
        <p className="mt-2 text-sm text-text-secondary">Selected: {singleAvatars || '—'}</p>
      </section>

      {/* 5) Single — pill variant */}
      <section className="max-w-sm">
        <h2 className="mb-2 text-text-primary">Single — pill variant</h2>
        <CustomSelect
          value={singlePill}
          onChange={(e) => setSinglePill(toStringVal(e))}
          options={simpleOptions}
          variant="pill"
          placeholder="Select one"
        />
        <p className="mt-2 text-sm text-text-secondary">Selected: {singlePill || '—'}</p>
      </section>

      {/* 6) Multiple — basic + checkboxes (no search) */}
      <section className="max-w-sm">
        <h2 className="mb-2 text-text-primary">Multiple — basic + checkboxes</h2>
        <CustomSelect
          multiple
          value={multiBasic}
          onChange={(e) => setMultiBasic(toArrayVal(e))}
          options={multiOptions}
          showCheckbox
          placeholder="Select audiences"
          showPlaceholderInMenu
        />
        <p className="mt-2 text-sm text-text-secondary">
          Selected: {multiBasic.length ? multiBasic.join(', ') : '—'}
        </p>
      </section>

      {/* 7) Multiple — search + checkboxes */}
      <section className="max-w-sm">
        <h2 className="mb-2 text-text-primary">Multiple — with search + checkboxes</h2>
        <CustomSelect
          multiple
          value={multiSearch}
          onChange={(e) => setMultiSearch(toArrayVal(e))}
          options={multiOptions}
          showSearch
          showCheckbox
          placeholder="Filter & select audiences"
          showPlaceholderInMenu
        />
        <p className="mt-2 text-sm text-text-secondary">
          Selected: {multiSearch.length ? multiSearch.join(', ') : '—'}
        </p>
      </section>

      {/* 8) Multiple — rich (avatars + icons) + search + checkboxes */}
      <section className="max-w-sm">
        <h2 className="mb-2 text-text-primary">Multiple — avatars + icons + search</h2>
        <CustomSelect
          multiple
          value={multiRich}
          onChange={(e) => setMultiRich(toArrayVal(e))}
          options={[
            { value: 'edu', label: 'Education', icon: <SchoolIcon fontSize="small" /> },
            { value: 'work', label: 'Work', icon: <WorkIcon fontSize="small" /> },
            { value: 'alpha', label: 'Alpha', avatarUrl: '/avatars/a.png' },
            { value: 'beta', label: 'Beta', avatarUrl: '/avatars/b.png' },
          ]}
          showSearch
          showCheckbox
          showIcon
          showAvatar
          placeholder="Pick segments"
          showPlaceholderInMenu
        />
        <p className="mt-2 text-sm text-text-secondary">
          Selected: {multiRich.length ? multiRich.join(', ') : '—'}
        </p>
      </section>

      {/* 9) Multiple — pill variant */}
      <section className="max-w-sm">
        <h2 className="mb-2 text-text-primary">Multiple — pill + search + checkboxes</h2>
        <CustomSelect
          multiple
          value={multiPill}
          onChange={(e) => setMultiPill(toArrayVal(e))}
          options={multiOptions}
          variant="pill"
          showSearch
          showCheckbox
          placeholder="User"
        />
        <p className="mt-2 text-sm text-text-secondary">
          Selected: {multiPill.length ? multiPill.join(', ') : '—'}
        </p>
      </section>
    </div>
  );
}

export default DropDown;
