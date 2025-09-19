import Image from 'next/image';
import React from 'react';

import { cn } from '../../lib/cn';

interface IconProps {
  svg: string;
  className?: string;
}

const SwiftIconWrapper: React.FC<IconProps> = ({ svg, className }) => {
  return <Image src={svg} alt="icon" className={cn('w-4 h-4', className)} />;
};

export default SwiftIconWrapper;
