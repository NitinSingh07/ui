import Image from 'next/image';
import React from 'react';

import { Button } from '@/cuteui/components/button/button';
import RefreshIcon from '@public/audience/refresh-cw (1).svg';

export const Refresh = () => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      text={<Image src={RefreshIcon} alt="refresh" />}
      classname="w-[40px] p-0 h-auto border border-error-main rounded-md flex justify-center items-center hover:cursor-pointer hover:border-error-main"
      size="small"
      onClick={() => 'refresh'}
    />
  );
};
