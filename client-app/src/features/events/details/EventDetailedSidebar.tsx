import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Segment, List, Label, Item, Image } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';

const EventDetailedSidebar: FC<{ event: Event }> = ({
  event: { attendees, host },
}) => {
  return attendees ? (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length}
        {attendees.length === 1 ? ' person ' : ' people '}
        going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((att) => (
            <Item key={att.username} style={{ position: 'relative' }}>
              {att.username === host?.username && (
                <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'
                >
                  Host
                </Label>
              )}
              <Image size='tiny' src={att.image ?? '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profiles/${att.username}`}>
                    {att.displayName}
                  </Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  ) : null;
};

export default observer(EventDetailedSidebar);
