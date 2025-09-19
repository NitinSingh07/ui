import { Modal } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/cuteui/components/button/button';
import Loader from '@/cuteui/components/loader';
import { cn } from '@/cuteui/lib/cn';
import closeIcon from '@public/dashboard/closeIcon.svg';

interface DecisionModalProps {
  open: boolean;
  onClose: () => void;
  titleText: string;
  descriptionText: string;
  buttonText?: string | 'Create';
  cancelButtonText?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classname?: string;
  cancelClassname?: string;
  isLoading?: boolean;
  buttonTextColor?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | undefined;
}

const DecisionModal = ({
  open,
  onClose,
  titleText,
  descriptionText,
  buttonText,
  cancelButtonText,
  onClick,
  classname,
  cancelClassname,
  buttonTextColor,
  isLoading,
}: DecisionModalProps) => {
  const handleCloseModal = () => {
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className="top-0 left-0 w-full h-full bg-opacity-80 flex items-center justify-center">
        <div className="relative flex flex-col gap-5 h-[184px] w-[600px] bg-text-hint rounded-md p-6">
          <div className="flex justify-between">
            {isLoading && <Loader />}
            <div className="title1Bold text-text-primary">{titleText}</div>
            <div className="absolute right-1 top-3">
              <Button
                onClick={handleCloseModal}
                variant="close"
                color="secondary"
                text={<Image src={closeIcon} alt="icon" width={20} height={20} />}
                size="small"
                classname="border-none"
              />
            </div>
          </div>
          <div className="bodyRegular text-text-primary">{descriptionText}</div>
          <div className="flex justify-end">
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              color="light"
              text={cancelButtonText || 'Cancel'}
              size="medium"
              classname={cn('w-25 border-text-primary hover:bg-transparent', cancelClassname)}
            />
            <Button
              onClick={onClick || (() => {})}
              variant="contained"
              color={`${buttonTextColor ? buttonTextColor : 'primary'}`}
              text={buttonText}
              size="medium"
              classname={cn('ml-4 w-25', classname)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DecisionModal;
