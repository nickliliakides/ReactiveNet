import React, { FC } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import EventList from './EventList';
import EventForm from '../form/EventForm';
import EventDetails from '../details/EventDetails';

const EventDashboard: FC = () => {
  const { eventStore } = useStore();
  const { selectedEvent, isEditMode } = eventStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList />
      </Grid.Column>
      <Grid.Column width={6} className='detailColumn'>
        {selectedEvent && <EventDetails />}
        {selectedEvent || isEditMode ? <EventForm /> : null}
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventDashboard);
