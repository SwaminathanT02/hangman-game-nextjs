import GET from "../../utils/getWord";
import * as Ably from "ably/promises"
import Connect from "../../utils/db";
import Room from "../../models/Room";

export default async function handler(req, res) {
    const ably = new Ably.Realtime.Promise({ key: 'MseN5g.iTAZMA:mu8RzgIwVzqIBlVw95p-pwqTNofoHovLTq2Ks9W6N-Q' });
    ably.connection.once("connected", () => {
        console.log("Server Connected to Ably!")
    })

    await Connect();

    const channel = ably.channels.get("HangMan Server");

    // Event handler for client connections
    // Listen for user name
    await channel.subscribe("set username", async (username) => {
        // Check if the user with the same name is already in a room
        const existingRoomId = await Room.findOne({ 'players.username': username.data })
        // If the user is in a room, inform the client
        if (existingRoomId) {
            await channel.publish(`username taken ${username.data}`, 'Username Already in room!');
            return;
        }

        // Check for available rooms
        const availableRoom = await Room.findOne({ 'players': { $size: 1 } });

        // If no available room, create a new one
        if (!availableRoom) {
            const currentDate = btoa(new Date().toISOString()); // Base64-encoded ASCII
            const newRoomId = currentDate.slice(currentDate.length - 5);
            const newRoom = {
                roomId: newRoomId,
                players: [{ username: username.data, score: { correctGuesses: 0, remainingTries: 6 } }],
                totalLetters: 0,
                playAgain: [],
                fetchingWord: false
            };
            await Room.create(newRoom);
            await channel.publish(`room joined ${username.data}`, { room: newRoom });
        } else {
            // Add the player to the available room
            const updatedRoom = await Room.findOneAndUpdate(
                { roomId: availableRoom.roomId, 'players.username': { $ne: username.data } },
                {
                    $addToSet: {
                        players: {
                            $each: [
                                {
                                    username: username.data,
                                    score: { correctGuesses: 0, remainingTries: 6 },
                                },
                            ],
                        },
                    },
                },
                { new: true }
            );

            await channel.publish(`room joined ${username.data}`, { room: updatedRoom, initializer: true });
            await channel.publish(`room joined ${updatedRoom.players.filter(player => player.username !== username.data)[0].username}`, { room: updatedRoom, initializer: false });
        }
    });

    // Once room is full, listen for 'initialize game' to send word with meaning
    await channel.subscribe('initialize game', async (data) => {
        const room = await Room.findOne({ roomId: data.data.room.roomId });
        if (room.fetchingWord === false) {
            await Room.updateOne({ roomId: data.data.room.roomId }, { $set: { fetchingWord: true } });
            const wordInfo = await GET();
            const updatedRoom = await Room.findOneAndUpdate({ roomId: data.data.room.roomId }, { $set: { totalLetters: wordInfo.word.length } });
            await channel.publish(`get word ${data.data.username}`, { wordInfo, data: updatedRoom });
            await channel.publish(`get word ${updatedRoom.players.filter(player => player.username != data.data.username)[0].username}`, { wordInfo, data: updatedRoom });
            await Room.updateOne({ roomId: data.data.room.roomId }, { $set: { fetchingWord: false } });
        }
    });

    // Listen for Word letter guess
    await channel.subscribe('handle guess', async (data) => {
        // Broadcast the message to all players in the room
        await channel.publish(`update scoreboard ${data.data.username}`, { room: data.data.room });
        await channel.publish(`update scoreboard ${data.data.room.players.filter(player => player.username !== data.data.username)[0].username}`, { room: data.data.room });
    });

    // Listen and handle Play Again Votes.
    await channel.subscribe('play again', async (data) => {
        const room = await Room.findOne({ roomId: data.data.room.roomId });
        if (room.playAgain.length === 0) {
            const updatedRoom = await Room.findOneAndUpdate(
                {
                    roomId: data.data.room.roomId,
                    'playAgain': { $ne: data.data.username },
                },
                {
                    $addToSet: {
                        playAgain: data.data.username,
                    },
                },
                { new: true }
            );

            await channel.publish(`play again ${data.data.username}`, { info: 'wait', data: updatedRoom, initializer: true });
            await channel.publish(`play again ${updatedRoom.players.filter(player => player.username != data.data.username)[0].username}`, { info: 'wait', data: updatedRoom, initializer: false });
        }
        else if (room.playAgain.length === 1 && room.playAgain[0] !== data.data.username) {
            const updatedRoom = await Room.findOneAndUpdate(
                { roomId: data.data.room.roomId },
                {
                    $set: {
                        'playAgain': [],
                        'totalLetters': 0,
                        'fetchingWord': false,
                        'players.$[].score': { correctGuesses: 0, remainingTries: 6 },
                    },
                },
                { new: true }
            );
            await channel.publish(`play again ${data.data.username}`, { info: 'play', data: updatedRoom, initializer: true });
            await channel.publish(`play again ${updatedRoom.players.filter(player => player.username != data.data.username)[0].username}`, { info: 'play', data: updatedRoom, initializer: false });
        }
    });


    await channel.subscribe('leave room', async (data) => {
        await Room.updateOne(
            { roomId: data.data.room.roomId },
            {
                $pull: {
                    'players': { username: data.data.username }
                }
            },
            { new: true }
        );
        const updatedRoom = await Room.findOneAndUpdate(
            { roomId: data.data.room.roomId },
            {
                $set: {
                    'playAgain': [],
                    'totalLetters': 0,
                    'fetchingWord': false,
                    'players.$[].score': { correctGuesses: 0, remainingTries: 6 },
                },

            },
            { new: true }
        );

        if (updatedRoom && updatedRoom.players.length === 0) {
            // Remove empty rooms
            await Room.deleteOne({ roomId: data.data.room.roomId });
        }
        else {
            await channel.publish(`user left ${updatedRoom?.players.filter(player => player?.username !== data.data.username)[0].username}`, { data: updatedRoom });
        }
        // const roomId = data.data.room.roomId;
        // rooms[roomId] = data.data.room; // Need to update DB?
        // rooms[roomId] = { ...data.data.room, playAgain: [], totalLetters: 0, fetchingWord: false };
    });
    res.status(200).json('Success');
};


