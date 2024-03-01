import { Button, Box, Divider } from "@mui/material";

const buttonStyle = {
    backgroundColor: 'darkgray',
    borderRadius: '100px',
    cursor: 'pointer',
    border: '1px solid',
    boxShadow: '10px 10px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    ':hover': {
        backgroundColor: 'gray',
        transform: 'scale(1.1)'
    },
    ':active': {
        transform: 'scale(0.9)',
    },
    padding: '10px 20px',
    fontSize: { xs: '1rem', md: '1.5rem' },
    fontFamily: 'fantasy',
    color: 'black',
};

const PlayButton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            <Divider />
            <Button sx={buttonStyle} href="/hangman">
                1 PLAYER MODE
            </Button>
            <Button sx={buttonStyle} href="/hangman-2p">
                2 PLAYER MODE
            </Button>
            <Divider />
            <Button
                sx={{
                    ...buttonStyle,
                    animation: 'shake 2s ease-in-out infinite',
                    '@keyframes shake': {
                        '0%, 25%': {
                            transform: 'rotate(0deg)'
                        },
                        '5%, 15%': {
                            transform: 'rotate(-2.5deg)'
                        },
                        '10%, 20%': {
                            transform: 'rotate(2.5deg)'
                        }
                    },
                }}
                href="/instructions">
                Instructions
            </Button>
        </Box>
    );
};

export default PlayButton;
