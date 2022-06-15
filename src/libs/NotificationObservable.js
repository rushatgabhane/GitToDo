import _ from 'lodash';

let observers = [];

function subscribe(func) {
    observers.push(func);
}

function unsubscribe(func) {
    observers = _.filter(observers, observer => observer !== func);
}

function notify(data) {
    _.forEach(observers, observer => observer(data));
}

export {
    subscribe,
    unsubscribe,
    notify,
};
