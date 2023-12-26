import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const Title = ({ rotateX, rotateY }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                rotateX,
                rotateY,
            }}>
            <Typography
                variant="h1"
                sx={{
                    fontSize: { xs: '4rem', md: '7rem' },
                    fontFamily: "fantasy",
                    textShadow: '12px 12px 5px rgba(0, 0, 0, 0.5)',
                    userSelect: 'none'
                }}>
                HANGMAN
            </Typography>
        </motion.div>
    );
};

export default Title;