import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react';
import { format } from 'date-fns';
import { Event } from '../../../app/models/event';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

const EventImageStyle = {
  filter: 'brightness(30%)',
};

const EventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export interface EventDetailedProps {
  event: Event;
}

const EventDetailedHeader: FC<EventDetailedProps> = ({ event }) => {
  const navigate = useNavigate();
  const { eventStore } = useStore();
  const { updateAttendance, deleteEvent, isLoading } = eventStore;

  const handleDelete = async () => {
    if (
      confirm(
        `Do you really want to delete '${event.title}' selectedEvent? You cannot undo this action.`
      ) &&
      event
    ) {
      deleteEvent(event.id).then(() => navigate('/events'));
    }
  };

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={EventImageStyle}
        />
        <Segment style={EventImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{format(event.date!, 'dd MMM yyyy')}</p>
                <p>
                  Hosted by{' '}
                  <strong>
                    <Link to={`/profiles/${event.host?.username}`}>
                      {event.host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment style={{ display: 'flex' }} clearing attached='bottom'>
        {event.isGoing ? (
          <Button
            loading={isLoading}
            onClick={updateAttendance}
            icon='remove user'
            content='Cancel attendance'
          />
        ) : (
          <Button
            loading={isLoading}
            onClick={updateAttendance}
            icon='add user'
            color='teal'
            content='Join event'
          />
        )}
        <div style={{ marginLeft: 'auto' }}>
          <Button
            type='button'
            content='Back'
            icon='arrow left'
            onClick={() => {
              navigate('/events');
            }}
          />
          {event.isHost && (
            <>
              <Button
                color='blue'
                content='Edit'
                icon='edit'
                as={Link}
                to={`/events/edit/${event.id}`}
              />
              <Button
                loading={isLoading}
                color='red'
                content='Delete'
                icon='trash'
                onClick={handleDelete}
              />
            </>
          )}
        </div>
      </Segment>
    </Segment.Group>
  );
};

export default observer(EventDetailedHeader);
