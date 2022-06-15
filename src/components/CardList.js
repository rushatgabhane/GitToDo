import * as Accordion from '@radix-ui/react-accordion';
import _ from 'lodash';
import Card from './Card';

function getCards(notifications) {
    const sortedNotifications = _.orderBy(notifications, ['updated_at'], ['desc']);
    console.log('Sorted notifications: ', sortedNotifications);

    return _.map(sortedNotifications, notification => (
        <Card
            key={`${notification.id}${notification.updated_at}`}
            notification={notification}
        />
    ));
}

/*
    First 10 cards
    Keyboard nav between todo and done
*/
const CardList = (props) => {
    const toDoCards = getCards(props.toDo);
    const doneCards = getCards(props.done);
    console.log('redner here');
    return (
        <>
            <Accordion.Root type="single" collapsible className="w-full" style={{backgroundColor: 'pink'}}>
                {getCards(props.toDo)}
                {getCards(props.done)}
            </Accordion.Root>
        </>
    );
};

export default CardList;
