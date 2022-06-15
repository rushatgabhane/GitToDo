import * as Accordion from '@radix-ui/react-accordion';
import Markdown from 'react-markdown';
import issueOpen from '../../public/images/issue-open.svg';
import prOpen from '../../public/images/pr-open.svg';
import prMerged from '../../public/images/pr-merged.svg';
import * as Utils from '../utils';
import CONST from '../CONST';

const Card = (props) => {
    function toggleDone(e) {
        e.preventDefault();
        props.toggleDone(props.notification.id);
    }

    function openInTab(e) {
        if (props.notification.is_done) {
            return;
        }

        props.toggleDone(props.notification.id);
    }

    function getIssueOrPrIcon() {
        if (props.notification.subject.type === CONST.NOTIFICATION_TYPE.ISSUE) {
            return issueOpen;
        }
        if (props.notification.state === 'open') {
            return prOpen;
        }
        return prMerged;
    }

    return (
        <Accordion.Item
            value={`${props.notification.id}${props.notification.updated_at}`}
            className="px-3 py-3 border-y-2"
        >
            <Accordion.Trigger
                className="w-full h-17 text-left"
            >
                <div className="flex">
                    <div className="mr-1 pr-4">
                        <img className="m-auto" src={getIssueOrPrIcon()} height={20} width={20} />
                        <h3 className="text-xs mt-2 text-center">{`${Utils.getIssueOrPullRequestNumber(props.notification.subject.url, props.notification.subject.type)}`}</h3>
                    </div>
                    <div className="truncate">
                        <div className="flex justify-between">
                            <div className="flex">
                                <h3 className="truncate text-xs mr-1">Activity by</h3>
                                <h3 className="truncate text-xs mr-1 text-pink">{`${props.notification.actor.username}`}</h3>
                                <h3 className="truncate text-xs">{`in ${props.notification.repository.name}`}</h3>
                            </div>
                            <div>
                                <a href={Utils.apiURLToGithubURL(props.notification.subject.url, props.notification.subject.type)} onClick={openInTab} target="_blank" rel="noreferrer">
                                    <button className="px-1 right-0 hover:bg-darkGrey text-xs text-blue">Open</button>
                                </a>
                                <button className="px-1 hover:bg-darkGrey text-xs text-blue" onClick={toggleDone}>
                                    {props.notification.is_done ? 'Undone' : 'Done'}
                                </button>
                            </div>
                        </div>
                        <h2 className="truncate font-bold">{props.notification.subject.title}</h2>
                    </div>
                </div>
                <h3 className="truncate text-sm pt-2">{props.notification.body}</h3>
            </Accordion.Trigger>
            <Accordion.Content
                className="bg-darkGrey break-words p-3 rounded-md"
            >
                <Markdown>
                    {props.notification.body}
                </Markdown>
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default Card;
