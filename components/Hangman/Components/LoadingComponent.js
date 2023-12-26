import { Box, CircularProgress } from "@mui/material";


const LoadingComponent = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '80vh',
        }}>
            <CircularProgress />
        </Box>
    );
}

export default LoadingComponent;