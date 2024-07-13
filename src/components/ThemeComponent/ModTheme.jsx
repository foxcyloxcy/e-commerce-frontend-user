// theme.js
import { createTheme } from '@mui/material/styles';

const ModTheme = createTheme({
    palette: {
        background:{
            default: '#F5F5F2',
            paper: '#F5F5F2'
        },
        primary: {
            main: '#255773',
            light: '#5E97C3',
            dark: '#B8D4E6',
            contrastText: '#E3F2F7',
        },
        secondary: {
            main: '#606060',
            light: '#BDB6B0',
            dark: '#EAEAE7',
            contrastText: '#F5F5F2',
            background: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h1: {
            fontFamily: 'Playfair Display, serif',
            fontSize: '2rem',
            '@media (min-width:400px)': {
                fontSize: '2.5rem',
            },
            '@media (min-width:600px)': {
                fontSize: '3rem',
            },
            '@media (min-width:960px)': {
                fontSize: '3.5rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '4rem',
            },
        },
        body1: {
            fontSize: '0.75rem',
            '@media (min-width:400px)': {
                fontSize: '1rem',
            },
            '@media (min-width:600px)': {
                fontSize: '1.125rem',
            },
            '@media (min-width:960px)': {
                fontSize: '1.25rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '1.375rem',
            },
        },
        body2: {
            fontSize: '0.75rem',
            '@media (min-width:400px)': {
                fontSize: '0.875rem',
            },
            '@media (min-width:600px)': {
                fontSize: '1rem',
            },
            '@media (min-width:960px)': {
                fontSize: '1.125rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '1.25rem',
            },
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
    },
});

export default ModTheme;