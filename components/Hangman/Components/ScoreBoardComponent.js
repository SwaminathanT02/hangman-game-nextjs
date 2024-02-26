import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const cellSx = { fontFamily: 'fantasy', fontWeight: 'bold' };

const ScoreboardDisplay = ({ scoreboard, username, blink = false }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                maxWidth: { xs: '100%', sm: '80%', md: '60%' }, mt: '2rem'
            }}>
            <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'gray' }}>
                    <TableRow>
                        <TableCell sx={cellSx}>Player</TableCell>
                        <TableCell sx={cellSx}>Correct Guesses</TableCell>
                        <TableCell sx={cellSx}>Remaining Tries</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scoreboard.map((score) => (
                        <TableRow
                            key={score.name}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                backgroundColor: `${score.username === username && 'lightgray'}`
                            }}
                        >
                            <TableCell component="th" scope="row" sx={cellSx}>
                                {score.username === username && '(You) '}{score.username}
                            </TableCell>
                            <TableCell sx={cellSx}>{score.score.correctGuesses}</TableCell>
                            <TableCell sx={{ ...cellSx, color: `${blink && score.username === username && 'red'}` }}>{score.score.remainingTries}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ScoreboardDisplay;