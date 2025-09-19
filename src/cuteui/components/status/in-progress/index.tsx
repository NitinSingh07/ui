import Image from 'next/image';
import React from 'react';

import InProgressStatus from '@public/audience/rotate-cw.svg';

export const InProgress = () => {
  return (
    <div className="w-[126px] h-[36px] bg-[var(--background-inprogress)] text-[var(--warning-main)] rounded-[20px] flex justify-center items-center gap-2">
      <div>
        <Image src={InProgressStatus} alt="in-progress" />
      </div>
      <div className="bodyRegular text-[var(--warning-main)]">In progress</div>
    </div>
  );
};
