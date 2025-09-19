import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

interface RadioButtonProp {
  value: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  disabledReason?: string;
}
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 224,
  },
});
const CustomFormControlLabel = styled(FormControlLabel)(({ checked }) => ({
  border: checked ? '1px solid var(--primary-main)' : '1px solid var(--background-disabled)',
  backgroundColor: checked ? 'var(--background-primary-weak)' : 'var(--background-set-weak)',
  borderRadius: '1.87rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.75rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: 'inter',
  height: '2.25rem',
  gap: '4px',
}));

const RadioChip = ({
  value,
  label,
  checked,
  disabled = false,
  disabledReason,
}: RadioButtonProp) => {
  const radioChip = (
    <CustomFormControlLabel
      value={value}
      control={
        <Radio
          sx={{
            '& .MuiSvgIcon-root': { height: 16, width: 16 },
            '&.Mui-checked': { color: 'var(--primary-main)' },
            '&.MuiRadio-root': { padding: '4px' },
          }}
        />
      }
      label={label}
      checked={checked}
      disabled={disabled}
      sx={{
        '&.MuiFormControlLabel-root': { marginLeft: '0px' },
        '&.Mui-disabled': { backgroundColor: 'var(--background-disabled)' },
      }}
    />
  );

  if (disabled && disabledReason) {
    return (
      <CustomWidthTooltip title={disabledReason} placement="top" arrow>
        <span style={{ display: 'inline-block' }}>{radioChip}</span>
      </CustomWidthTooltip>
    );
  }
  return radioChip;
};

export default RadioChip;
