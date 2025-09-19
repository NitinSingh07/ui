'use client';
import React, { useEffect, useState } from 'react';

import { cn } from '@/cuteui/lib/cn';

type ColoredSvgIconProps = {
  filePath: string;
  color: string;
  className?: string;
  [key: string]: string | undefined;
};

const ColorFullSvg: React.FC<ColoredSvgIconProps> = ({ filePath, color, className, ...props }) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch SVG: ${response.statusText}`);
        }
        let svgText = await response.text();
        svgText = svgText.replace(/(width|height)="[^"]*"/g, '');
        svgText = svgText.replace(/stroke="[^"]*"/g, `stroke="${color}"`);

        setSvgContent(svgText);
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    fetchSvg();
  }, [filePath, color]);

  return (
    <div {...props} className={cn(className)} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default ColorFullSvg;
