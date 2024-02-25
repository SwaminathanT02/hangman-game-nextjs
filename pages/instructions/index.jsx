import React from 'react';
import { Container, Typography, Paper, Button, Box, Divider } from "@mui/material";

const Instructions = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2rem',
            }}
        >
            <Paper
                sx={{
                    width: { xs: '100%', md: '80%' },
                    padding: '2rem',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #E0E0E0 0%, #888888 100%)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'fantasy', fontWeight: 'bold', color: 'black' }}>
                    Hangman Game Instructions
                </Typography>
                <Container sx={{ display: 'flex' }}>
                    <Box sx={{
                        fontFamily: 'fantasy',
                        color: 'black',
                        maxWidth: { xs: '50%', md: '50%' },
                        px: { xs: '0.5rem', md: '1rem' },
                        fontSize: { xs: '0.8rem', md: '1rem' }
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'fantasy', fontWeight: 'bold', color: 'black', border: '1px solid black' }}>
                            1P Mode <br />
                        </Typography>
                        You will be given a word to guess. Each letter in the word is initially hidden. Try to guess the word by selecting letters. If you guess a correct letter, it will be revealed in the word. If you guess an incorrect letter, you will lose a try. The game ends when you either guess the word or run out of tries.                    </Box>
                    <Box sx={{
                        fontFamily: 'fantasy',
                        color: 'black',
                        maxWidth: { xs: '50%', md: '50%' },
                        px: { xs: '0.5rem', md: '1rem' },
                        fontSize: { xs: '0.8rem', md: '1rem' }
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'fantasy', fontWeight: 'bold', color: 'black', border: '1px solid black' }}>
                            2P Mode <br />
                        </Typography>
                        Instructions are similar to 1P mode in gameplay. <br />Race against your opponent in guessing the word correctly. If one of the players completes the game, it is game over for both. If both players have exhausted their tries, the player with more correct guesses wins.
                    </Box>
                </Container>
                <Typography
                    sx={{
                        fontFamily: 'fantasy',
                        border: '1px solid black',
                        fontWeight: 'bold',
                        width: { xs: '100%', md: '70%' },
                        margin: '1rem auto',
                        padding: '0.5rem 0.5rem',
                        fontSize: { xs: '0.9rem' }
                    }}>
                    Score: <br />
                    Correct Guess: + 5  <br />
                    Incorrect Guess: - 2
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    href="/"
                    sx={{
                        mt: '0.5rem',
                        mb: '1rem',
                        fontFamily: 'fantasy',
                        fontWeight: 'bold',
                        backgroundColor: "gray",
                        '&:hover': {
                            backgroundColor: "darkgray",
                        }
                    }}
                >
                    Start Playing
                </Button>
                <Typography variant="body1" sx={{ fontFamily: 'fantasy', color: 'black' }}>
                    Good luck and have fun playing Hangman!
                </Typography>
            </Paper>
        </Container>
    );
};

export default Instructions;
