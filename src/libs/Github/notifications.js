import _ from 'lodash';
import {getOctokit} from './authentication';
import * as NotificationObservable from '../NotificationObservable';
import * as LocalStorageUtils from '../../utils/localStorage';
import * as Utils from '../../utils';
import CONST from '../../CONST';

let checkedNotificationSince = localStorage.getItem(CONST.LOCAL_STORAGE.CHECKED_NOTIFICATION_SINCE) || new Date().toUTCString();

/*
* Notifications come back as "threads".
* A thread contains information about the current discussion of an issue, pull request, or commit
* https://docs.github.com/en/rest/activity/notifications#about-the-notifications-api
*/
function processNotification(notifications) {
    _.forEach(notifications, (notification) => {
        console.log('notification subject type', notification.subject.type);

        const applyNotificationStrategy = getNotificationStrategy[notification.subject.type] || function () {};
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
        .then((response) => {
            if (response.status != 200) {
                return;
            }
            checkedNotificationSince = new Date().toUTCString();
            localStorage.setItem(CONST.LOCAL_STORAGE.CHECKED_NOTIFICATION_SINCE, checkedNotificationSince);
            processNotification(response.data);
        })
        .catch((err) => {
        // This catch is needed because octokit.request() throws an error when status code is 304
        });
}

async function processIssue(notification) {
    const commentDetails = await getCommentDetails(Utils.stripGithubFromURL(notification.subject.latest_comment_url));
    const notificationWithDetails = {
        is_done: false,
        ...notification,
        ...commentDetails,
    };
    const updatedNotifications = LocalStorageUtils.findAndReplaceNotificationById(notificationWithDetails);
    NotificationObservable.notify(updatedNotifications);
}

async function processPullRequest(notification) {
    const [commentDetails, pullRequestDetails] = await Promise.all([
        getCommentDetails(Utils.stripGithubFromURL(notification.subject.latest_comment_url)),
        getPullRequestDetails(Utils.stripGithubFromURL(notification.subject.url)),
    ]) 
    const notificationWithDetails = {
        is_done: false,
        ...notification,
        ...commentDetails,
        ...pullRequestDetails,
    };
    const updatedNotifications = LocalStorageUtils.findAndReplaceNotificationById(notificationWithDetails);
    NotificationObservable.notify(updatedNotifications);
}

async function getCommentDetails(commentURL) {
    return getOctokit().request({
        method: 'GET',
        url: commentURL,
    })
        .then(commentResponse => {
            if (commentResponse.status != 200) {
                return;
            }
            return {
                body: commentResponse.data.body,
                actor: {
                    avatar_url: commentResponse.data.user.avatar_url,
                    username: commentResponse.data.user.login,
                    id: commentResponse.data.user.id,
                },
            };
        })
        .catch(err => console.error(err));
}

async function getPullRequestDetails(pullRequestURL) {
    return getOctokit().request({
        method: 'GET',
        url: pullRequestURL,
    })
        .then(pullRequestResponse => {
            if (pullRequestResponse.status != 200) {
                return;
            }

            return {
                draft: pullRequestResponse.data.draft,
                state: pullRequestResponse.data.state,
            };
        })
        .catch(err => console.error(err));
}

function processCommit() {
    console.log('process commit');
}

const getNotificationStrategy = {
    PullRequest: processPullRequest,
    Issue: processIssue,
    Commit: processCommit,
};

export {
    checkNotifications,
};
