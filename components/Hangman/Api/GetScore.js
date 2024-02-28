import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

const GetDBScore = async (email) => {
    try {
        const response = await axios(`${serverUrl}/api/get-score?Email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const userScore = response?.data?.Score;
        return userScore;
    } catch (error) {
        console.error('Error updating user score:', error.message);
    }
}

export default GetDBScore;