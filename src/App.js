import React from 'react';
import TasksPage from './pages/TasksPage';
import SignInPage from './pages/SignInPage';
import {AuthContext} from './context/AuthContext';
import AuthenticatedRoutes from './Routing/AuthenticatedRoutes';
import {getOctokit} from './libs/Github';

class App extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            this.context.user ? <AuthenticatedRoutes /> : <SignInPage />
        );
    }
}

App.contextType = AuthContext;

export default App;
