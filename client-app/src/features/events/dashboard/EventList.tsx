import React, { FC } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';
import clsx from 'clsx';

interface EventListProps {
  events: Event[];
  selectEvent: (id: string) => void;
  selectedEventId?: string;
}

const EventList: FC<EventListProps> = ({
  events,
  selectEvent,
  selectedEventId,
}) => {
  return (
    <Segment>
      <Item.Group divided>
        {events.map((evt) => (
          <Item
            key={evt.id}
            className={clsx('eventItem', {
              active: selectedEventId === evt.id,
            })}
          >
            <Item.Content>
              <Item.Header as='a'>{evt.title}</Item.Header>
              <Item.Meta>{evt.date}</Item.Meta>
              <Item.Description>
                <div>{evt.description}</div>
                <div>
                  {evt.city}, {evt.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated='right'
                  content='View'
                  color='blue'
                  onClick={() => selectEvent(evt.id)}
                />
                <Label basic content={evt.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default EventList;
