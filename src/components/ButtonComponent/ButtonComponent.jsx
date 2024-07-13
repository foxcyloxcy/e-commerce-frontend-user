// ButtonComponent.js
import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import ModTheme from '../ThemeComponent/ModTheme';

export default function ButtonComponent(props) {
    const { label, height, width, textColor, hoverTextColor, buttonVariant } = props;

    return (
        <ThemeProvider theme={ModTheme}>
            <Button
                fullWidth
                variant={buttonVariant}
                sx={{ 
                    mt: 3, 
                    mb: 2,
                    color: textColor,
                    '&:hover': {
                        color: hoverTextColor,
                    },
                    height: height || 'auto',
                    width: width || '100%',
                }}
            >
                {label}
            </Button>
        </ThemeProvider>
    );
}
