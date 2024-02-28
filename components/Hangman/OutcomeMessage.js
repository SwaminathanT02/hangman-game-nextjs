import { Container } from "@mui/material";
import Meaning from "./Meaning";
import PrintWord from "./PrintWord";

const PrintWordAndMeaning = ({ selectedWord, wordMeanings }) => {
    return (
        <Container
            sx={{
                mt: '1rem',
                py: '0.5rem',
                border: '1px solid black',
                boxShadow: "6px 6px 4px rgba(0, 0, 0, 0.3)",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                textAlign: "center",
                maxWidth: { xs: '100vw', sm: '60vw', md: '40vw' }

            }}>
            <PrintWord selectedWord={selectedWord} />
            {wordMeanings && <Meaning wordMeanings={wordMeanings} />}
        </Container>
    );
}

// --- OUTCOME MESSAGE COMPONENT ---
const OutcomeMessage = ({ mistakes, selectedWord, gameOver, totalTries, wordMeanings }) => (
    <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: "2rem",
            color: "#e41f1b",
            my: "2rem",
            fontFamily: 'fantasy'
        }}>
        {gameOver ? (
            mistakes === totalTries ? (
                <>
                    Game Over!
                    <PrintWordAndMeaning selectedWord={selectedWord} wordMeanings={wordMeanings} />
                </>
            ) : (
                <>
                    Congratulations! You guessed the word right!
                    <PrintWordAndMeaning selectedWord={selectedWord} wordMeanings={wordMeanings} />
                </>
            )
        ) : null}
    </Container>
);

export default OutcomeMessage;