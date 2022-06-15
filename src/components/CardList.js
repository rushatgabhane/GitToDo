import * as Accordion from '@radix-ui/react-accordion';
import Card from './Card';
import _ from 'lodash';

function getCards(notifications) {
    const sortedNotifications = _.orderBy(notifications, ['updated_at'], ['desc']);
    console.log('Sorted notifications: ', sortedNotifications);

    return _.map(sortedNotifications, notification => 
        <Card
            key={`${notification.id}${notification.updated_at}`}
            notification={notification}
        />
    );
}

/*
    First 10 cards
    Keyboard nav between todo and done
*/
const CardList = props => {
    const toDoCards = getCards(props.toDo);
    const doneCards = getCards(props.done);
    console.log('redner here');
    return (
        <>
            <Accordion.Root type="single" collapsible className="w-full" style={{backgroundColor: 'pink'}}>
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>This is the trigger</Accordion.Trigger>
                    <Accordion.Content>Content here</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger>This is the trigger</Accordion.Trigger>
                    <Accordion.Content>Content here</Accordion.Content>
                </Accordion.Item>
                {
                    _.map(toDoCards, card => card)
                }
                {
                    _.map(doneCards, card => card)
                }
            </Accordion.Root>
        </>
    );
}

export default CardList;
