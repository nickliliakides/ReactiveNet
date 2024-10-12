import React, { FC, useState } from 'react';
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
import agent from '../../../app/api/agent';

interface EventDetailsProps {
  event: Event;
  openForm: () => void;
  closeForm: () => void;
  deselectEvent: () => void;
}

const EventDetails: FC<EventDetailsProps> = ({
  event,
  openForm,
  closeForm,
  deselectEvent,
}) => {
  const [target, setTarget] = useState<string>();

  const handleDelete = async () => {
    setTarget(event?.id);
    if (
      confirm(
        `Do you really want to delete '${event?.title}' event? You cannot undo this action.`
      )
    ) {
      try {
        await agent.Events.delete(event?.id);
        deselectEvent();
        closeForm();
      } catch (error) {
        console.log('🚀 ~ Delete ~ error:', error);
      }
    }
  };

  return (
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
          <Button color='blue' content='Edit' onClick={openForm} />
          <Button
            loading={target === event.id}
            // basic
            color='red'
            content='Delete'
            onClick={handleDelete}
          />
        </Button.Group>
      </CardContent>
    </Card>
  );
};

export default EventDetails;
