// pages/index.js
import { useState, useEffect } from 'react';
import { getSession } from "next-auth/react"
import * as Ably from 'ably';
import { AblyProvider, useChannel, useConnectionStateListener } from 'ably/react';
import GameOutcome2P from "../../components/Hangman/GameOutcome2P";
import WordDisplay from "../../components/Hangman/WordDisplay";
import Keyboard from "../../components/Hangman/Keyboard";
import LoadingComponent from "../../components/Hangman/Components/LoadingComponent";
import ContainerComponent from "../../components/Hangman/Components/ContainerComponent";
import ImageComponent from "../../components/Hangman/Components/ImageComponent";
import WaitComponent from '../../components/Hangman/WaitComponent';
import RoomText from '../../components/Hangman/RoomText';
import ScoreboardDisplay from '../../components/Hangman/Components/ScoreBoardComponent';


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

export default function App({ user }) {

    // Connect to Ably using the AblyProvider component and your API key
    const client = new Ably.Realtime.Promise({ key: 'MseN5g.iTAZMA:mu8RzgIwVzqIBlVw95p-pwqTNofoHovLTq2Ks9W6N-Q' });

    return (
        <AblyProvider client={client}>
            <HangMan2P user={user} />
        </AblyProvider>
    );
}


function HangMan2P({ user }) {
    const [isWaiting, setWaiting] = useState(true);
    const [roomId, setRoom] = useState('');
    const [isUsernameTaken, setUsernameTaken] = useState(false);
    const [hasTwoPlayers, setTwoPlayers] = useState(false);
    const [scoreboard, setScoreboard] = useState(null);
    const [roomData, setRoomData] = useState(null);
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

    useConnectionStateListener('connected', () => {
        console.log('Connected to Ably!');
    });
    const { channel } = useChannel('HangMan Server');

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
            setLoading(true);
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
                    setMistakes((prevMistakes) => prevMistakes + 1)
                    const newData = {
                        ...roomData, players: roomData.players.map(player => {
                            if (player.username === user.email) {
                                player.score.remainingTries--;
                            }
                            return player;
                        })
                    };
                    setRoomData(newData);
                    channel.publish('handle guess', { room: newData, username: user.email });
                    setGuessedLetters((prevGuessedLetters) => new Set(prevGuessedLetters).add(letter));
                }
            } else {
                if (!guessedLetters.has(letter)) {
                    setGuessedLetters((prevGuessedLetters) => new Set(prevGuessedLetters).add(letter));
                    const newData = {
                        ...roomData, players: roomData.players.map(player => {
                            if (player.username === user.email) {
                                player.score.correctGuesses += correctGuessedLetters;
                            }
                            return player;
                        })
                    };
                    setRoomData(newData);
                    channel.publish('handle guess', { room: newData, username: user.email });
                }
                setGuessedWord(updatedGuessedWord);
            }
        }
    };

    async function ablyInitializer() {
        await fetch("/api/ably");

        // Listen for incoming room joined event
        channel.subscribe(`room joined ${user.email}`, (data) => {
            setWaiting(false);
            setRoom(data.data.room.roomId);
            setRoomData(data.data.room);
            if (data.data.room.players.length === 1) {
                setTwoPlayers(false);
            }
            else if (data.data.room.players.length === 2) {
                setTwoPlayers(true);
                setLoading(true);
                if (data.data.initializer) channel.publish('initialize game', { room: data.data.room, username: user.email });
            }
        });

        // Listen for username taken event
        channel.subscribe(`username taken ${user.email}`, () => {
            setUsernameTaken(true);
        });

        // Listen for word once room is full
        channel.subscribe(`get word ${user.email}`, (data) => {
            setScoreboard(data.data.data.players.map((player) => { return { username: player.username, score: { correctGuesses: 0, remainingTries: 6 } } }))
            setLoading(true);
            setRoomData(data.data.data);
            initializeGame(data.data?.wordInfo);
        });

        // Listen for chat messages
        channel.subscribe(`update scoreboard ${user.email}`, (data) => {
            setRoomData(data.data.room);
            setScoreboard(data.data.room.players.map((player) => { return { username: player.username, score: player.score } }));
            if ((data.data.room.players[0].username === user.email && data.data.room.players[0].score.remainingTries === 0) ||
                (data.data.room.players[1].username === user.email && data.data.room.players[1].score.remainingTries === 0)) {
                setGameOver(true);
                setGOWait(true);
            };
            if (data.data.room.players[0].score.correctGuesses === data.data.room.totalLetters ||
                data.data.room.players[1].score.correctGuesses === data.data.room.totalLetters ||
                (data.data.room.players[0].score.remainingTries === 0 && data.data.room.players[1].score.remainingTries === 0)) {
                setGameOver(true);
                setGOWait(false);
            };
            if (winner === '') {
                if (data.data.room.players[0].score.correctGuesses === data.data.room.totalLetters) setWinner(data.data.room.players[0].username);
                else if (data.data.room.players[1].score.correctGuesses === data.data.room.totalLetters) setWinner(data.data.room.players[1].username);
                else if (data.data.room.players[0].score.remainingTries === 0 && data.data.room.players[1].score.remainingTries === 0) {
                    if (data.data.room.players[0].score.correctGuesses > data.data.room.players[1].score.correctGuesses) setWinner(data.data.room.players[0].username);
                    else if (data.data.room.players[0].score.correctGuesses < data.data.room.players[1].score.correctGuesses) setWinner(data.data.room.players[1].username);
                    else setWinner("Tie");
                };
            }
            setLoading(false);
        });

        // Listen for play again info
        channel.subscribe(`play again ${user.email}`, (data) => {
            if (data.data.info === 'wait') {
                setRoomData(data.data.data)
            }
            else if (data.data.info === 'play') {
                setGOWait(true);
                setLoading(true);
                setPlayAgainDis(false);
                setRoomData(data.data.data)
                if (data.data.initializer) channel.publish('initialize game', { room: data.data.data, username: user.email });
            }
        });

        // Listen for user left event
        channel.subscribe(`user left ${user.email}`, (data) => {
            setTwoPlayers(false);
            setGameOver(true);
        });

    }

    useEffect(() => {
        ablyInitializer();
        // Clean up the Ably connection when the component unmounts
        return () => {
            channel.publish('leave room', { room: roomData, username: user.email });
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
        channel.publish('leave room', { room: roomData, username: user.email });
        setWaiting(true);
        setRoom('');
        setRoomData(null);
        setTwoPlayers(false);
    };

    const handleJoinRoom = () => {
        setUsernameTaken(false);
        channel.publish('set username', user.email);
    };

    const handlePlayAgain = () => {
        setPlayAgainDis(true);
        channel.publish('play again', { room: roomData, username: user.email })
    }

    return (
        <div>
            {isWaiting ? (
                <WaitComponent handleJoinRoom={handleJoinRoom} isUsernameTaken={isUsernameTaken} />
            ) : (
                hasTwoPlayers
                    ?
                    (<>
                        <RoomText handleLeaveRoom={handleLeaveRoom} text={`Room ID: ${roomId}`} color={'green'} />
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
