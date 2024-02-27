import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    score: {
        correctGuesses: { type: Number, default: 0 },
        remainingTries: { type: Number, default: 6 },
    },
});

const roomSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true },
    players: [playerSchema],
    totalLetters: { type: Number, required: true },
    fetchingWord: { type: Boolean, default: false },
    playAgain: { type: [String], default: [] }
});

export default mongoose.models.Room || mongoose.model('Room', roomSchema);
