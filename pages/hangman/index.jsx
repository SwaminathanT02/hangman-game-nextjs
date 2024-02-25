import { getSession } from "next-auth/react"
import HangManMain from "../../components/Hangman/HangManMain"


export const getServerSideProps = async (context) => {
    // Check session and redirect to login page if not logged in
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/login?callbackUrl=%2Fhangman",
            }
        }
    }
    return {
        props: {
            user: session.user
        },
    };
};



const Hangman1P = ({ user }) => {
    return (<HangManMain user={user} />);
}

export default Hangman1P;