import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import isNetworkOnline from '../libs/NetworkStatus';
import TasksPage from '../pages/TasksPage';
import SettingsPage from '../pages/SettingsPage';
import {checkNotifications} from '../libs/Github';

class AuthenticatedRoutes extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (!isNetworkOnline()) {
                return;
            }
            console.log('interval');
            checkNotifications();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TasksPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default AuthenticatedRoutes;
