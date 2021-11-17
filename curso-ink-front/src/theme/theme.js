import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#63a4ff',
            main: '#6100AE',
            dark: '#8108E1',
            contrastText: '#ecfad8'
        },
        delete: {
            light: '#63a4ff',
            main: '#F4CF00',
            dark: '#8108E1',
            contrastText: '#ecfad8'
        }
    }
});

export default theme;