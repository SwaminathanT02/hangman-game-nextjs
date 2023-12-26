import { Container, Typography, Paper, Button } from "@mui/material";

const Instructions = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '2rem',
            }}
        >
            <Paper
                sx={{
                    width: '70%',
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
                <Typography sx={{
                    fontFamily: 'fantasy',
                    color: 'black',
                }}>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        You will be given a word to guess.
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        Each letter in the word is initially hidden.
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        Try to guess the word by selecting letters.
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        If you guess a correct letter, it will be revealed in the word.
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        If you guess an incorrect letter, you will lose a try.
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        The game ends when you either guess the word or run out of tries.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: 'fantasy',
                            border: '1px solid black',
                            fontWeight: 'bold',
                            width: '50%',
                            margin: '1rem auto'
                        }}>
                        Correct Guess: Score + 5 <br />
                        Incorrect Guess: Score - 2
                    </Typography>
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'fantasy', color: 'black' }}>
                    Good luck and have fun playing Hangman!
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    href="/hangman"
                    sx={{
                        marginTop: '1rem',
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
            </Paper>
        </Container>
    );
};

export default Instructions;
