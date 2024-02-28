const serverUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

const UpdateDBScore = async (email, score) => {
    try {
        await fetch(`${serverUrl}/api/score`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Email: email,
                Score: score ?? 0
            }),
        });
    } catch (error) {
        console.error('Error updating user score:', error.message);
    }
}

export default UpdateDBScore;