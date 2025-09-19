import LanguageIcon from '@mui/icons-material/Language';
import { Grid, Avatar as AvatarComponent } from '@mui/material';
import React from 'react';

import { cn } from '@/cuteui/lib/cn';

interface AvatarIconProps {
  avatarName?: string;
  color?: string;
  classname?: string;
  shape: 'circle' | 'square';
  fontColor?: string;
  globeIcon?: boolean;
}

export const Avatar = ({
  avatarName = 'A',
  classname,
  color = 'var(--color-2)',
  shape = 'circle',
  fontColor,
  globeIcon = false,
  ...props
}: AvatarIconProps) => {
  return (
    <Grid className={cn('h-8 w-8 rounded-full', classname)}>
      <AvatarComponent
        style={{
          ...props,
          backgroundColor: color,
          color: fontColor || 'var(--text-primary)',
          fontWeight: 'semibold',
          fontSize: 'small',
          height: '100%',
          width: '100%',
          borderRadius: shape === 'circle' ? '50%' : '6px',
        }}
      >
        {globeIcon ? <LanguageIcon /> : avatarName}
      </AvatarComponent>
    </Grid>
  );
};
