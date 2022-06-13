import {getOctokit} from './authentication';
import _ from 'lodash';

let checkedNotificationSince = localStorage.getItem('checkedNotificationSince') || new Date().toUTCString();

/*
* Notifications come back as "threads". 
* A thread contains information about the current discussion of an issue, pull request, or commit
* https://docs.github.com/en/rest/activity/notifications#about-the-notifications-api
*/
function processNotification(notifications) {
    console.log('[NOTIFICATIONS]: Response: ', notifications);

    _.forEach(notifications, notification => {
        const applyStrategy = getStrategy[notification.subject.type] || function(){};
        console.log('notification subject type', notification.subject.type);
        console.log('strategy to apply' , applyStrategy);
        applyStrategy(notification);
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
        localStorage.setItem('checkedNotificationSince', checkedNotificationSince);
        processNotification(response.data);
    })
    .catch(err => {
        // This catch is needed because octokit.request() throws an error when status code is 304  
    });
}

function processIssue(notification) {
    console.log('Processing issue: notification: ', notification);
    const latestCommentURL = notification.subject.latest_comment_url.replace('https://api.github.com', '');
    getOctokit().request({
        method: 'GET',
        url: latestCommentURL,
    })
    .then(response => {
        if (response.status != 200) {
            return;
        }
        console.log('Response Body: ', response.data.body);
    })
    .catch(err => console.error(err));
}

function processPullRequest() {
    console.log('process pill request');
}

function processCommit() {
    console.log('process commit');
}

const getStrategy = {
    'PullRequest': processPullRequest,
    'Issue': processIssue,
    'Commit': processCommit,
};

export {
    checkNotifications,
};
