import { Divider, Chip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { useState } from 'react';


const GoogleSignIn = () => {
    const [buttonDisabled, setButtonDisable] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const callbackUrl = router.query.callbackUrl || "/"; // Default to root if not provided
    return (
        <>
            {!isSmallScreen &&
                (<Divider
                    orientation='vertical'
                    flexItem
                    sx={{ mt: 15 }}>
                    <Chip label="OR" />
                </Divider>)}
            <Grid item xs={12} md={4}
                sx={{
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                }}>
                <Typography
                    component="h2"
                    variant="h6"
                    sx={{ mb: 2, fontFamily: 'fantasy' }}>
                    Other Sign-in Options:
                </Typography>
                <Button
                    onClick={() => { signIn("google", { callbackUrl: callbackUrl }); setButtonDisable(true); }}
                    sx={{
                        display: 'flex',
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        color: 'black',
                        backgroundColor: "white",
                        fontSize: "0.75em",
                        fontWeight: "900",
                        padding: '0.5rem 1rem',
                        border: '1px solid black',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'lightgray', // Change the color on hover
                        }
                    }}
                    disabled={buttonDisabled}>
                    {buttonDisabled ? (<>Signing in... <GoogleIcon sx={{ ml: 1, fontSize: "2em", color: 'red' }} /></>) : (<>Sign-in with <GoogleIcon sx={{ ml: 1, fontSize: "2em", color: 'red' }} /></>)}
                </Button>
            </Grid>
        </>);
};

export default GoogleSignIn;