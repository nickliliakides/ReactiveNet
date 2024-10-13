import { FC } from 'react';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Event } from '../../../app/models/event';

const EventListItem: FC<{ event: Event }> = ({ event }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>
                {event.title}
              </Item.Header>
              <Item.Description>Hosted by Nick</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />
          {event.date}
          <Icon style={{ marginLeft: '1rem' }} name='marker' />
          {event.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>
          <Button
            as={Link}
            to={`/events/${event.id}`}
            color='teal'
            floated='right'
            content='View'
          />
        </span>
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
