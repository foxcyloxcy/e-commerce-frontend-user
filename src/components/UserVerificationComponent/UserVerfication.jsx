import React, { useState } from 'react';
import { TextField, Box, Grid } from '@mui/material';

const UserVerification = () => {
  const [code, setCode] = useState(Array(6).fill(''));

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    // Move to the next input field
    if (e.target.value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`verification-code-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Grid container spacing={2} justifyContent="center">
        {code.map((digit, index) => (
          <Grid item key={index}>
            <TextField
              id={`verification-code-${index}`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              inputProps={{ maxLength: 1 }}
              sx={{
                width: { xs: '40px', sm: '50px', md: '60px', lg: '70px' },
                height: { xs: '40px', sm: '50px', md: '60px', lg: '70px' },
                textAlign: 'center',
                fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '32px' }
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserVerification;
