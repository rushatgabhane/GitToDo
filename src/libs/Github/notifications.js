import {getOctokit} from './authentication';

const octokit = getOctokit();
let checkedNotificationSince = localStorage.getItem('checkedNotificationSince') || new Date().toUTCString();

async function getNotifications() {
    try {
        const response = await octokit.request('GET /notifications', {
            headers: {
                'If-Modified-Since': checkedNotificationSince,
            },
            accept: 'application/vnd.github.v3+json',
            participating: false,
        });
        if (response.status === 200) {
            checkedNotificationSince = new Date().toUTCString();
            localStorage.setItem('checkedNotificationSince', checkedNotificationSince);
        }
        console.log('[NOTIFICATIONS]: Response: ', response);
    } catch (error) {
        // console.error(error);
    }
}

export {
    getNotifications,
};
