import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

interface RadioButtonProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel
        id={`${name}-radio-buttons-group-label`}
        sx={{ color: 'var(--text-primary) !important' }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        aria-labelledby={`${name}-radio-buttons-group-label`}
        name={name}
        value={value}
        onChange={(event) => onChange(event, event.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                sx={{
                  color: 'var(--primary-main)',
                  '&.Mui-checked': { color: 'var(--primary-main)' },
                }}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
