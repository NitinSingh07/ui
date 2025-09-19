// shared/toast-provider.tsx
'use client';

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Toast } from '@/cuteui/components/toast';

type Severity = 'success' | 'error' | 'warning' | 'info';

type ToastOptions = {
  severity?: Severity;
  autoHideDuration?: number;
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
  variant?: 'standard' | 'filled' | 'outlined';
  action?: React.ReactNode;
  snackbarProps?: React.ComponentProps<typeof Toast>['snackbarProps'];
  alertProps?: React.ComponentProps<typeof Toast>['alertProps'];
};

type ToastPayload = { message: React.ReactNode } & ToastOptions;

type ToastCtxType = {
  toast: (message: React.ReactNode, options?: ToastOptions | Severity) => void;
  success: (message: React.ReactNode, options?: Omit<ToastOptions, 'severity'>) => void;
  error: (message: React.ReactNode, options?: Omit<ToastOptions, 'severity'>) => void;
  info: (message: React.ReactNode, options?: Omit<ToastOptions, 'severity'>) => void;
  warning: (message: React.ReactNode, options?: Omit<ToastOptions, 'severity'>) => void;
};

const ToastCtx = createContext<ToastCtxType | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<ToastPayload | null>(null);
  const queueRef = useRef<ToastPayload[]>([]);

  const showNext = useCallback(() => {
    if (queueRef.current.length === 0) return;
    const next = queueRef.current.shift()!;
    setPayload(next);
    setOpen(true);
  }, []);

  const push = useCallback(
    (p: ToastPayload) => {
      queueRef.current.push(p);
      if (!open) showNext();
    },
    [open, showNext]
  );

  const toast: ToastCtxType['toast'] = useCallback(
    (message, options) => {
      if (typeof options === 'string') {
        push({ message, severity: options });
      } else {
        push({ message, ...(options ?? {}) });
      }
    },
    [push]
  );

  const api = useMemo<ToastCtxType>(
    () => ({
      toast,
      success: (message, options) => push({ message, severity: 'success', ...(options ?? {}) }),
      error: (message, options) => push({ message, severity: 'error', ...(options ?? {}) }),
      info: (message, options) => push({ message, severity: 'info', ...(options ?? {}) }),
      warning: (message, options) => push({ message, severity: 'warning', ...(options ?? {}) }),
    }),
    [push, toast]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(showNext, 150);
  }, [showNext]);

  return (
    <ToastCtx.Provider value={api}>
      {children}
      {typeof window !== 'undefined' &&
        createPortal(
          <Toast
            open={open}
            handleClose={handleClose}
            severity={payload?.severity ?? 'success'}
            message={payload?.message ?? ''}
            autoHideDuration={payload?.autoHideDuration}
            anchorOrigin={payload?.anchorOrigin}
            variant={payload?.variant}
            action={payload?.action}
            snackbarProps={payload?.snackbarProps}
            alertProps={payload?.alertProps}
            useInPortal={false}
          />,
          document.body
        )}
    </ToastCtx.Provider>
  );
}
