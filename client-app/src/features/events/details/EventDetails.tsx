import React, { FC } from 'react';
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Image,
  Button,
} from 'semantic-ui-react';
import { Event } from '../../../app/models/event';

interface EventDetailsProps {
  openForm: () => void;
  closeForm: () => void;
  event?: Event;
}

const EventDetails: FC<EventDetailsProps> = ({
  event,
  openForm,
  closeForm,
}) => {
  return event ? (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${event.category}.jpg`}
        wrapped
        ui={false}
      />
      <CardContent>
        <CardHeader>{event.title}</CardHeader>
        <CardMeta>
          <span className='date'>{event.date}</span>
        </CardMeta>
        <CardDescription>{event.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths='2'>
          <Button basic color='blue' content='Edit' onClick={openForm} />
          <Button basic color='grey' content='Cancel' onClick={closeForm} />
        </Button.Group>
      </CardContent>
    </Card>
  ) : null;
};

export default EventDetails;
