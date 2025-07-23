import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import ModTheme from '../../ThemeComponent/ModTheme';

export default function ButtonComponent(props) {
    const { label, height, width, textColor, hoverTextColor, buttonVariant, component, to, size, startIcon, position,
        bottom, type, onClick
     } = props;
    return (
        <ThemeProvider theme={ModTheme}>
            <Button
                type={type}
                onClick={onClick}
                bottom={bottom}
                position={position}
                component={component}
                to={to}
                fullWidth
                variant={buttonVariant}
                size={size}
                startIcon={startIcon}
                sx={{
                    color: textColor,
                    '&:hover': {
                        color: hoverTextColor,
                    },
                    height: height || 'auto',
                    width: width || '100%',
                    fontSize: 'clamp(12px, 1.1vw, 1rem)',
                    // '@media (min-width:200px)': {
                    //     fontSize: '0.6rem',
                    // },
                    // '@media (min-width:300px)': {
                    //     fontSize: '0.7rem',
                    // },
                    // '@media (min-width:400px)': {
                    //     fontSize: '0.7rem',
                    // },
                    // '@media (min-width:600px)': {
                    //     fontSize: '0.7rem',
                    // },
                    // '@media (min-width:960px)': {
                    //     fontSize: '0.8rem',
                    // },
                    // '@media (min-width:1280px)': {
                    //     fontSize:  '1rem',
                    // },
                }}
            >
                {label}
            </Button>
        </ThemeProvider>
    );
}
