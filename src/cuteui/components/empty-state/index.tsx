import { Grid, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { Button } from '../button/button';

interface IProps {
  handleOpenInviteModal: () => void;
  title?: string;
  description?: React.ReactNode;
  buttonText?: string;
  image?: StaticImageData;
}
export const EmptyMemberScreen = ({
  handleOpenInviteModal,
  title,
  description,
  buttonText,
  image,
}: IProps) => {
  return (
    <Grid className="flex justify-evenly flex-col h-[100%] w-[100%]">
      <Grid className="flex justify-center items-center h-[50vh] w-[100%]">
        <div className="flex flex-col justify-center items-center gap-3">
          <Grid className="flex items-center justify-center bg-background-primaryWeak rounded-full h-[134px] w-[134px]">
            {image && <Image src={image} alt="no-member" />}
          </Grid>
          <Grid>
            <Typography className="bodySemiBold text-text-primary">{title}</Typography>
          </Grid>
          <Grid>
            <Typography className="bodyRegular text-text-primary">{description}</Typography>
          </Grid>
          <Grid>
            <Button
              onClick={handleOpenInviteModal}
              variant="outlined"
              color="secondary"
              text={buttonText}
              size="medium"
              icon={true}
              position="leading"
            />
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};
