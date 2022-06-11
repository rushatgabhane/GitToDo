import {useAuthContext} from '../context/AuthContext';
import supabase from '../libs/supabase';

const checkUser = () => {
    console.log(supabase.auth.user());
}

const SignInPage = () => {
    const {signIn} = useAuthContext();
    return (
        <>
            <h1>Sign in page</h1>
            <button type="submit" onClick={() => signIn()}>Sign In</button>
            <button type="submit" onClick={() => checkUser()}>Check user</button>
        </>
    );
}

export default SignInPage;
