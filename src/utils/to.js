export default function to(promise) {
    return promise
        .then(data => ({data, err: null}))
        .catch((err) => {
            console.error(err);
            return {data: null, err};
        });
}
