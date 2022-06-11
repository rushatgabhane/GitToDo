import React from 'react';
import AuthContext from './AuthContext';

const useAuthContext = () => {
    const {user, signIn, signOut} = React.useContext(AuthContext);
    if (user === undefined) {
        throw new Error('useAuthContext can only be used inside AuthProvider');
    }
    return {user, signIn, signOut};
};

export default useAuthContext;
