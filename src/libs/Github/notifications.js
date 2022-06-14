import _ from 'lodash';
import {getOctokit} from './authentication';
import * as NotificationObservable from '../NotificationObservable';
import * as LocalStorageUtils from '../../utils/localStorage';
import CONST from '../../CONST';

let checkedNotificationSince = localStorage.getItem(CONST.LOCAL_STORAGE.CHECKED_NOTIFICATION_SINCE) || new Date().toUTCString();

/*
* Notifications come back as "threads". 
* A thread contains information about the current discussion of an issue, pull request, or commit
* https://docs.github.com/en/rest/activity/notifications#about-the-notifications-api
*/
function processNotification(notifications) {
    console.log('[NOTIFICATIONS]: Response: ', notifications);

    _.forEach(notifications, notification => {
        console.log('notification subject type', notification.subject.type);
        
        const applyNotificationStrategy = getNotificationStrategy[notification.subject.type] || function(){};
        applyNotificationStrategy(notification);
    });
}

function checkNotifications() {
    getOctokit().request('GET /notifications', {
        headers: {
            'If-Modified-Since': checkedNotificationSince,
        },
        accept: 'application/vnd.github.v3+json',
        participating: false,
    })
    .then(response => {
        if (response.status != 200) {
            return;
        }
        checkedNotificationSince = new Date().toUTCString();
        localStorage.setItem(CONST.LOCAL_STORAGE.CHECKED_NOTIFICATION_SINCE, checkedNotificationSince);
        processNotification(response.data);
    })
    .catch(err => {
        // This catch is needed because octokit.request() throws an error when status code is 304  
    });
}

function processIssue(notification) {
    
    const latestCommentURL = notification.subject.latest_comment_url.replace('https://api.github.com', '');
    getOctokit().request({
        method: 'GET',
        url: latestCommentURL,
    })
    .then(commentResponse => {
        if (commentResponse.status != 200) {
            return;
        }
        
        const details = {
            active: false,
            body: commentResponse.data.body,
            actor: {
                avatar_url: commentResponse.data.user.avatar_url,
                username: commentResponse.data.user.login,
                id: commentResponse.data.user.id,
            }
        }
        const notificationWithDetails = {...notification, ...details};
        const newNotifications = LocalStorageUtils.findAndReplaceNotificationById(notificationWithDetails);
        console.log('Processing issue: notification: ', notificationWithDetails);
        NotificationObservable.notify(newNotifications);
    })
    .catch(err => console.error(err));
}

function processPullRequest() {
    console.log('process pill request');
    // Three cases ?
    // 1. 
}

function processCommit() {
    console.log('process commit');
}

const getNotificationStrategy = {
    'PullRequest': processPullRequest,
    'Issue': processIssue,
    'Commit': processCommit,
};

export {
    checkNotifications,
};
