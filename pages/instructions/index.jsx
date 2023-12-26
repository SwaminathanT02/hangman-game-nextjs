import { Container, Typography, Paper, List, ListItem, Button } from "@mui/material";

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
                <Typography variant="h3" gutterBottom sx={{ fontFamily: 'fantasy', fontWeight: 'bold', color: 'black' }}>
                    Hangman Game Instructions
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'fantasy', color: 'black' }}>
                    Welcome to the Hangman game! Here are the instructions to play:
                </Typography>
                <List sx={{ fontFamily: 'fantasy', color: 'black' }}>
                    <ListItem>
                        <Typography variant="body1" paragraph sx={{ fontFamily: 'fantasy' }}>
                            1. You will be given a word to guess.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" paragraph sx={{ fontFamily: 'fantasy' }}>
                            2. Each letter in the word is initially hidden.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" paragraph sx={{ fontFamily: 'fantasy' }}>
                            3. Try to guess the word by selecting letters.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" paragraph sx={{ fontFamily: 'fantasy' }}>
                            4. If you guess a correct letter, it will be revealed in the word.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" paragraph sx={{ fontFamily: 'fantasy' }}>
                            5. If you guess an incorrect letter, you will lose a try.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" paragraph sx={{ fontFamily: 'fantasy' }}>
                            6. The game ends when you either guess the word or run out of tries.
                        </Typography>
                    </ListItem>
                </List>
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
