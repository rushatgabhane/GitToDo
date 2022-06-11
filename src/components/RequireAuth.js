import {Navigate} from 'react-router-dom';
import {useAuthContext} from '../context/AuthContext';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: null,
};

const RequireAuth = props => {
    const {user} = useAuthContext();
    console.log('require auth');
    return user ? props.children : <Navigate to="/signin" replace />;
}

RequireAuth.propTypes = propTypes;
RequireAuth.defaultProps = defaultProps;

export default RequireAuth;
