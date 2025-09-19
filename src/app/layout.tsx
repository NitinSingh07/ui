import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { inter, lexendDeca } from '@/app/fonts';
import { cn } from '@/cuteui/lib/cn';
import { ThemeProvider } from '@/providers/theme-provider';
import GlobalToastProvider from '@/providers/toast-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dokaair',
  description: 'MUlti service platform ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        className={cn(
          inter.variable,
          lexendDeca.variable,
          'font-inter',
          'bg-text-hint',
          'text-black'
        )}
      >
        <AppRouterCacheProvider>
          <ThemeProvider>
            <GlobalToastProvider>
              <NextTopLoader showSpinner={false} />
              {children}
            </GlobalToastProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
