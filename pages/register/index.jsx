import { getSession } from "next-auth/react"
import SignUp from "../../components/registerComponent";

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: "/",
            }
        }
    }
    return {
        props: {}
    }
}

const Register = () => {
    return (
        <SignUp></SignUp>
    );
};

export default Register;