import { Box } from "@mui/material";
import React, { useState, useEffect } from 'react';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';

const IconDisplay = ({ iconArray }) => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIconIndex((prevIndex) => (prevIndex + 1) % iconArray.length);
        }, 100); // Change the interval duration as needed (in milliseconds)

        return () => clearInterval(intervalId);
    }, [iconArray]);

    return (
        <Box>
            {iconArray[currentIconIndex]}
        </Box>
    );
};


const LoadingComponent = () => {
    const iconArray = [
        <SentimentVerySatisfiedIcon style={{ width: '3rem', height: '3rem' }} />,
        <SentimentSatisfiedAltIcon style={{ width: '3rem', height: '3rem' }} />,
        <SentimentSatisfiedIcon style={{ width: '3rem', height: '3rem' }} />,
        <SentimentDissatisfiedIcon style={{ width: '3rem', height: '3rem' }} />,
        <SentimentVeryDissatisfiedIcon style={{ width: '3rem', height: '3rem' }} />,
        <MoodBadIcon style={{ width: '3rem', height: '3rem' }} />,
    ];
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '80vh',
        }}>
            <IconDisplay iconArray={iconArray} />
        </Box>
    );
}

export default LoadingComponent;