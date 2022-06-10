import supabase from '../supabase';
import to from '../../utils/to';

async function signIn() {
    const {user, session, error} = await supabase.auth.signIn({
        provider: 'github',
    }, {
        scopes: 'repo notifications user:email',
    });
    if (error) { console.error('[GITHUB] failed to sign in', error); }

    const oAuthToken = session.provider_token;
    console.log(user, oAuthToken);
}

async function signOut() {
    const res = await supabase.auth.signOut();
    console.log(res);
}

export {
    signIn,
    signOut,
};
