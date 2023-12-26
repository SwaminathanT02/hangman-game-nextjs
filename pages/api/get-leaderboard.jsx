import Connect from "../../utils/db";
import User from "../../models/User";

const GET = async (req, res) => {
    await Connect();

    try {
        const topScorers = await User.find().sort({ Score: -1 }).limit(10);

        const leaderboardData = topScorers.map((user, index) => ({
            rank: index + 1,
            player: user.Fullname,
            score: user.Score,
        }));

        res.status(200).json(leaderboardData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default GET;
