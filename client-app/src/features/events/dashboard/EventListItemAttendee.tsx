import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Image, List } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import { Link } from 'react-router-dom';

const EventListItemAttendee: FC<{ attendees: Profile[] }> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map((att) => (
        <List.Item
          key={att.username}
          as={Link}
          to={`/profiles/${att.username}`}
        >
          <Image size='mini' circular src={att.image ?? '/assets/user.png'} />
        </List.Item>
      ))}
    </List>
  );
};

export default observer(EventListItemAttendee);
