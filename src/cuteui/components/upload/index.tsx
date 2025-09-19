import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, IconButton, Typography, Tooltip, Grid } from '@mui/material';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

import { cn } from '@/cuteui/lib/cn';
import CheckCircle from '@public/components/check-circle.svg';
import UploadFile from '@public/components/upload.svg';

interface uploadProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  content?: string;
  classname?: string;
  onError?: (message: string) => void;
  allowedExtensions: string[];
}

export const Upload = ({
  file,
  setFile,
  content = 'Upload content',
  classname,
  onError,
  allowedExtensions,
}: uploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to validate file extension
  const isValidFileType = (fileName: string): boolean => {
    const fileExtension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    return allowedExtensions.includes(fileExtension);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (isValidFileType(selectedFile.name)) {
        setFile(selectedFile);
        setError(null); // Clear any previous errors
      } else {
        const errorMessage = `Invalid file type. Only ${allowedExtensions.join(', ')} files are allowed.`;
        setError(errorMessage);
        onError?.(errorMessage); // Call optional error callback

        // Clear the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleRemoveClick = () => {
    setFile(null);
    setError(null); // Clear error when removing file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const truncateFileName = (fileName: string, maxLength: number) => {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    const separator = '...';
    const sepLength = separator.length;
    const charsToShow = maxLength - sepLength;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return `${fileName.substr(0, frontChars)}${separator}${fileName.substr(fileName.length - backChars)}`;
  };

  return (
    <Box>
      <Box
        className={cn(
          'border rounded-md p-2 flex items-center justify-between w-[10.93rem] h-[2.75rem]',
          error ? 'border-red-500' : 'border-primary-main',
          classname
        )}
      >
        {file ? (
          <>
            <Box className="flex items-center">
              <Image src={CheckCircle} alt="check-circle" className="m-1 w-[22px] h-[22px]" />
              <Tooltip title={file.name} arrow>
                <Typography className="text-primary-main pl-1">
                  {truncateFileName(file.name, content.length - 2)}
                </Typography>
              </Tooltip>
            </Box>
            <IconButton onClick={handleRemoveClick}>
              <CancelIcon className="text-text-secondary" />
            </IconButton>
          </>
        ) : (
          <Grid className="flex items-center justify-center h-full w-full">
            <Button
              onClick={handleUploadClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                color: 'var(--primary-main)',
                textTransform: 'none',
              }}
            >
              <Image src={UploadFile} alt="upload" className="w-[22px] h-[22px]" />
              <Typography variant="bodyMedium">{content}</Typography>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".pdf,.png,.txt"
              onChange={handleFileChange}
            />
          </Grid>
        )}
      </Box>
      {error && (
        <Typography variant="caption" className="text-red-500 mt-1 text-xs">
          {error}
        </Typography>
      )}
    </Box>
  );
};
