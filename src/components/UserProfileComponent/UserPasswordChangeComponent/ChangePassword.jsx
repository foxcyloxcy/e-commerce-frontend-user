import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment, ThemeProvider } from '@mui/material';
import ModTheme from '../../ThemeComponent/ModTheme';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isSaveDisabled = !currentPassword || !newPassword || !confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle password change logic here
    console.log('Password changed!');
  };

  return (
    <ThemeProvider theme={ModTheme}>
          <Box component="form" onSubmit={handleSubmit} sx={{ ml: 5, mt: 4 }}>
      <TextField
        label="Current Password"
        type={showCurrentPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        size="small"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                edge="end"
              >
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="New Password"
        type={showNewPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        size="small"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowNewPassword(!showNewPassword)}
                edge="end"
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm New Password"
        type={showConfirmPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        size="small"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
    </ThemeProvider>
  );
};

export default ChangePassword;
