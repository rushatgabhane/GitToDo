function stripGithubFromURL(URL) {
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

export {
    stripGithubFromURL,
    to,
}