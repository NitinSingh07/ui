import React from 'react';

import { cn } from '@/cuteui/lib/cn';

interface footerProps {
  children: React.ReactNode;
  classname?: string;
}
const Footer = ({ children, classname }: footerProps) => {
  return (
    <div
      className={cn(
        classname,
        'fixed bottom-0 left-0 w-full px-2 flex justify-between items-center h-16 border-t-[1px] border-t-[#dedede] bg-[#fff] bg-opacity-100'
      )}
    >
      {children}
    </div>
  );
};

export default Footer;
