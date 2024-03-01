import { Container, Button, Typography } from "@mui/material";
import { useState } from "react";

const WaitComponent = ({ handleJoinRoom, isUsernameTaken }) => {
    const [buttonDisabled, setButtonDisable] = useState(false);
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                mt: '5rem'
            }}>
            <Typography
                sx={{
                    fontSize: "2rem",
                    color: "#e41f1b",
                    my: "2rem",
                    fontFamily: 'fantasy'
                }}
            >
                Click to Play:
            </Typography>
            <Button
                onClick={() => { handleJoinRoom(); setButtonDisable(true); }}
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
                }}
                disabled={buttonDisabled}>
                {buttonDisabled ? 'Finding Game...' : 'Find Game'}

            </Button>
            <Typography
                sx={{
                    fontSize: "2rem",
                    color: "#e41f1b",
                    my: "2rem",
                    fontFamily: 'fantasy'
                }}
            >
                {isUsernameTaken && "User already in use. Please ensure that only one tab is open."}
            </Typography>
        </Container>
    );
}

export default WaitComponent;