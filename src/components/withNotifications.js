import React from 'react';
import PropTypes from 'prop-types';
import * as NotificationObservable from '../libs/NotificationObservable';
import CONST from '../CONST';

const withNotificationsPropTypes = {
    notifications: PropTypes.arrayOf(PropTypes.object),
};

const withNotificationsDefaultProps = {
    notifications: [],
};

export default function (WrappedComponent) {
    class WithNotifications extends React.Component {
        constructor(props) {
            super(props);

            const notifications = JSON.parse(localStorage.getItem(CONST.LOCAL_STORAGE.NOTIFICATIONS)) || [];
            this.state = {
                notifications,
            };

            this.setNotifications = this.setNotifications.bind(this);
        }

        setNotifications(notifications) {
            this.setState({
                notifications,
            });
        }

        componentDidMount() {
            NotificationObservable.subscribe(this.setNotifications);
        }

        componentWillUnmount() {
            NotificationObservable.unsubscribe(this.setNotifications);
        }

        render() {
            return (
                <WrappedComponent
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...this.props}
                    ref={this.props.forwardedRef}
                    notifications={this.state.notifications}
                />
            );
        }
    }

    WithNotifications.displayName = 'WithNotificationsWrappedComponent';
    WithNotifications.propTypes = {
        forwardedRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({current: PropTypes.instanceOf(React.Component)}),
        ]),
        notifications: PropTypes.arrayOf(PropTypes.object),
    };
    WithNotifications.defaultProps = {
        forwardedRef: undefined,
        notifications: [],
    };
    return React.forwardRef((props, ref) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WithNotifications {...props} forwardedRef={ref} />
    ));
}

export {
    withNotificationsPropTypes,
    withNotificationsDefaultProps,
};
