import React from 'react';
import CardList from '../components/CardList';
import supabase from '../libs/supabase';
import {AuthContext} from '../context/AuthContext';

const checkUser = () => {
    console.info(supabase.auth.user());
};

class TasksPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // subscribe to notifications
    }

    render() {
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

export default TasksPage;
