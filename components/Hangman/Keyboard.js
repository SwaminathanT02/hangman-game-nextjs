import { Button, Container } from "@mui/material";

// --- KEYBOARD FUNCTION ---
const Keyboard = ({ handleGuess, gameOver, guessedLetters }) => {

    return (
        <Container
            sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: { xs: "0.5rem", md: "1rem" },
                justifyContent: "center",
                maxWidth: { xs: "100%", md: '75%' }
            }}>
            {Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index)).map((letter, index) => (
                <Button
                    key={letter}
                    onClick={() => handleGuess(letter.toLowerCase())}
                    disabled={gameOver}
                    sx={{
                        fontSize: { xs: "0.6rem", md: "0.8rem" },
                        padding: { xs: "0.5rem 0.1rem", md: "1rem 0.7rem" },
                        backgroundColor: guessedLetters.has(letter.toLowerCase()) ? "darkgray" : "white",
                        color: "black",
                        border: "2px solid black",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                        fontFamily: 'monospace',
                        fontWeight: '900',
                        boxShadow: "12px 12px 4px rgba(0, 0, 0, 0.3)",
                        '&:hover': {
                            backgroundColor: 'darkgray'
                        }
                    }}
                >
                    {letter.toUpperCase()}
                </Button>
            ))}
        </Container>
    );
};

export default Keyboard;