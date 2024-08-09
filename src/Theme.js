import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#262626",
        },
        secondary: {
            main: "#00A3FF",
        },
        other: {
            main: 'ffffff'
        }
    },
    typography: {
        h1: {
            fontWeight: 400,
        },
        h3: {
            fontWeight: 300,
        },
        h4: {
            fontWeight: 300,
        },
    },
});