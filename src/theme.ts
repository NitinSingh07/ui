'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
interface CustomTypographyStyles {
  display1Bold: React.CSSProperties;
  display1Medium: React.CSSProperties;
  display2Bold: React.CSSProperties;
  display3Bold: React.CSSProperties;
  display4Bold: React.CSSProperties;
  display3Medium: React.CSSProperties;
  title1Bold: React.CSSProperties;
  title2Bold: React.CSSProperties;
  title3Bold: React.CSSProperties;
  title4Bold: React.CSSProperties;
  title3Semibold: React.CSSProperties;
  title2SemiBold: React.CSSProperties;
  title1SemiBold: React.CSSProperties;
  title1Medium: React.CSSProperties;
  title3Medium: React.CSSProperties;
  title2Medium: React.CSSProperties;
  title4Medium: React.CSSProperties;
  title4SemiBold: React.CSSProperties;
  title4Regular: React.CSSProperties;
  bodyBold: React.CSSProperties;
  bodySemiBold: React.CSSProperties;
  bodyMedium: React.CSSProperties;
  bodyRegular: React.CSSProperties;
  subtextBold: React.CSSProperties;
  subtextSemiBold: React.CSSProperties;
  subtextMedium: React.CSSProperties;
  subtextRegular: React.CSSProperties;
  captionSemiBold: React.CSSProperties;
  captionRegular: React.CSSProperties;
  captionMedium: React.CSSProperties;
}

declare module '@mui/material/styles' {
  interface TypographyVariants extends CustomTypographyStyles {}
  interface TypographyVariantsOptions extends Partial<CustomTypographyStyles> {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1Bold: true;
    display1Medium: true;
    display2Bold: true;
    display3Bold: true;
    display4Bold: true;
    display3Medium: true;
    title1Bold: true;
    title2Bold: true;
    title3Bold: true;
    title4Bold: true;
    title3Semibold: true;
    title2SemiBold: true;
    title1SemiBold: true;
    title1Medium: true;
    title2Medium: true;
    title3Medium: true;
    title4Medium: true;
    title4SemiBold: true;
    title4Regular: true;
    bodyBold: true;
    bodySemiBold: true;
    bodyMedium: true;
    bodyRegular: true;
    subtextBold: true;
    subtextSemiBold: true;
    subtextMedium: true;
    subtextRegular: true;
    captionSemiBold: true;
    captionRegular: true;
    captionMedium: true;
  }
}

