import SignIn from "../../components/loginComponent";
import { getSession } from "next-auth/react"

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

const Login = () => {
    return (
        <SignIn></SignIn>
    );
};

export default Login;