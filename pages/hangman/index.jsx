import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react"
import GameOutcome from "../../components/Hangman/GameOutcome";
import WordDisplay from "../../components/Hangman/WordDisplay";
import Keyboard from "../../components/Hangman/Keyboard";
import GetDBScore from "../../components/Hangman/Api/GetScore";
import UpdateDBScore from "../../components/Hangman/Api/UpdateScore";
import FetchWordAndMeaning from "../../components/Hangman/Api/GetWordAndMeaning";
import LoadingComponent from "../../components/Hangman/Components/LoadingComponent";
import ContainerComponent from "../../components/Hangman/Components/ContainerComponent";
import ImageComponent from "../../components/Hangman/Components/ImageComponent";
import TypographyComponent from "../../components/Hangman/Components/TypographyComponent";

export const getServerSideProps = async (context) => {
    // Check session and redirect to login page if not logged in
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/login?callbackUrl=%2Fhangman",
            }
        }
    }
    return {
        props: {
            user: session.user
        },
    };
};



const Hangman = ({ user }) => {
    const totalTries = 6;
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(null);
    const [selectedWord, setSelectedWord] = useState(null);
    const [wordMeanings, setWordMeanings] = useState([]);
    const [guessedWord, setGuessedWord] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [mistakes, setMistakes] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [correctGuessIndexes, setCorrectGuessIndexes] = useState([]);
    const [blink, setBlink] = useState(false);

    const initializeGame = async () => {
        try {
            setLoading(true);
            const wordAndMeaning = await FetchWordAndMeaning();
            if (score === null) {
                const userScore = await GetDBScore(user.email);
                setScore(userScore);
            }
            else {
                await UpdateDBScore(user.email, score);
            }
            setSelectedWord(wordAndMeaning.word);
            setWordMeanings(wordAndMeaning.meaning);
            setGuessedWord(Array(wordAndMeaning.word.length).fill('_'));
            setGuessedLetters(new Set());
            setCorrectGuessIndexes([]);
            setMistakes(0);
            setGameOver(false);
        } catch (error) {
            console.error('Error Initializing Game:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGuess = async (letter) => {
        if (!gameOver) {
            const updatedGuessedWord = [...guessedWord];
            let correctGuess = false;
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    updatedGuessedWord[i] = letter;
                    correctGuess = true;
                    setCorrectGuessIndexes((prevIndexes) => [...prevIndexes, i]);
                }
            }
            if (!correctGuess) {
                if (!guessedLetters.has(letter)) {
                    setMistakes((prevMistakes) => prevMistakes + 1);
                    setGuessedLetters((prevGuessedLetters) => new Set(prevGuessedLetters).add(letter));
                }
                if (mistakes + 1 === totalTries) {
                    setScore(Math.max((score || 0) - 2, 0));
                    await UpdateDBScore(user.email, score);
                    setGameOver(true);
                }
            } else {
                if (!guessedLetters.has(letter)) {
                    setGuessedLetters((prevGuessedLetters) => new Set(prevGuessedLetters).add(letter));
                }
                setGuessedWord(updatedGuessedWord);
                if (updatedGuessedWord.join('') === selectedWord) {
                    setScore((score || 0) + 5);
                    await UpdateDBScore(user.email, score);
                    setGameOver(true);
                }
            }
        }
    };

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        setBlink(true);
        // Reset the blink state after a short delay
        const timeoutId = setTimeout(() => {
            setBlink(false);
        }, 500);

        // Clean up the timeout to avoid memory leaks
        return () => clearTimeout(timeoutId);
    }, [mistakes]);

    return (
        <>
            {loading
                ? <LoadingComponent />
                : (
                    gameOver ? (
                        <ContainerComponent>
                            <ImageComponent mistakes={mistakes} />
                            <TypographyComponent color={'blue'}>
                                SCORE: {score}
                            </TypographyComponent>
                            <GameOutcome
                                mistakes={mistakes}
                                selectedWord={selectedWord}
                                gameOver={gameOver}
                                wordMeanings={wordMeanings}
                                resetGame={initializeGame}
                                totalTries={totalTries}
                            />
                        </ContainerComponent>
                    ) : (
                        <ContainerComponent>
                            <ImageComponent mistakes={mistakes} />
                            <TypographyComponent color={'green'}>
                                SCORE: {score}
                            </TypographyComponent>
                            <TypographyComponent sxExtra={{ color: blink ? 'red' : 'blue' }}>
                                REMAINING TRIES: {totalTries - mistakes}
                            </TypographyComponent>
                            <WordDisplay guessedWord={guessedWord} correctGuessIndexes={correctGuessIndexes} />
                            <Keyboard handleGuess={handleGuess} gameOver={gameOver} guessedLetters={guessedLetters} />
                        </ContainerComponent>
                    )
                )}
        </>
    );
};

export default Hangman;
