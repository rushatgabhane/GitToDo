import {Octokit} from 'octokit';
import _ from 'lodash';
import supabase from '../supabase';

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
    const supabaseData = JSON.parse(localStorage.getItem('supabase.auth.token'));
    const githubAccessToken = _.get(supabaseData, 'currentSession.provider_token');

    if (_.isUndefined(githubAccessToken)) {
        // signOut();
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
