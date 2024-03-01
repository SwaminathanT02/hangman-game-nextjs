import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from "next/router";
import { signIn } from "next-auth/react"
import GoogleSignIn from './googleSignIn';

const SignIn = () => {
    const router = useRouter();
    const defaultTheme = createTheme();
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordError, setpasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [buttonDisabled, setButtonDisable] = useState(false);
    const callbackUrl = router.query.callbackUrl || "/"; // Default to root if not provided
    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setButtonDisable(true);
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        if (!isValidEmail(email)) {
            setEmailError(true);
            setButtonDisable(false);
            setEmailErrorText("Invalid Email Address");
            return;
        }
        if (!password || password.length < 8) {
            setpasswordError(true);
            setButtonDisable(false);
            setPasswordErrorText((!password ? "Please enter a password." : "Password should contain a minimum of 8 characters."));
            return;
        }
        const result = await signIn("credentials", {
            redirect: false,
            Email: email,
            Password: password,
        });
        if (result?.error === "CredentialsSignin") {
            setEmailError(true);
            setButtonDisable(false);
            setEmailErrorText("Invalid email or password");
        } else if (result?.error === "Error: Illegal arguments: string, undefined") {
            setEmailError(true);
            setButtonDisable(false);
            setEmailErrorText("Email is registered with Google. Please use Google login.");
        } else if (result?.error) {
            setEmailError(true);
            setButtonDisable(false);
            setEmailErrorText("Something went wrong. Please try again later.");
        } else {
            setEmailError(false);
            setEmailErrorText("");
            router.push(callbackUrl);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container>
                <Grid item xs={12} md={6} >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ fontFamily: 'fantasy' }}>
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    error={emailError}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    helperText={emailErrorText}
                                    onChange={() => { setEmailError(false); setEmailErrorText("") }}
                                />
                                <TextField
                                    error={passwordError}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    helperText={passwordErrorText}
                                    onChange={() => { setpasswordError(false); setPasswordErrorText(""); }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={buttonDisabled}
                                >
                                    {buttonDisabled ? "Signing in..." : "Sign In"}
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
                <GoogleSignIn />
            </Grid>
        </ThemeProvider>
    );
}

export default SignIn;