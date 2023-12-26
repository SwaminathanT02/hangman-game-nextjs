import { Container, Typography } from "@mui/material";

const PrintWordMeaning = ({ meaningComponent, color }) => {
    return (
        <Typography
            sx={{
                color: { color },
                fontWeight: "bold",
                fontFamily: 'Courier New, Courier, monospace'
            }}>
            {meaningComponent.toUpperCase()}
        </Typography>
    );
}

// --- MEANING COMPONENT ---
const Meaning = ({ wordMeanings }) => (
    <Container>
        {wordMeanings.map((meaning, index) => (
            <Container>
                <PrintWordMeaning key={index} meaningComponent={meaning.partOfSpeech} color={'green'} />
                <PrintWordMeaning key={`${index}.1`} meaningComponent={meaning.definitions[0]?.definition} color={'blue'} />
            </Container>
        ))}
    </Container>
);

export default Meaning;