import {useAuthContext} from '../context/AuthContext';

const SignInPage = () => {
    const {signIn} = useAuthContext();
    return (
        <div className="bg-black">
            <h1>Sign in page</h1>
            <button type="submit" onClick={() => signIn()}>Sign In</button>
        </div>
    );
};

export default SignInPage;
