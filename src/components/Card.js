import * as Accordion from '@radix-ui/react-accordion';

const Card = props => (
    <Accordion.Item value={`${props.notification.id}${props.notification.updated_at}`}>
        <Accordion.Trigger>{props.notification.id}</Accordion.Trigger>
        <Accordion.Content>{props.notification.body}</Accordion.Content>
    </Accordion.Item>
);

export default Card;
