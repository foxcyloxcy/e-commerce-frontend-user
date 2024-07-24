import { createTheme } from '@mui/material/styles';

const ModTheme = createTheme({
    palette: {
        background:{
            default: '#F5F5F2',
            paper: '#F5F5F2'
        },
        primary: {
            main: '#255773', // deep teal
            light: '#5E97C3', // azul
            dark: '#B8D4E6', // baby blue
            contrastText: '#E3F2F7', // sky blue
        },
        secondary: {
            main: '#606060', //charcoal
            light: '#BDB6B0', //stone
            dark: '#EAEAE7', // medium gray
            contrastText: '#F5F5F2', // light gray
            background: '#FFFFFF', //white
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h1: {
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.25rem',
            '@media (min-width:400px)': {
                fontSize: '1.75rem',
            },
            '@media (min-width:600px)': {
                fontSize: '2.25rem',
            },
            '@media (min-width:960px)': {
                fontSize: '2.75rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '3.25rem',
            },
        },
        h2: {
            fontFamily: 'Playfair Display, serif',
            fontSize: '1rem',
            '@media (min-width:400px)': {
                fontSize: '1.5rem',
            },
            '@media (min-width:600px)': {
                fontSize: '2rem',
            },
            '@media (min-width:960px)': {
                fontSize: '2.5rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '3rem',
            },
        },
        h3: {
            fontFamily: 'Playfair Display, serif',
            fontSize: '0.875rem',
            '@media (min-width:400px)': {
                fontSize: '1.25rem',
            },
            '@media (min-width:600px)': {
                fontSize: '1.75rem',
            },
            '@media (min-width:960px)': {
                fontSize: '2.25rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '2.75rem',
            },
        },
        h4: {
            fontFamily: 'Playfair Display, serif',
            fontSize: '0.75rem',
            '@media (min-width:400px)': {
                fontSize: '1rem',
            },
            '@media (min-width:600px)': {
                fontSize: '1.5rem',
            },
            '@media (min-width:960px)': {
                fontSize: '2rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '2.5rem',
            },
        },
        h5: {
            fontFamily: 'Playfair Display, serif',
            fontSize: '0.625rem',
            '@media (min-width:400px)': {
                fontSize: '0.875rem',
            },
            '@media (min-width:600px)': {
                fontSize: '1.25rem',
            },
            '@media (min-width:960px)': {
                fontSize: '1.75rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '2.25rem',
            },
        },
        h6: {
            fontFamily: 'Playfair Display, serif',
            fontSize: '0.7rem',
            '@media (min-width:400px)': {
                fontSize: '0.75rem',
            },
            '@media (min-width:600px)': {
                fontSize: '1rem',
            },
            '@media (min-width:960px)': {
                fontSize: '1.25rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '1.5rem',
            },
        },
        body1: {
            fontSize: '0.625rem',
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
        body2: {
            fontSize: '0.6rem',
            '@media (min-width:400px)': {
                fontSize: '0.625rem',
            },
            '@media (min-width:600px)': {
                fontSize: '0.75rem',
            },
            '@media (min-width:960px)': {
                fontSize: '0.875rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '1rem',
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