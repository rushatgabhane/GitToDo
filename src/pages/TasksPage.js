import React from 'react';
import _ from 'lodash';
import CardList from '../components/CardList';
import supabase from '../libs/supabase';
import {AuthContext} from '../context/AuthContext';
import withNotifications, {withNotificationsPropTypes, withNotificationsDefaultProps} from '../components/withNotifications';

const checkUser = () => {
    console.info(supabase.auth.user());
};

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
    }

    getToDo() {
        return _.reject(this.props.notifications, notification => notification.is_done);
    }

    getDone() {
        return _.reject(this.props.notifications, notification => !notification.is_done);
    }

    render() {
        console.log('TasksPage: ', this.props.notifications);
        const toDo = this.getToDo();
        const done = this.getDone();
        return (
            <>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
                <CardList
                    toDo={toDo}
                    done={done}
                />
                <button type="submit" onClick={() => this.context.signOut()}>Sign Out</button>
                <button type="submit" onClick={() => checkUser()}>Check user</button>
            </>
        );
    }
}

TasksPage.contextType = AuthContext;

TasksPage.propTypes = propTypes;
TasksPage.defaultProps = defaultProps;
TasksPage.displayName = 'TasksPage';

export default withNotifications(TasksPage);
