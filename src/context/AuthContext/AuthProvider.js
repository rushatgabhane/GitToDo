import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AuthContext from './AuthContext';
import supabase from '../../libs/supabase';
import * as Github from '../../libs/Github';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: null,
};

class AuthProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            currentSession: null,
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        // This is a workaround because returns null after a sign in
        // https://github.com/supabase/gotrue/issues/173
        supabase.auth.onAuthStateChange((event, session) => {
            const user = _.get(session, 'user', null);
            this.setState({
                user,
                currentSession: localStorage.getItem('supabase.auth.token'),
            });
        });
    }

    signIn() {
        Github.signIn()
            .then(() => {
                this.setState({
                    user: supabase.auth.user(),
                    currentSession: localStorage.getItem('supabase.auth.token'),
                });
            });
    }

    signOut() {
        Github.signOut()
            .then(() => {
                this.setState({
                    user: null,
                    currentSession: null,
                });

                // Clear localStorage for security
                localStorage.clear();
            });
    }

    render() {
        return (
            <AuthContext.Provider value={{
                user: this.state.user,
                currentSession: this.state.currentSession,
                signIn: this.signIn,
                signOut: this.signOut,
            }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

AuthProvider.propTypes = propTypes;
AuthProvider.defaultProps = defaultProps;

export default AuthProvider;
