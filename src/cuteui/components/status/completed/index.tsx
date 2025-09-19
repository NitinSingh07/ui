import Image from 'next/image';
import React from 'react';

import CompletedStatus from '@public/audience/tick-filled.svg';

export const Completed = () => {
  return (
    <div className="w-[126px] h-[36px] bg-[#66BB6A1F] rounded-[20px] flex justify-center items-center gap-2">
      <div>
        <Image src={CompletedStatus} alt="completed" />
      </div>
      <div className="bodyRegular text-success-main">Completed</div>
    </div>
  );
};
