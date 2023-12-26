import User from "../../models/User";
import Connect from "../../utils/db";

const POST = async (request, response) => {
    const { Email, Score } = await request.body;
    await Connect();
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
        existingUser.Score = Score;
        try {
            await existingUser.save();
            return response.status(200).json({ message: "User Score Updated!" });
        } catch (err) {
            return response.status(500).json({ message: err });
        }
    }
};

export default POST;
