import OutcomeMessage2P from "../../components/Hangman/OutcomeMessage2P";
import { Button, Container, Typography } from "@mui/material";

const buttonSx = {
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
};

// --- GAMEOUTCOME FUNCTION ---
const GameOutcome2P = ({ selectedWord, gameOver, wordMeanings, resetGame, goWait, playAgainDis, winner, scoreboard, username }) => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                my: "2rem"
            }}>
            {gameOver &&
                goWait ? (
                <Typography
                    sx={{
                        fontSize: "1.5rem",
                        color: 'blue',
                        my: "2rem",
                        fontFamily: 'fantasy'
                    }}
                >
                    Waiting for the other player to complete...
                </Typography>)
                :
                (
                    <Container>
                        <Button
                            onClick={() => {
                                resetGame();
                            }}
                            sx={buttonSx}
                            disabled={playAgainDis}>
                            {playAgainDis ? "Waiting for other player to vote..." : "Play Again (Vote)"}
                        </Button>
                        <OutcomeMessage2P selectedWord={selectedWord} wordMeanings={wordMeanings} winner={winner} scoreboard={scoreboard} username={username} />
                    </Container>
                )}
        </Container>
    );
}

export default GameOutcome2P;