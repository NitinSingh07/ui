import { Grid, Box, Modal } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/cuteui/components/button/button';
import closeIcon from '@public/dashboard/closeIcon.svg';

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  titleText: string;
  descriptionText: string;
  text: string;
}

export const InfoModal = ({ open, onClose, titleText, descriptionText, text }: InfoModalProps) => {
  const handleCloseModal = () => {
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="position-fixed top-0 left-0 w-full h-full bg-text-primary bg-opacity-60 flex items-center justify-center">
        <Grid className="h-[372px] w-[470px] bg-text-hint rounded-md">
          <Grid className="flex justify-end m-2">
            <Grid>
              <Button
                onClick={handleCloseModal}
                variant="close"
                color="secondary"
                text={<Image src={closeIcon} alt="icon" width={12} height={12} />}
                size="small"
                classname="border-none"
              />
            </Grid>
          </Grid>
          <div className="flex flex-col justify-center items-center gap-4 py-4">
            <Grid className="h-[140px] w-[140px] rounded-full bg-background-primaryWeak" />
            <Grid className="title1Bold text-text-primary">{titleText}</Grid>
            <Grid className="bodyRegular text-text-primary">{descriptionText}</Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                text={text}
                size="medium"
                onClick={() => ''}
              />
            </Grid>
          </div>
        </Grid>
      </Box>
    </Modal>
  );
};
