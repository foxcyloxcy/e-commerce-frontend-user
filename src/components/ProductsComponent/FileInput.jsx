import React from 'react';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

const FileInput = ({ onChange, multiple, maxFiles }) => {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate number of files
    if (files.length > maxFiles) {
      Swal.fire({
        icon: 'warning',
        title: 'Too many files',
        text: `You can only upload up to ${maxFiles} image files.`,
      });
      return;
    }

    // Validate file types (images only)
    const invalidFiles = files.filter(
      (file) => !file.type.startsWith('image/')
    );

    if (invalidFiles.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file type',
        text: 'Only image files are allowed (e.g., .jpg, .png, .jpeg, .gif).',
      });
      return;
    }

    onChange(files);
  };

  return (
    <Button variant="contained" component="label">
      Upload Images (max {maxFiles})
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        onChange={handleChange}
      />
    </Button>
  );
};

export default FileInput;
