import { Container, Typography } from "@mui/material";

// --- WORD DISPLAY ---
// word
const WordDisplay = ({ guessedWord, correctGuessIndexes }) => {
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: '0.7rem',
                my: '2rem'
            }}>
            {guessedWord.map((letter, index) => (
                <Typography component='span' key={index}
                    sx={{
                        fontSize: { xs: "1rem", md: "2rem" },
                        padding: '0.5rem 1rem',
                        animation: correctGuessIndexes.includes(index) && 'bounce 0.5s ease-in-out',
                        '@keyframes bounce': {
                            '0%, 20%, 50%, 80%, 100%': {
                                transform: 'translateY(0)',
                            },
                            '40%': {
                                transform: 'translateY(-30px)',
                            },
                            '60%': {
                                transform: 'translateY(-15px)',
                            },
                        },
                        border: '0.1rem solid black',
                        borderRadius: '1rem',
                        boxShadow: "6px 6px 4px rgba(0, 0, 0, 0.3)"
                    }}>
                    {letter.toUpperCase()}
                </Typography>
            ))}
        </Container>
    );
};

export default WordDisplay;