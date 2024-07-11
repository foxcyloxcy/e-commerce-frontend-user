// ButtonComponent.js
import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import ModTheme from '../ThemeComponent/ModTheme';

export default function ButtonComponent(props) {
    console.log(ModTheme)
    return (
        <ThemeProvider theme={ModTheme}>
            <Button
                fullWidth
                variant="contained"
                sx={{ 
                    mt: 3, 
                    mb: 2,
                    color: 'primary.contrastText',
                    '&:hover': {
                        color: 'secondary.main',
                    },
                }}
            >
                {props.label}
            </Button>
        </ThemeProvider>
    );
}

