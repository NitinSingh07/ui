import Image from 'next/image';
import React from 'react';

import FailedStatus from '@public/audience/alert-circle.svg';

export const Failed = () => {
  return (
    <div className="w-[126px] h-[36px] bg-[#EF53501F] border-transparent rounded-[20px] flex justify-start px-4 items-center gap-2 transition-all">
      <div>
        <Image src={FailedStatus} alt="failed" />
      </div>
      <div className="bodyRegular text-error-main">Failed</div>
    </div>
  );
};
