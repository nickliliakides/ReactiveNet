import React, { FC, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import Loading from '../../../app/layout/Loading';
import EventList from './EventList';
import EventFilters from './EventFilters';

const EventDashboard: FC = () => {
  const { eventStore } = useStore();
  const { isLoadingInitial, loadEvents, eventRegistry } = eventStore;

  useEffect(() => {
    if (eventRegistry.size === 0) loadEvents();
  }, [loadEvents, eventRegistry]);

  if (isLoadingInitial) {
    return <Loading />;
  }

  return (
    <Grid style={{ marginBottom: '80px' }}>
      <Grid.Column width={10}>
        <EventList />
      </Grid.Column>
      <Grid.Column width={6} className='detailColumn'>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventDashboard);
