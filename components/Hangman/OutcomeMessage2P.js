import { Container } from "@mui/material";
import Meaning from "./Meaning";
import PrintWord from "./PrintWord";
import ScoreboardDisplay from "./Components/ScoreBoardComponent";

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
const OutcomeMessage2P = ({ selectedWord, wordMeanings, winner, scoreboard, username }) => (
    <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: "2rem",
            color: "#e41f1b",
            my: "2rem",
            fontFamily: 'fantasy',
            alignItems: 'center'
        }}>
        {username === winner ? 'YOU WIN!' : winner === 'Tie' ? 'IT IS A TIE!' : 'YOU LOSE!'}
        <PrintWordAndMeaning selectedWord={selectedWord} wordMeanings={wordMeanings} />
        <ScoreboardDisplay scoreboard={scoreboard} username={username} />
    </Container>

);

export default OutcomeMessage2P;