import axios from "axios";


const GetDBScore = async (email) => {
    try {
        const response = await axios(`/api/get-score`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                Email: email
            }
        });
        const userScore = response?.data?.Score;
        return userScore;
    } catch (error) {
        console.error('Error updating user score:', error.message);
    }
}

export default GetDBScore;