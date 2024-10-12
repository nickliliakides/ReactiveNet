import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import './styles.css';
import NavBar from './NavBar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import Loading from './Loading';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { eventStore } = useStore();
  const { isLoadingInitial } = eventStore;

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7rem' }}>
        {isLoadingInitial ? <Loading /> : <EventDashboard />}
      </Container>
    </>
  );
}

export default observer(App);
