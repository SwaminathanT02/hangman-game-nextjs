import { Button, Box } from "@mui/material";

const buttonStyle = {
    backgroundColor: 'darkgray',
    borderRadius: '100px',
    cursor: 'pointer',
    border: '1px solid',
    boxShadow: '10px 10px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    ':hover': {
        backgroundColor: 'gray',
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
                gap: '20px',
            }}
        >
            <Button sx={buttonStyle} href="/hangman">
                CLICK TO PLAY
            </Button>
            <Button sx={buttonStyle} href="/instructions">
                Instructions
            </Button>
        </Box>
    );
};

export default PlayButton;
