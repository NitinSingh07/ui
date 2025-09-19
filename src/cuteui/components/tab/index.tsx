// components/Tab.tsx
import { Badge, Grid, Tab as MuiTab, Tabs } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import * as React from 'react';
import { cn } from '@/cuteui/lib/cn';

// Your default icons
import CommonIcon from '@public/components/commonIcon.svg';
import SelectedCommonIcon from '@public/components/selectedCommonIcon.svg';

type TabIcon = React.ReactElement | StaticImageData | string;

export interface TabItem {
  label: string;
  subLabel?: string;
  icon?: TabIcon; // optional: React SVG element or image src
  selectedIcon?: TabIcon; // optional: image src to use when selected
  count?: number;
}

interface TabProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabItems: TabItem[];
  useIcon?: boolean; // if true, use CommonIcon/SelectedCommonIcon
  classname?: string;
}

function renderIcon(tab: TabItem, isActive: boolean, useIcon?: boolean) {
  // Case 1: default icon pair
  if (useIcon) {
    return (
      <Image
        src={isActive ? SelectedCommonIcon : CommonIcon}
        alt={tab.label}
        width={16}
        height={16}
        style={{ marginRight: 20 }}
      />
    );
  }

  // Case 2: user-supplied icon
  if (!tab.icon) return null;

  // 2a: React element (SVG etc.) — just wrap, do not touch props
  if (React.isValidElement(tab.icon)) {
    return <span className="mr-5 inline-flex">{tab.icon}</span>;
  }

  // 2b: Image src (Next/Image) — optionally swap when active
  const imgSrc = (isActive && tab.selectedIcon ? tab.selectedIcon : tab.icon) as
    | StaticImageData
    | string;

  return <Image src={imgSrc} alt={tab.label} width={16} height={16} style={{ marginRight: 20 }} />;
}

export const Tab: React.FC<TabProps> = ({ value, onChange, tabItems, useIcon, classname }) => {
  return (
    <Grid>
      <Tabs
        value={value}
        onChange={onChange}
        indicatorColor="primary"
        aria-label="tabs"
        sx={{
          '& .MuiTab-root': {
            marginRight: 0,
            textTransform: 'none',
            color: 'var(--text-primary)',
            '&.Mui-selected': { color: 'var(--primary-main)' },
            minWidth: 'auto',
            paddingRight: 2,
            paddingLeft: 2,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'var(--primary-main)',
            height: '2px',
          },
        }}
        className={cn(classname)}
      >
        {tabItems.map((tab, index) => {
          const isActive = value === index;

          return (
            <MuiTab
              key={index}
              className="bodyMedium"
              label={
                <span
                  className={cn(
                    'flex items-center leading-tight',
                    isActive ? 'text-primary-main' : 'text-text-primary'
                  )}
                >
                  {renderIcon(tab, isActive, useIcon)}

                  <div className="flex flex-col leading-tight">
                    <span
                      className={cn(
                        'truncate max-w-[300px] text-[14px] leading-4', // fixed size from your .bodyMedium
                        isActive ? 'bodyMedium text-primary-main' : 'bodyRegular text-text-primary'
                      )}
                      title={tab.label}
                    >
                      {tab.label}
                    </span>

                    {tab.subLabel && (
                      <span
                        className={cn(
                          'subtextRegular truncate max-w-[200px] leading-4',
                          isActive ? 'text-green-light' : 'text-text-secondary'
                        )}
                        title={tab.subLabel}
                      >
                        {tab.subLabel}
                      </span>
                    )}
                  </div>

                  <Badge
                    badgeContent={tab.count}
                    color="primary"
                    showZero
                    sx={{
                      marginLeft: 2,
                      '& .MuiBadge-badge': {
                        backgroundColor: isActive
                          ? 'var(--background-primary-weak)'
                          : 'var(--text-hint)',
                        color: isActive ? 'var(--primary-main)' : 'var(--text-primary)',
                        fontSize: '12px',
                        minWidth: '19px',
                        height: '18px',
                        border: `1px solid ${
                          isActive ? 'var(--primary-main)' : 'var(--background-disabled)'
                        }`,
                        borderRadius: '1.5rem',
                        textAlign: 'center',
                      },
                    }}
                  />
                </span>
              }
            />
          );
        })}
      </Tabs>
    </Grid>
  );
};
