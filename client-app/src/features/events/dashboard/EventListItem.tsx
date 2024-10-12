import React, { FC } from 'react';
import { Button, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Event } from '../../../app/models/event';

const EventListItem: FC<{ event: Event }> = ({ event }) => {
  return (
    <Item key={event.id} className='eventItem'>
      <Item.Content>
        <Item.Header as='a'>{event.title}</Item.Header>
        <Item.Meta>{event.date}</Item.Meta>
        <Item.Description>
          <div>{event.description}</div>
          <div>
            {event.city}, {event.venue}
          </div>
        </Item.Description>
        <Item.Extra>
          <Button
            as={Link}
            to={`/events/${event.id}`}
            floated='right'
            content='View'
            color='blue'
          />
          <Label basic content={event.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default EventListItem;
