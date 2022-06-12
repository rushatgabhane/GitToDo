import {useAuthContext} from '../context/AuthContext';

const SignInPage = () => {
    const {signIn} = useAuthContext();
    return (
        <>
            <h1>Sign in page</h1>
            <button type="submit" onClick={() => signIn()}>Sign In</button>
        </>
    );
};

export default SignInPage;
