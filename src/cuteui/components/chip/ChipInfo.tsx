import { Chip as ChipComponent } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import theme from '@/theme';

interface ChipComponentProps {
  variant?: 'default' | 'green' | 'completed' | 'failed';
  label: string;
  onDelete?: () => void;
  chipIcon?: string | React.ReactNode;
  classname?: string;
  clickable?: boolean;
  handleClick?: (name: string) => void;
  channelName?: string;
  selectedList?: string[];
  disabled?: boolean;
  shape?: 'circle' | 'square';
  smallSize: boolean;
}
const ChipInfo = ({
  variant = 'default',
  label,
  chipIcon,
  classname,
  clickable,
  handleClick = () => {},
  channelName = '',
  selectedList = [],
  disabled = false,
  shape = 'circle',
  smallSize,
}: ChipComponentProps) => {
  let clickableStyles;
  const commonStyles = {
    ...theme.typography.subtextRegular,
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    padding: '8px 16px 8px 12px',
  };

  const greenStyles = {
    bgcolor: '#ffffff',
    color: 'var(--success-main)',
    border: '1px solid var(--success-main)',
  };

  const defaultStyles = {
    color: 'var(--text-secondary)',
    bgcolor: 'var(--text-hint)',
    border: '1px solid var(--background-disabled)',
  };
  const clickableSelectedStyles = {
    bgcolor: 'var(--background-primary-weak)',
    color: 'var(--primary-main)',
    border: '1px solid var(--primary-main)',
    '&&:hover': {
      bgcolor: 'var(--background-primary-weak)',
    },
  };

  const clickableDefaultStyles = {
    color: 'var(--text-secondary)',
    bgcolor: 'var(--background-offset-weak)',
    border: '1px solid var(--background-disabled)',
  };

  if (clickable) {
    clickableStyles = selectedList.includes(channelName)
      ? clickableSelectedStyles
      : clickableDefaultStyles;
  } else {
    clickableStyles = variant === 'green' ? greenStyles : defaultStyles;
  }

  return (
    <div>
      <ChipComponent
        label={
          <span className="flex items-center gap-1 bodyMedium ">
            {chipIcon && typeof chipIcon === 'string' ? (
              <Image src={chipIcon} alt="common-icon" width={16} height={16} />
            ) : (
              chipIcon
            )}
            {label}
          </span>
        }
        onClick={() => handleClick(channelName)}
        variant="outlined"
        size={smallSize ? 'small' : 'medium'}
        disabled={disabled}
        className={classname}
        clickable={clickable}
        sx={{
          ...commonStyles,
          ...clickableStyles,
          '& .MuiChip-label': { padding: 0 },
          borderRadius: shape === 'circle' ? '3rem' : '0.375rem',
        }}
      />
    </div>
  );
};

export default ChipInfo;
