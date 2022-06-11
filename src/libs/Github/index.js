import supabase from '../supabase';
import to from '../../utils/to';

async function signIn() {
    const {error} = await supabase.auth.signIn({
        provider: 'github',
    }, {
        scopes: 'repo notifications user:email',
    });
    if (error) {
        console.error('[GITHUB] failed to sign in', error);
    }
}

async function signOut() {
    const {error} = await supabase.auth.signOut();
    if (error) {
        console.error(error);
    }
}

export {
    signIn,
    signOut,
};
