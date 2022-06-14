let observers = [];

function subscribe(func) {
    observers.push(func);
}

function unsubscribe(func) {
    observers = observers.filter(observer => observer !== func);
}

function notify(data) {
    observers.forEach(observer => observer(data));
}

export {
    subscribe,
    unsubscribe,
    notify,
};
