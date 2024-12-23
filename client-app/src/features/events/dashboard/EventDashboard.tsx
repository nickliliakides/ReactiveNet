import { FC } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import Loading from '../../../app/layout/Loading';
import EventList from './EventList';
import EventFilters from './EventFilters';

const EventDashboard: FC = () => {
  const { eventStore } = useStore();
  const { isLoadingInitial } = eventStore;

  if (isLoadingInitial) {
    return <Loading content='Loading events...' />;
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
