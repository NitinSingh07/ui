import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Popover as MuiPopover } from '@mui/material';
import { List, ListItemButton, ListItemText, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react';

interface PopoverProps {
  options: {
    label: string;
    onClick: () => void;
    style?: React.CSSProperties;
  }[];
  buttonProps?: React.ComponentProps<typeof Button>;
  iconProps?: React.ComponentProps<typeof MoreVertIcon>;
  popoverProps?: React.ComponentProps<typeof MuiPopover>;
}

const Popover: React.FC<PopoverProps> = ({ options, buttonProps, iconProps, popoverProps }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'generic-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick} {...buttonProps}>
        <MoreVertIcon sx={{ color: 'black' }} {...iconProps} />
      </IconButton>
      <MuiPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              boxShadow: '0px 4px 64px 0px rgba(154, 164, 185, 0.25)',
              borderRadius: 4,
            },
          },
        }}
        {...popoverProps}
      >
        <List
          component="nav"
          sx={{
            width: '100%',
            padding: 0,
            backgroundColor: 'background.paper',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
          }}
        >
          {options.map((option, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => {
                  option.onClick();
                  handleClose();
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      color={option.label === 'Revoke' ? 'error' : 'text.primary'}
                    >
                      {option.label}
                    </Typography>
                  }
                />
              </ListItemButton>
              {index < options.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </MuiPopover>
    </div>
  );
};

export default Popover;
