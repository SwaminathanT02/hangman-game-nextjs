// pages/index.js
import { useState, useEffect } from 'react';
import { getSession } from "next-auth/react"
import io from 'socket.io-client';
import GameOutcome2P from "../../components/Hangman/GameOutcome2P";
import WordDisplay from "../../components/Hangman/WordDisplay";
import Keyboard from "../../components/Hangman/Keyboard";
import LoadingComponent from "../../components/Hangman/Components/LoadingComponent";
import ContainerComponent from "../../components/Hangman/Components/ContainerComponent";
import ImageComponent from "../../components/Hangman/Components/ImageComponent";
import WaitComponent from '../../components/Hangman/WaitComponent';
import RoomText from '../../components/Hangman/RoomText';
import ScoreboardDisplay from '../../components/Hangman/Components/ScoreBoardComponent';

let socket;

export const getServerSideProps = async (context) => {
    // Check session and redirect to login page if not logged in
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/login?callbackUrl=%2Fhangman-2p",
            }
        }
    }
    return {
        props: {
            user: session.user
        },
    };
};

export default function HangMan2P({ user }) {
    const [isWaiting, setWaiting] = useState(true);
    const [roomId, setRoom] = useState('');
    const [isUsernameTaken, setUsernameTaken] = useState(false);
    const [hasTwoPlayers, setTwoPlayers] = useState(false);
    const [scoreboard, setScoreboard] = useState(null);
    const [winner, setWinner] = useState('');
    const [goWait, setGOWait] = useState(false);
    const [playAgainDis, setPlayAgainDis] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedWord, setSelectedWord] = useState(null);
    const [wordMeanings, setWordMeanings] = useState([]);
    const [guessedWord, setGuessedWord] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [mistakes, setMistakes] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [correctGuessIndexes, setCorrectGuessIndexes] = useState([]);
    const [blink, setBlink] = useState(false);

    const initializeGame = async (wordAndMeaning) => {
        try {
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
            let correctGuessedLetters = 0;
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    updatedGuessedWord[i] = letter;
                    correctGuess = true;
                    correctGuessedLetters++;
                    setCorrectGuessIndexes((prevIndexes) => [...prevIndexes, i]);
                }
            }
            if (!correctGuess) {
                if (!guessedLetters.has(letter)) {
                    setMistakes((prevMistakes) => prevMistakes + 1);
                    socket.emit('handle guess', { roomId, username: user.email, correct: false });
                    setGuessedLetters((prevGuessedLetters) => new Set(prevGuessedLetters).add(letter));
                }
            } else {
                if (!guessedLetters.has(letter)) {
                    setGuessedLetters((prevGuessedLetters) => new Set(prevGuessedLetters).add(letter));
                    socket.emit('handle guess', { roomId, username: user.email, correct: true, correctGuessedLetters });
                }
                setGuessedWord(updatedGuessedWord);
            }
        }
    };

    async function socketInitializer() {
        await fetch("/api/socket");
        socket = io({ path: "/api/ping" });

        // Listen for incoming room joined event
        socket.on('room joined', (data) => {
            setWaiting(false);
            setRoom(data.roomId);
            if (data?.players.length === 1) {
                setTwoPlayers(false);
            }
            else if (data?.players.length === 2) {
                setTwoPlayers(true);
                setLoading(true);
                socket.emit('initialize game', { roomId: data.roomId, data });
            }
        });

        // Listen for username taken event
        socket.on('username taken', () => {
            setUsernameTaken(true);
        });

        // Listen for word once room is full
        socket.on('get word', (data) => {
            setScoreboard(data.data.players.map((player) => { return { id: player.id, username: player.username, score: { correctGuesses: 0, remainingTries: 6 } } }))
            setLoading(true);
            initializeGame(data?.wordInfo);
        });

        // Listen for chat messages
        socket.on('update scoreboard', (data) => {
            setScoreboard(data.players.map((player) => { return { id: player.id, username: player.username, score: player.score } }));
            if ((data.players[0].username === user.email && data.players[0].score.remainingTries === 0) ||
                (data.players[1].username === user.email && data.players[1].score.remainingTries === 0)) {
                setGameOver(true);
                setGOWait(true);
            };
            if (data.players[0].score.correctGuesses === data.totalLetters ||
                data.players[1].score.correctGuesses === data.totalLetters ||
                (data.players[0].score.remainingTries === 0 && data.players[1].score.remainingTries === 0)) {
                setGameOver(true);
                setGOWait(false);
            };
            if (winner === '') {
                if (data.players[0].score.correctGuesses === data.totalLetters) setWinner(data.players[0].username);
                else if (data.players[1].score.correctGuesses === data.totalLetters) setWinner(data.players[1].username);
                else if (data.players[0].score.remainingTries === 0 && data.players[1].score.remainingTries === 0) {
                    if (data.players[0].score.correctGuesses > data.players[1].score.correctGuesses) setWinner(data.players[0].username);
                    else if (data.players[0].score.correctGuesses < data.players[1].score.correctGuesses) setWinner(data.players[1].username);
                    else setWinner("Tie");
                };
            }

        });

        // Listen for play again info
        socket.on('play again', ({ info, data, roomId }) => {
            if (info === 'play') {
                setGOWait(true);
                setLoading(true);
                setPlayAgainDis(false);
                socket.emit('initialize game', { roomId, data });
            }
        });

        // Listen for user left event
        socket.on('user left', (data) => {
            setTwoPlayers(false);
            setGameOver(true);
        });

    }

    useEffect(() => {
        socketInitializer();
        // Clean up the socket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
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

    const handleLeaveRoom = () => {
        socket.emit('leave room', { roomId, scoreboard, username: user.email });
        setWaiting(true);
        setRoom('');
        setTwoPlayers(false);
    };

    const handleJoinRoom = () => {
        setUsernameTaken(false);
        socket.emit('set username', user.email);
    };

    const handlePlayAgain = () => {
        setPlayAgainDis(true);
        socket.emit('play again', { roomId, username: user.email })
    }

    return (
        <div>
            {isWaiting ? (
                <WaitComponent handleJoinRoom={handleJoinRoom} isUsernameTaken={isUsernameTaken} />
            ) : (
                hasTwoPlayers
                    ?
                    (<>
                        <RoomText handleLeaveRoom={handleLeaveRoom} text={`Room ID: ${`${btoa(roomId).slice(btoa(roomId).length - 5)}`}`} color={'green'} />
                        <>
                            {(loading)
                                ? <LoadingComponent />
                                : (
                                    gameOver ? (
                                        <ContainerComponent>
                                            <ImageComponent mistakes={mistakes} />
                                            <GameOutcome2P
                                                selectedWord={selectedWord}
                                                gameOver={gameOver}
                                                wordMeanings={wordMeanings}
                                                resetGame={handlePlayAgain}
                                                goWait={goWait}
                                                leaveGame={handleLeaveRoom}
                                                playAgainDis={playAgainDis}
                                                winner={winner}
                                                username={user.email}
                                                scoreboard={scoreboard}
                                            />
                                        </ContainerComponent>
                                    ) : (
                                        <ContainerComponent>
                                            <ImageComponent mistakes={mistakes} />
                                            <ScoreboardDisplay scoreboard={scoreboard} username={user.email} blink={blink} />
                                            <WordDisplay guessedWord={guessedWord} correctGuessIndexes={correctGuessIndexes} />
                                            <Keyboard handleGuess={handleGuess} gameOver={gameOver} guessedLetters={guessedLetters} />
                                        </ContainerComponent>
                                    )
                                )}
                        </>
                    </>)
                    : (<RoomText handleLeaveRoom={handleLeaveRoom} text={`Waiting for another player to join...`} color={'red'} />)
            )}
        </div>
    );
}
