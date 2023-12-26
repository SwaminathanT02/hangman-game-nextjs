import { Container } from "@mui/material";

const ContainerComponent = ({ children }) => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
                alignItems: 'center'
            }}
        >
            {children}
        </Container>
    );
};

export default ContainerComponent;
