import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import { Link } from 'react-router-dom';
import ProfileCard from '../../profiles/ProfileCard';

const EventListItemAttendee: FC<{ attendees: Profile[] }> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map((att) => (
        <Popup
          key={att.username}
          hoverable
          trigger={
            <List.Item as={Link} to={`/profiles/${att.username}`}>
              <Image
                size='mini'
                circular
                src={att.image ?? '/assets/user.png'}
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={att} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
};

export default observer(EventListItemAttendee);
