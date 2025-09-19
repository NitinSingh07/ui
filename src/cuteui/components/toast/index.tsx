// cuteui/components/toast/index.tsx
import { Snackbar, Alert, Portal, type SnackbarProps, type AlertProps } from '@mui/material';
import React from 'react';

type Severity = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  open: boolean;
  message: React.ReactNode;
  severity?: Severity;
  handleClose: () => void;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  autoHideDuration?: number; // default: 6000
  variant?: AlertProps['variant']; // default: 'filled'
  action?: React.ReactNode; // optional right-side action
  snackbarProps?: Partial<SnackbarProps>; // passthrough to Snackbar
  alertProps?: Partial<AlertProps>; // passthrough to Alert
  useInPortal?: boolean; // default: true (for direct usage)
}

export const Toast: React.FC<ToastProps> = ({
  open,
  message,
  severity = 'success',
  handleClose,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  autoHideDuration = 3000,
  variant = 'filled',
  action,
  snackbarProps,
  alertProps,
  useInPortal = true,
}) => {
  const body = (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      sx={{
        position: 'fixed',
        zIndex: 1400,
        ...snackbarProps?.sx,
      }}
      {...snackbarProps}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant={variant}
        action={action}
        sx={{
          color: 'var(--text-hint)',
          ...(severity === 'success' ? { bgcolor: 'var(--success-main)' } : {}),
          '& .MuiAlert-message': { color: 'var(--text-hint)' },
          ...alertProps?.sx,
        }}
        {...alertProps}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return useInPortal ? <Portal>{body}</Portal> : body;
};
