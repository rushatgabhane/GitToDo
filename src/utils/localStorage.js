import _ from 'lodash';
import CONST from '../CONST';

// Get all notifications from local storage
// Find in object by id, if it exists delete it.
// Insert new notif to object
// Insert new obj to storage
function findAndReplaceNotificationById(newNotification) {
    if (!newNotification || !newNotification.id) {
        return;
    }

    const oldNotifications = JSON.parse(localStorage.getItem(CONST.LOCAL_STORAGE.NOTIFICATIONS));
    const withoutNewNotification = _.filter(oldNotifications,
        notification => notification.id !== newNotification.id);
    const newNotifications = [
        ...withoutNewNotification,
        newNotification,
    ];
    localStorage.setItem(CONST.LOCAL_STORAGE.NOTIFICATIONS, JSON.stringify(newNotifications));
    return newNotifications;
}

export {
    findAndReplaceNotificationById,
};
