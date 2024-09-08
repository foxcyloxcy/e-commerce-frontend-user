import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isSaveDisabled =
    !currentPassword || !newPassword || !confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle password change logic here
    console.log('Password changed!');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, margin: '0 auto', mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>
      <TextField
        label="Current Password"
        type="password"
        fullWidth
        margin="normal"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <TextField
        label="New Password"
        type="password"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        label="Confirm New Password"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSaveDisabled}
        sx={{ mt: 2 }}
      >
        Save
      </Button>
    </Box>
  );
};

export default ChangePassword;
