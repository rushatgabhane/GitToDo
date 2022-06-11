import React from 'react';
import TasksPage from './pages/TasksPage';
import SignInPage from './pages/SignInPage';
import {AuthContext} from './context/AuthContext';

class App extends React.Component {
    render() {
        return (
            this.context.user ? <TasksPage /> : <SignInPage />
        );
    }
}

App.contextType = AuthContext;

export default App;
