import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment, ThemeProvider } from '@mui/material';
import ModTheme from '../../ThemeComponent/ModTheme';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../../../assets/baseURL/api';
import Swal from 'sweetalert2';

const ChangePassword = (props) => {
  const { userToken } = props;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isSaveDisabled = !newPassword || !confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `/api/auth/me/change-password?password=${newPassword}&password_confirmation=${confirmPassword}`;
      const res = await api.put(url, {}, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        const successMessage = res.data.message
        Swal.fire({
          title: successMessage,
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: ModTheme.palette.primary.main,
        })
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      console.log("Error saving profile data:", error);

      if(error.response.data.message.password){
        const errorMessage = error.response.data.message.password[0]
        Swal.fire({
          title: errorMessage,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: ModTheme.palette.primary.main,
        })
      }
    }
  };


  return (
    <ThemeProvider theme={ModTheme}>
      <Box component="form" onSubmit={handleSubmit} sx={{ ml: 5, mt: 4 }}>
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
