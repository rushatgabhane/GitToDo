import supabase from '../supabase';
import to from '../../utils/to';

async function signIn() {
    const {user, session, error} = await supabase.auth.signIn({
        provider: 'github',
    }, {
        scopes: 'repo notifications user:email',
    });
    if (error) { 
        return console.error('[GITHUB] failed to sign in', error); 
    }
}

async function signOut() {
    await supabase.auth.signOut();
}

export {
    signIn,
    signOut,
};
