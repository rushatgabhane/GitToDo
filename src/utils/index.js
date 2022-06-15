import CONST from '../CONST';

function stripGithubFromURL(URL) {
    if (!URL) {
        return;
    }

    return URL.replace('https://api.github.com', '');
}

function apiURLToGithubURL(URL, type) {
    if (!URL) {
        return;
    }

    const withoutApi = `https://github.com/${URL.replace('https://api.github.com/repos/', '')}`;
    if (type === CONST.NOTIFICATION_TYPE.ISSUE) {
        return withoutApi;
    }

    return withoutApi.replace('/pulls/', '/pull/');
}

function to(promise) {
    return promise
        .then(data => ({data, err: null}))
        .catch((err) => {
            console.error(err);
            return {data: null, err};
        });
}

function getValidBodyAndActor(latestCommentDetails, reviewDetails, commentDetails) {
    if (latestCommentDetails && latestCommentDetails.body) {
        return latestCommentDetails;
    }

    if (reviewDetails && reviewDetails.body) {
        return reviewDetails;
    }

    return commentDetails;
}

// "https://api.github.com/repos/facebook/react-native/pulls/29466"
// "https://api.github.com/repos/rushatgabhane/gittodo/issues/5"
function getIssueOrPullRequestNumber(url, type) {
    if (!url) {
        return;
    }

    if (type === CONST.NOTIFICATION_TYPE.ISSUE) {
        return url.substring(url.indexOf('issues/') + 7);
    }

    if (type === CONST.NOTIFICATION_TYPE.PULL_REQUEST) {
        return url.substring(url.indexOf('pulls/') + 6);
    }
}

export {
    apiURLToGithubURL,
    getIssueOrPullRequestNumber,
    getValidBodyAndActor,
    stripGithubFromURL,
    to,
};
