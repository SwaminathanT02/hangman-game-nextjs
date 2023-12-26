import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Fullname: {
        type: String
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: false,
    },
    Score: {
        type: Number
    }
}, {
    timestamps: true
}
);

export default mongoose.models.User || mongoose.model("User", userSchema);;