import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useAuthContext} from '../context/AuthContext';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: null,
};

const RequireAuth = (props) => {
    const {user} = useAuthContext();
    return user ? props.children : <Navigate to="/signin" replace />;
};

RequireAuth.propTypes = propTypes;
RequireAuth.defaultProps = defaultProps;

export default RequireAuth;
