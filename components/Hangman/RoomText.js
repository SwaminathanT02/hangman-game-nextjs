import { Button, Typography, Container } from "@mui/material";

const RoomText = ({ handleLeaveRoom, text, color }) => {
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            mt: '5rem',
        }}>
            <Typography
                sx={{
                    fontSize: { xs: '1.2rem', md: "1.5rem" },
                    color: `${color}`,
                    my: "2rem",
                    fontFamily: 'fantasy'
                }}
            >
                {text}
            </Typography>
            <Button
                onClick={handleLeaveRoom}
                sx={{
                    fontSize: { xs: '0.9rem', md: "1rem" },
                    padding: { xs: "0.7rem 1.3rem", md: "0.8rem 1.5rem" },
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
                }}
            >
                Leave Room
            </Button>
        </Container>
    );
}

export default RoomText;