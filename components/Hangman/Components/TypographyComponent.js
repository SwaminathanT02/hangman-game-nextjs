import { Typography } from "@mui/material";

const TypographyComponent = ({ children, color, sxExtra }) => {
    return (
        <Typography
            sx={{
                color: { color },
                fontWeight: 'bold',
                fontFamily: 'Courier New, Courier, monospace',
                ...sxExtra
            }}>
            {children}
        </Typography>
    );
}

export default TypographyComponent;