const UpdateDBScore = async (email, score) => {
    try {
        await fetch("/api/score", {
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