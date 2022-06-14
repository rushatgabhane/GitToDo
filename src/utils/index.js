function stripGithubFromURL(URL) {
    if (!URL) {
        return;
    }

    return URL.replace('https://api.github.com', '');
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

export {
    getValidBodyAndActor,
    stripGithubFromURL,
    to,
}