import { Typography } from "@mui/material";

const PrintWord = ({ selectedWord }) => {
    return (
        <Typography
            component="span"
            sx={{
                color: "green",
                fontWeight: "bold",
                fontFamily: 'Courier New, Courier, monospace',
                mb: '1rem'
            }}
        >
            WORD:
            <Typography
                sx={{
                    color: "blue",
                    fontWeight: "bold",
                    fontFamily: 'Courier New, Courier, monospace',
                    display: 'inline'
                }}>
                {selectedWord.toUpperCase()}
            </Typography>
        </Typography>
    );
}

export default PrintWord;