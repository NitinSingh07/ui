'use client';
import {
  Box,
  Pagination,
  PaginationItem,
  PaginationProps,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import { CustomSelect } from '@/cuteui/components/custom-select';
import { Toast } from '@/cuteui/components/toast';

export interface CustomPaginationProps extends PaginationProps {
  count: number;
  page: number;
  handlePagination: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (newItemsPerPage: number) => void;
  showItemsPerPage?: boolean;
  showGoTo?: boolean;
  itemsPerPageOptions?: number[];
}

const CutePagination = ({
  count,
  page,
  handlePagination,
  itemsPerPage = 10,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showGoTo = true,
  itemsPerPageOptions = [5, 10, 25, 50, 100],
  ...props
}: CustomPaginationProps) => {
  const [goToPage, setGoToPage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('error');

  const handleItemsPerPageChange = (event: SelectChangeEvent<string>) => {
    const newItemsPerPage = parseInt(event.target.value);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPage);

    if (!goToPage || isNaN(pageNumber)) {
      setSnackbarMessage('Please enter a valid page number');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    if (pageNumber < 1) {
      setSnackbarMessage('Page number must be at least 1');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (pageNumber > count) {
      setSnackbarMessage(
        `Page number cannot exceed ${count}. Please enter a number between 1 and ${count}.`
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    handlePagination({} as React.ChangeEvent<unknown>, pageNumber);
    setGoToPage('');
  };

  const handleGoToInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoToPage(event.target.value);
  };

  const handleGoToKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleGoToPage();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const selectOptions = itemsPerPageOptions.map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {/* Main pagination */}
      <Pagination
        variant="outlined"
        count={count}
        onChange={handlePagination}
        page={page}
        size="small"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              margin: '0 2px',
              fontSize: '14px',
              ...(item.type === 'previous' &&
                page === 1 && {
                  backgroundColor: 'var(--text-disabled)',
                  color: 'var(--text-secondary)',
                  pointerEvents: 'none',
                  cursor: 'not-allowed',
                }),
              ...(item.type === 'next' &&
                page === count && {
                  backgroundColor: 'var(--text-disabled)',
                  color: 'var(--text-secondary)',
                  pointerEvents: 'none',
                  cursor: 'not-allowed',
                }),
            }}
            disabled={
              (item.type === 'previous' && page === 1) || (item.type === 'next' && page === count)
            }
          />
        )}
        sx={{
          marginLeft: '16px',
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'var(--text-primary)',
            ':hover': {
              backgroundColor: 'var(--text-primary)',
            },
            color: 'var(--text-hint)',
          },
          '& .MuiPaginationItem-root': {
            fontSize: '14px',
          },
        }}
        {...props}
      />

      {showItemsPerPage && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontSize: '14px' }}>
            Rows/page
          </Typography>
          <Box>
            <CustomSelect
              options={selectOptions}
              value={itemsPerPage.toString()}
              onChange={handleItemsPerPageChange}
              multiple={false}
              showSearch={false}
              showAvatar={false}
              showIcon={false}
              showCheckbox={false}
              height={30}
              sx={{
                width: '100%',
                fontSize: '14px',
              }}
            />
          </Box>
        </Box>
      )}

      {/* Go to page */}
      {showGoTo && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontSize: '14px' }}>
            Go to
          </Typography>
          <Box sx={{ minWidth: 50 }}>
            <input
              placeholder={`e.g. ${Math.min(10, count)}`}
              type="number"
              value={goToPage}
              onChange={handleGoToInputChange}
              onKeyDown={handleGoToKeyDown}
              min={1}
              max={count}
              className="border-0 bodyMedium rounded-md bg-text-hint p-2 w-[80px] h-[28px] text-text-primary ring-1 ring-inset ring-text-secondary placeholder:text-text-secondary focus:ring-1 focus:ring-inset focus:ring-primary-main"
              style={{
                fontSize: '14px',
                padding: '.5rem',
              }}
            />
          </Box>
        </Box>
      )}
      <Toast
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default CutePagination;
