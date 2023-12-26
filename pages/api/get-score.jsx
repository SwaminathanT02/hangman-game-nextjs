import User from "../../models/User";
import Connect from "../../utils/db";

const GET = async (request, response) => {
    const { Email } = request.query;
    try {
        await Connect();
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return response.status(200).json({ Score: existingUser.Score ?? 0 });
        }
    } catch (error) {
        console.error(error);
    }

};

export default GET;