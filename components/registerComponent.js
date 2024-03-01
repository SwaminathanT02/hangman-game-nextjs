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
import GoogleSignIn from './googleSignIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';

const SignUp = () => {
    const router = useRouter();
    const defaultTheme = createTheme();
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameErrorText, setFirstNameErrorText] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameErrorText, setLastNameErrorText] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordError, setpasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [buttonDisabled, setButtonDisable] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };
    const isValidName = (name) => {
        const nameRegex = /^[a-zA-Z]+$/; // Allow only alphabets
        return nameRegex.test(name);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setButtonDisable(true);
        const data = new FormData(event.currentTarget);
        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        const email = data.get('email');
        const password = data.get('password');
        if (!firstName || !isValidName(firstName)) {
            setFirstNameError(true);
            setButtonDisable(false);
            setFirstNameErrorText((!firstName ? "First Name cannot be Empty" : "First Name should contain alphabetical characters only."));
            return;
        }
        if (!lastName || !isValidName(lastName)) {
            setLastNameError(true);
            setButtonDisable(false);
            setLastNameErrorText((!lastName ? "Last Name cannot be empty" : "Last Name should contain alphabetical characters only."));
            return;
        }
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
        const Fullname = firstName + ' ' + lastName;
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Fullname: Fullname,
                    Email: email,
                    Password: password,
                }),
            });
            if (res.status === 400) {
                setEmailError(true);
                setButtonDisable(false);
                setEmailErrorText("Email is already registered with us.")
            }
            if (res.status === 200) {
                router.push("/login");
            }
        } catch (error) {
            setEmailError(true);
            setButtonDisable(false);
            setEmailErrorText("Something went wrong. Try again!")
            console.log(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container maxWidth="xs">
                <Grid item xs={12} md={6} >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ fontFamily: 'fantasy' }}>
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={firstNameError}
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            helperText={firstNameErrorText}
                                            onChange={() => { setFirstNameError(false); setFirstNameErrorText("") }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={lastNameError}
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                            helperText={lastNameErrorText}
                                            onChange={() => { setLastNameError(false); setLastNameErrorText("") }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={emailError}
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            helperText={emailErrorText}
                                            onChange={() => { setEmailError(false); setEmailErrorText("") }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={passwordError}
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            helperText={passwordErrorText}
                                            onChange={() => { setpasswordError(false); setPasswordErrorText(""); }}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={buttonDisabled}
                                >
                                    {buttonDisabled ? 'Signing up...' : 'Sign Up'}
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
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

export default SignUp;