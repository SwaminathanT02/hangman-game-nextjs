import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';

function Copyright() {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
                {'Copyright © '}
                <Link color="inherit" href="https://hangman-game-delta-ochre.vercel.app/">
                    HangMan
                </Link>{' '}
                {new Date().getFullYear()}

            </Typography>
            <Box>
                <Link href="https://www.linkedin.com/in/swamit02/">
                    <LinkedInIcon sx={{ color: 'gray' }}></LinkedInIcon>
                </Link>
                <Link href="mailto:swaminathant02@gmail.com" sx={{ mx: '0.2em' }}>
                    <EmailIcon sx={{ color: 'gray' }}></EmailIcon>
                </Link>
                <Link href="https://swaminathant02.github.io/my-website/">
                    <LanguageIcon sx={{ color: 'gray' }}></LanguageIcon>
                </Link>
            </Box>
        </Container>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <CssBaseline />
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 1,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                    }}
                >
                    <Container>
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}