import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import React from 'react';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: '1px solid var(--border-color)',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(() => ({
  flexDirection: 'row',
  backgroundColor: 'var(--background-offset-strong)',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(270deg)',
    transition: 'transform 0.2s',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(360deg)',
  },
  '& .MuiAccordionSummary-content': {
    // marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  // padding: theme.spacing(2),
  '&.MuiAccordionDetails-root ': {
    padding: '0px',
  },
}));

interface AccordionsProps {
  expandedAccordion: boolean;
  onchange: () => void;
  summaryText: string;
  children: React.ReactNode;
}

const index = ({ expandedAccordion, onchange, summaryText, children }: AccordionsProps) => {
  return (
    <Accordion
      expanded={expandedAccordion}
      onChange={() => onchange()}
      sx={{
        flexGrow: expandedAccordion ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        minHeight: '2.5rem',
        maxHeight: expandedAccordion ? '100%' : '2.5rem',
        boxShadow: 'none',
        border: 'none',
        '&:before': {
          display: 'none',
        },
        '& .MuiAccordionSummary-content': {
          margin: '5px 0px',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '&.MuiAccordionSummary-root': {
            minHeight: '2.5rem',
          },
        }}
      >
        <div className="subtextMedium text-text-primary">{summaryText}</div>
      </AccordionSummary>
      <AccordionDetails sx={{ overflowY: 'auto', height: '100%' }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default index;
