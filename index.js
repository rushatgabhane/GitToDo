import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import {AuthProvider} from './src/context/AuthContext';

ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
