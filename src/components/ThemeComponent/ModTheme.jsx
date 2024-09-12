import { createTheme } from '@mui/material/styles';

const ModTheme = createTheme({
    palette: {
        background: {
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
            main: '#606060', // charcoal
            light: '#BDB6B0', // stone
            dark: '#EAEAE7', // medium gray
            contrastText: '#F5F5F2', // light gray
            background: '#FFFFFF', // white
        },
        text: {
            primary: '#606060',
            secondary: '#255773',
            disabled: "rgba(0, 0, 0, 0.38)"
        }
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h1: {
            fontFamily: 'Playfair Display, serif',
        },
        h2: {
            fontFamily: 'Playfair Display, serif',
        },
        h3: {
            fontFamily: 'Playfair Display, serif',
        },
        h4: {
            fontFamily: 'Playfair Display, serif',
        },
        h5: {
            fontFamily: 'Playfair Display, serif',
        },
        h6: {
            fontFamily: 'Playfair Display, serif',
        },
        body1: {
            fontSize: '1rem', // 16px for all screen sizes
        },
        body2: {
            fontSize: '1rem', // 16px for all screen sizes
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
