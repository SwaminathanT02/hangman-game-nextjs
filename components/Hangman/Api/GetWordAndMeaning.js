import axios from "axios";

const FetchWordAndMeaning = async () => {
    // Fetch word and meaning on server side for the game
    try {
        const response = await axios.get(`/api/word`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response?.data?.wordAndMeaning;
    } catch (err) {
        console.error(err);
    }
}

export default FetchWordAndMeaning;