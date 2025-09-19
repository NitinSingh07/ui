import { Close } from '@mui/icons-material';
import { Chip as ChipComponent } from '@mui/material';
import { Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import theme from '@/theme';
import NeutralCommonIcon from '@public/components/neutralCommonIcon.svg';
import SelectedCommonIcon from '@public/components/selectedCommonIcon.svg';

interface ChipComponentProps {
  variant?: 'default' | 'green' | 'completed' | 'inProgress' | 'failed';
  label: string;
  onDelete?: () => void;
}

export const Chip = ({ variant = 'default', label, onDelete }: ChipComponentProps) => {
  const commonStyles = {
    ...theme.typography.subtextRegular,
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    margin: '0px 4px',
  };

  const greenStyles = {
    bgcolor: 'var(--background-primary-weak)',
    color: 'var(--primary-main)',
    border: 'none',
    '& .MuiChip-deleteIcon': {
      color: 'var(--primary-main)',
    },
  };
  const completedStyles = {
    bgcolor: 'var(--background-primary-weak)',
    color: 'var(--primary-main)',
    border: 'none',
    '& .MuiChip-deleteIcon': {
      color: 'var(--primary-main)',
    },
  };
  const inProgressStyles = {
    bgcolor: 'var(--background-inprogress)',
    color: 'var(--warning-main)',
    border: 'none',
    '& .MuiChip-deleteIcon': {
      color: 'var(--warning-main)',
    },
  };
  const failedStyles = {
    bgcolor: 'var(--background-failed)',
    color: 'var(--error-main)',
    border: 'none',
    '& .MuiChip-deleteIcon': {
      color: 'var(--error-main)',
    },
  };
  const defaultStyles = {
    borderColor: 'var(--primary-main)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--background-disabled)',
    '& .MuiChip-deleteIcon': {
      color: 'var(--text-secondary)',
    },
  };

  const styleMap = {
    green: greenStyles,
    completed: completedStyles,
    inProgress: inProgressStyles,
    failed: failedStyles,
    default: defaultStyles,
  };

  const appliedStyles = styleMap[variant] || styleMap.default;

  return (
    <Grid>
      <ChipComponent
        label={
          <span className="flex items-center gap-2">
            <Image
              src={variant === 'default' ? NeutralCommonIcon : SelectedCommonIcon}
              alt="common-icon"
              width={16}
              height={16}
            />
            {label}
          </span>
        }
        variant="outlined"
        deleteIcon={
          <Close
            style={{
              cursor: 'pointer',
              width: 16,
              height: 16,
              marginRight: '8px',
            }}
          />
        }
        onDelete={onDelete}
        sx={{ ...commonStyles, ...appliedStyles }}
      />
    </Grid>
  );
};
