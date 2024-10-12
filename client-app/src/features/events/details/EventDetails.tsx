import { FC, useEffect } from 'react';
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Image,
  Button,
} from 'semantic-ui-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../../app/stores/store';
import Loading from '../../../app/layout/Loading';

const EventDetails: FC = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const { eventStore } = useStore();
  const {
    selectedEvent,
    isLoading,
    deleteEvent,
    loadEventById,
    isLoadingInitial,
  } = eventStore;

  useEffect(() => {
    if (eventId) {
      loadEventById(eventId);
    }
  }, [eventId, loadEventById]);

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

  if (isLoadingInitial || !selectedEvent) {
    return <Loading />;
  }

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
      <CardContent
        extra
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          type='button'
          content='Back'
          icon='arrow left'
          onClick={() => {
            navigate(-1);
          }}
        />
        <div style={{ marginLeft: 'auto' }}>
          <Button
            color='blue'
            content='Edit'
            icon='edit'
            as={Link}
            to={`/events/edit/${selectedEvent.id}`}
            // onClick={() => openForm(selectedEvent?.id)}
          />
          <Button
            loading={isLoading}
            color='red'
            content='Delete'
            icon='trash'
            onClick={handleDelete}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default observer(EventDetails);
