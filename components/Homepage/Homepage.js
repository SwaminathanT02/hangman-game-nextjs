import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Title from "./Title";
import PlayButton from "./PlayButton";


export default function App() {
    const x = useMotionValue(200);
    const y = useMotionValue(200);
    const rotateX = useTransform(y, [0, 400], [25, -25]);
    const rotateY = useTransform(x, [0, 400], [-5, 5]);
    const handleMouse = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }

    return (
        <motion.div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: '70vh',
                gap: '5rem'
            }}
            onMouseMove={(e) => { handleMouse(e) }}>
            <Title rotateX={rotateX} rotateY={rotateY} />
            <PlayButton />
        </motion.div>
    );
}


