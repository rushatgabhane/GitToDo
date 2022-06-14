import React from 'react';
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


        this.state = {
            todo: [],
            done: [],
        };
    }

    render() {
        console.log('TasksPage: ', this.props.notifications);
        return (
            <>
                <h1>Hello world!</h1>
                <CardList
                    title="Todo"

                    // tasks={this.state.tasks}
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
