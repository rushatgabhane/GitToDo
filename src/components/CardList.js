import * as Accordion from '@radix-ui/react-accordion';
import * as Collapsible from '@radix-ui/react-collapsible';

/*
    First 10 cards
    Keyboard nav between todo and done
*/
const CardList = (props) => {
    return (
            <>
                <Accordion.Root type="single" collapsible>
                    <Accordion.Item value="item-1">
                        <Accordion.Trigger>This is the trigger</Accordion.Trigger>
                        <Accordion.Content>Content here</Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-2">
                        <Accordion.Trigger>This is the trigger</Accordion.Trigger>
                        <Accordion.Content>Content here</Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-3">
                        <Accordion.Trigger>This is the trigger</Accordion.Trigger>
                        <Accordion.Content>Content here</Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-4">
                        <Accordion.Trigger>This is the trigger</Accordion.Trigger>
                        <Accordion.Content>Content here</Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </>
    );
}

export default CardList;
