import { Switch as SwitchComponent, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

export const Switch = styled((props: SwitchProps) => (
  <SwitchComponent focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--primary-main)',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    backgroundColor: 'var(--text-secondary)',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
