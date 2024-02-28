import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

const GET = async () => {
    try {
        const wordAndMeaning = await axios.get(`${serverUrl}/api/getWord`);
        return wordAndMeaning?.data?.wordInfo;
    } catch (error) {
        console.error('Error:', error.message);
    }
};


export default GET;
