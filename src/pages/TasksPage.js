import React from 'react';
import _ from 'lodash';
import * as Accordion from '@radix-ui/react-accordion';
import * as LocalStorageUtils from '../utils/localStorage';
import * as NotificationObservable from '../libs/NotificationObservable';
import Card from '../components/Card';
import {AuthContext} from '../context/AuthContext';
import withNotifications, {withNotificationsPropTypes, withNotificationsDefaultProps} from '../components/withNotifications';

const propTypes = {
    ...withNotificationsPropTypes,
};

const defaultProps = {
    ...withNotificationsDefaultProps,
};

class TasksPage extends React.Component {
    constructor(props) {
        super(props);

        this.getToDo = this.getToDo.bind(this);
        this.getDone = this.getDone.bind(this);
        this.getCards = this.getCards.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.deleteAllDone = this.deleteAllDone.bind(this);
    }

    getToDo() {
        return _.reject(this.props.notifications, notification => notification.is_done);
    }

    getDone() {
        return _.reject(this.props.notifications, notification => !notification.is_done);
    }

    getCards(notifications) {
        const sortedNotifications = _.orderBy(notifications, ['updated_at'], ['desc']);
        return _.map(sortedNotifications, notification => (
            <Card
                key={`${notification.id}${notification.updated_at}`}
                notification={notification}
                toggleDone={this.toggleDone}
            />
        ));
    }

    deleteAllDone() {
        const allDoneToDelete = _.filter(this.props.notifications, notification => notification.is_done);
        _.each(allDoneToDelete, (notificationToDelete) => {
            const updatedNotifications = LocalStorageUtils.findAndDeleteNotificationById(notificationToDelete);
            NotificationObservable.notify(updatedNotifications);
        });
    }

    toggleDone(notificationId) {
        const notification = _.find(this.props.notifications, notif => notif.id == notificationId);
        if (!notification) {
            return;
        }

        const toggledNotification = {
            ...notification,
            is_done: !notification.is_done,
        };
        const updatedNotifications = LocalStorageUtils.findAndReplaceNotificationById(toggledNotification);
        NotificationObservable.notify(updatedNotifications);
    }

    render() {
        const toDo = this.getToDo();
        const done = this.getDone();
        return (
            <>
                <h1 className="text-2xl p-3 font-bold bg-pink opacity-90">GitToDo</h1>
                <Accordion.Root className="bg-black" type="single" collapsible>
                    {this.getCards(toDo)}
                    <div className="flex justify-between bg-green opacity-90">
                        <h1 className="text-2xl p-3 font-bold">🎉 Done 🎉</h1>
                        <button className="p-3 hover:bg-orange" onClick={() => this.deleteAllDone()}>Delete all done</button>
                    </div>
                    {this.getCards(done)}
                </Accordion.Root>
            </>
        );
    }
}

TasksPage.contextType = AuthContext;

TasksPage.propTypes = propTypes;
TasksPage.defaultProps = defaultProps;
TasksPage.displayName = 'TasksPage';

export default withNotifications(TasksPage);
