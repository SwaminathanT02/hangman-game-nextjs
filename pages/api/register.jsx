import User from "../../models/User";
import Connect from "../../utils/db";
import bcrypt from "bcryptjs";


const POST = async (request, response) => {
    const { Fullname, Email, Password } = await request.body;
    await Connect();
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
        return response.status(400).json({ message: "Email is already taken." });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({
        Fullname,
        Email,
        Password: hashedPassword,
        Score: 0
    });
    try {
        await newUser.save();
        return response.status(200).json({ message: "User is registered" });
    } catch (err) {
        return response.status(500).json({ message: err });
    }
};

export default POST;