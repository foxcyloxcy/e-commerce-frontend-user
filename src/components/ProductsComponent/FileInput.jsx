import React from 'react';
import { Button } from '@mui/material';

const FileInput = ({ onChange, multiple, maxFiles }) => {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
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
