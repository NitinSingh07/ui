import { Checkbox as CheckboxComponent } from '@mui/material';
import React from 'react';

import { cn } from '@/cuteui/lib/cn';

interface IcheckboxProps {
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  name?: string;
  className?: string;
}

export const CuteCheckbox = ({ checked = false, onChange, name, className }: IcheckboxProps) => {
  return (
    <CheckboxComponent
      checked={checked}
      onChange={onChange}
      name={name}
      inputProps={{ 'aria-label': 'controlled' }}
      sx={{
        color: 'var(--text-primary)',
        '&.Mui-checked': {
          color: 'var(--primary-main)',
        },
      }}
      className={cn(className)}
    />
  );
};
