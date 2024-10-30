import { FC } from 'react';
import { format } from 'date-fns';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Event } from '../../../app/models/event';
import EventListItemAttendee from './EventListItemAttendee';

const EventListItem: FC<{ event: Event }> = ({ event }) => {
  return (
    <Segment.Group>
      <Segment>
        {event.isCancelled && (
          <Label
            attached='top'
            color='red'
            content='Cancelled'
            style={{ textAlign: 'center' }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 3 }}
              size='tiny'
              circular
              src='/assets/user.png'
            />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>
                {event.title}
              </Item.Header>
              <Item.Description>
                Hosted by {event.host?.displayName}
              </Item.Description>
              {event.isHost && (
                <Item.Description>
                  <Label basic color='orange'>
                    You are hosting this event
                  </Label>
                </Item.Description>
              )}
              {!event.isHost && event.isGoing && (
                <Item.Description>
                  <Label basic color='green'>
                    You are going to this event
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />
          {format(event.date!, 'dd MMM yyyy h:mm aa')}
          <Icon style={{ marginLeft: '1rem' }} name='marker' />
          {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <EventListItemAttendee attendees={event.attendees ?? []} />
      </Segment>
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
