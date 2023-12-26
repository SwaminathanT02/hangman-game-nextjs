import OutcomeMessage from "../../components/Hangman/OutcomeMessage";
import Meaning from "../../components/Hangman/Meaning";
import { Button, Container } from "@mui/material";
import { useRouter } from 'next/router';


// --- GAMEOUTCOME FUNCTION ---
const GameOutcome = ({ mistakes, selectedWord, gameOver, wordMeanings, resetGame, totalTries }) => {
    const router = useRouter();
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                my: "2rem"
            }}>
            {gameOver && (
                <Container>
                    <Button
                        onClick={() => {
                            resetGame();
                        }}
                        sx={{
                            fontSize: "1rem",
                            padding: "0.8rem 1.5rem",
                            backgroundColor: "darkgray",
                            color: "black",
                            fontWeight: '900',
                            border: "1px solid black",
                            borderRadius: "1rem",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                            fontFamily: 'fantasy',
                            boxShadow: "6px 6px 4px rgba(0, 0, 0, 0.3)",
                            '&:hover': {
                                backgroundColor: 'gray'
                            }
                        }}>
                        Play Again
                    </Button>
                    <OutcomeMessage mistakes={mistakes} selectedWord={selectedWord} gameOver={gameOver} totalTries={totalTries} wordMeanings={wordMeanings} />
                </Container>
            )}
        </Container>
    );
}

export default GameOutcome;