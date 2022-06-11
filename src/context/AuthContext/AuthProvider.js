import React from 'react';
import AuthContext from './AuthContext'
import supabase from '../../libs/supabase';
import PropTypes from 'prop-types';
import * as Github from '../../libs/Github';
import _ from 'lodash';

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
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.setState({
            user: supabase.auth.user(),
        });

        // This is a workaround because returns null after a sign in 
        // https://github.com/supabase/gotrue/issues/173
        supabase.auth.onAuthStateChange((event, session) => {
            const user = _.get(session, 'user', null);
            this.setState({
                user,
            });
        });
    }

    signIn() {
        Github.signIn()
        .then(() => {
            const user = supabase.auth.user();
            this.setState({
                user,
            });
        });
    }

    signOut() {
        Github.signOut()
        .then(() => {
            this.setState({
                user: null,
            });
        });
    }

    render() {
        return(
            <AuthContext.Provider value={{
                user: this.state.user,
                signIn: this.signIn,
                signOut: this.signOut,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

AuthProvider.propTypes = propTypes;
AuthProvider.defaultProps = defaultProps;

export default AuthProvider;
