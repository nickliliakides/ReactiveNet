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

import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

const EventDetails: FC = () => {
  const { eventStore } = useStore();
  const { selectedEvent, openForm, isLoading, deleteEvent } = eventStore;

  const handleDelete = async () => {
    if (
      confirm(
        `Do you really want to delete '${selectedEvent?.title}' selectedEvent? You cannot undo this action.`
      ) &&
      selectedEvent
    ) {
      deleteEvent(selectedEvent.id);
    }
  };

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedEvent?.category}.jpg`}
        wrapped
        ui={false}
      />
      <CardContent>
        <CardHeader>{selectedEvent?.title}</CardHeader>
        <CardMeta>
          <span className='date'>{selectedEvent?.date}</span>
        </CardMeta>
        <CardDescription>{selectedEvent?.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths='2'>
          <Button
            color='blue'
            content='Edit'
            onClick={() => openForm(selectedEvent?.id)}
          />
          <Button
            loading={isLoading}
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

export default observer(EventDetails);
