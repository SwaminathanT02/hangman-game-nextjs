import { getSession } from "next-auth/react";
import { Paper, TableContainer, TableHead, TableBody, Table, TableRow, TableCell, Container } from "@mui/material";

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/login?callbackUrl=%2Fprotected",
            }
        };
    }

    // Fetch top scorers from your API
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/get-leaderboard`);
    const topScorers = await response.json();

    return {
        props: {
            user: session.user,
            topScorers,
        },
    };
};

const Leaderboard = ({ topScorers }) => {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh'
            }}>
            <Paper sx={{
                width: '70%',
                mt: '1rem'
            }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={1} sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    Rank
                                </TableCell>
                                <TableCell align="center" colSpan={2} sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    Player
                                </TableCell>
                                <TableCell align="center" colSpan={3} sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    Score
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {topScorers.map((player) => (
                                <TableRow key={player.rank}>
                                    <TableCell align="center">{player.rank}</TableCell>
                                    <TableCell align="center" colSpan={2}>{player.player}</TableCell>
                                    <TableCell align="center" colSpan={3}>{player.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default Leaderboard;
