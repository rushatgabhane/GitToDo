import React from 'react';
import {AuthContext} from './context/AuthContext';
import SignInPage from './pages/SignInPage';
import AuthenticatedRoutes from './routing/AuthenticatedRoutes';

class App extends React.Component {
    render() {
        return (
            this.context.user ? <AuthenticatedRoutes /> : <SignInPage />
        );
    }
}

App.contextType = AuthContext;

export default App;
