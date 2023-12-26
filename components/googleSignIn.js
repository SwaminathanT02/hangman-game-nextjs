import { Divider, Chip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react"
import { useRouter } from "next/router";


const GoogleSignIn = () => {
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
                    sx={{ mb: 2 }}>
                    Other Sign-in Options:
                </Typography>
                <Button
                    onClick={() => signIn("google", { callbackUrl: callbackUrl })}
                    sx={{
                        display: 'flex',
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        color: "white",
                        backgroundColor: "red",
                        fontSize: "0.75em",
                        fontWeight: "900",
                        px: 2,
                        py: 1,
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'darkred', // Change the color on hover
                        }
                    }}>
                    Sign-in with <GoogleIcon sx={{ ml: 0.5, fontSize: "1.2em" }} />
                </Button>
            </Grid>
        </>);
};

export default GoogleSignIn;