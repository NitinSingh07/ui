'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

//hideRechartsConsoleError();

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <NextThemeProvider>{children}</NextThemeProvider>;
}
