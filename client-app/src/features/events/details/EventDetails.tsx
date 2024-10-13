import { FC, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../../app/stores/store';
import Loading from '../../../app/layout/Loading';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

const EventDetails: FC = () => {
  const { id: eventId } = useParams();
  const { eventStore } = useStore();
  const { selectedEvent, loadEventById, isLoadingInitial } = eventStore;

  useEffect(() => {
    if (eventId) {
      loadEventById(eventId);
    }
  }, [eventId, loadEventById]);

  if (isLoadingInitial || !selectedEvent) {
    return <Loading />;
  }

  return (
    <Grid stackable>
      <Grid.Column width={10}>
        <EventDetailedHeader event={selectedEvent} />
        <EventDetailedInfo event={selectedEvent} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventDetails);
