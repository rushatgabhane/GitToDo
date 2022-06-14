import {Octokit} from 'octokit';
import _ from 'lodash';
import supabase from '../supabase';
import CONST from '../../CONST';

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

    // Clear localStorage for security
    // ToDo - probably don't delete tasklist
    // localStorage.clear();
}

function getOctokit() {
    const supabaseData = JSON.parse(localStorage.getItem(CONST.LOCAL_STORAGE.SUPABSE));
    const githubAccessToken = _.get(supabaseData, 'currentSession.provider_token');

    if (_.isUndefined(githubAccessToken)) {
        // Sign in is a workaround because supabase doesn't refresh expired github access_token
        // https://github.com/rushatgabhane/GitToDo/issues/2
        signIn();
        console.error('[getOctokit]: github access token undefined.');
        return;
    }
    return new Octokit({
        auth: githubAccessToken,
    });
}

export {
    signIn,
    signOut,
    getOctokit,
};