declare module '@mui/material/styles' {
  interface TypeText {
    hint?: string; // Add the hint property as optional
  }
  interface PaletteOptions {
    gradient?: {
      primary?: string;
    };
  }
  interface TypeBackground {
    offsetWeak?: string;
    gradient?: string;
    inprogress?: string;
  }
  interface TypographyVariants extends CustomTypographyStyles {}
  interface TypographyVariantsOptions extends Partial<CustomTypographyStyles> {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides extends CustomTypographyStyles {}
}

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
    fontSize: 16, // This sets the base font size. You might want to adjust individual sizes below.
    display1Bold: {
      fontSize: '42px', // Adjusted from 2.625rem
      fontWeight: 'bold',
      lineHeight: '48px',
    },
    display1Medium: {
      fontSize: '42px', // Adjusted from 2.625rem
      fontWeight: '500', // Medium
      lineHeight: '48px',
    },
    display2Bold: {
      fontSize: '36px', // Adjusted from 2.25rem
      fontWeight: 'bold',
      lineHeight: '40px',
    },
    display3Bold: {
      fontSize: '32px', // Adjusted from 2rem
      fontWeight: 'bold',
      lineHeight: '36px',
    },
    display4Bold: {
      fontSize: '28px',
      fontWeight: 'bold',
      lineHeight: '36px',
    },
    display3Medium: {
      fontSize: '32px', // Adjusted from 2rem
      fontWeight: '500', // Medium
      lineHeight: '36px',
    },
    title1Bold: {
      fontSize: '24px', // Adjusted from 1.5rem
      fontWeight: 'bold',
      lineHeight: '28px',
    },
    title2Bold: {
      fontSize: '20px', // Adjusted from 1.25rem
      fontWeight: 'bold',
      lineHeight: '24px',
    },
    title3Bold: {
      fontSize: '18px', // Adjusted from 1.125rem
      fontWeight: 'bold',
      lineHeight: '20px',
    },
    title3Semibold: {
      fontSize: '18px', // Adjusted from 1.125rem
      fontWeight: '600',
      lineHeight: '24px',
    },
    title2SemiBold: {
      fontSize: '20px', // Adjusted from 1.25rem
      fontWeight: '600',
      lineHeight: '24px',
    },
    title1SemiBold: {
      fontSize: '24px', // Adjusted from 1.25rem
      fontWeight: '600',
      lineHeight: '32px',
    },
    title3Medium: {
      fontSize: '18px', // Adjusted from 1.125rem
      fontWeight: '500', // Medium
      lineHeight: '20px',
    },
    title4Bold: {
      fontSize: '16px', // Adjusted from 1rem
      fontWeight: 'bold',
      lineHeight: '20px',
    },
    title4SemiBold: {
      fontSize: '16px', // Adjusted from 1rem
      fontWeight: '600', // Semi Bold
      lineHeight: '20px',
    },
    title4Medium: {
      fontSize: '16px', // Adjusted from 1rem
      fontWeight: '500', // Medium
      lineHeight: '20px',
    },
    title4Regular: {
      fontSize: '16px', // Adjusted from 1rem
      fontWeight: '400', // Regular
      lineHeight: '20px',
    },
    bodyBold: {
      fontSize: '14px', // Adjusted from 0.875rem
      fontWeight: 'bold',
      lineHeight: '16px',
    },
    bodySemiBold: {
      fontSize: '14px', // Adjusted from 0.875rem
      fontWeight: '600', // Semi Bold
      lineHeight: '16px',
    },
    bodyMedium: {
      fontSize: '14px', // Adjusted from 0.875rem
      fontWeight: '500', // Medium
      lineHeight: '16px',
    },
    bodyRegular: {
      fontSize: '14px', // Adjusted from 0.875rem
      fontWeight: '400', // Regular
      lineHeight: '16px',
    },
    subtextBold: {
      fontSize: '12px', // Adjusted from 0.75rem
      fontWeight: 'bold',
      lineHeight: '16px',
    },
    subtextSemiBold: {
      fontSize: '12px', // Adjusted from 0.75rem
      fontWeight: '600', // Semi Bold
      lineHeight: '16px',
    },
    subtextMedium: {
      fontSize: '12px', // Adjusted from 0.75rem
      fontWeight: '500', // Medium
      lineHeight: '16px',
    },
    subtextRegular: {
      fontSize: '12px', // Adjusted from 0.75rem
      fontWeight: '400', // Regular
      lineHeight: '16px',
    },
    captionSemiBold: {
      fontSize: '10px', // Adjusted from 0.625rem
      fontWeight: '600', // Semi Bold
      lineHeight: '12px',
    },
    captionRegular: {
      fontSize: '10px', // Adjusted from 0.625rem
      fontWeight: '400', // Regular
      lineHeight: '12px',
    },
    captionMedium: {
      fontSize: '10px',
      fontWeight: '500',
      lineHeight: '16px',
    },
  },
  palette: {
    text: {
      primary: '#1F1F1F', // Text/Neutral Strong
      secondary: '#8E8E8E', // Text/Neutral Medium
      disabled: '#CACACA', // Text/Neutral weak
      hint: '#FFFFFF', // Text/Neutral Inverse
    },
    primary: {
      main: '#FC547A', // Text/Primary
    },
    secondary: {
      main: '#FF6254', // Text/Secondary
    },
    success: {
      main: '#47B881', // Text/Positive
    },
    warning: {
      main: '#FFC62B', // Text/Notice
    },
    error: {
      main: '#F64C4C', // Text/Negative
    },
    background: {
      default: '#FBFDFF', // Background/Offset Medium
      paper: '#FFFFFF', // Background/Offset strong
      offsetWeak: '#F6FAFF', // Background/Offset weak
      gradient: 'linear-gradient(to right, #DD6580, #EE7368)',
      inprogress: '#FFF3E0',
    },
    action: {
      active: '#1F1F1F', // Border/Neutral Strong
      hover: '#FFE9EA', // Background/Secondary Weak
      selected: '#FFF7E1', // Background/Notice Weak
      disabled: '#E1E1E1', // Border/Neutral weak
      disabledBackground: '#FEE4E8',
      // Background/Negative Weak
    },
    divider: '#CACACA', // Border/Neutral medium,
  },
});

export default theme;
