import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import './styles.css';
import { Event } from '../models/event';
import NavBar from './NavBar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import agent from '../api/agent';
import Loading from './Loading';
import { useStore } from '../stores/store';

function App() {
  const { eventStore } = useStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const data = await agent.Events.list();

        setEvents(data);
      } catch (error) {
        console.log('🚀 ~ getActivities ~ error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getActivities();
  }, []);

  const handleSelectEvent = (id: string) => {
    const event = events.find((evt) => evt.id === id);
    setSelectedEvent(event);
    setIsFormOpen(false);
  };

  const openForm = () => {
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsEditMode(false);
    setIsFormOpen(false);
  };

  return (
    <>
      <NavBar
        openForm={() => {
          setSelectedEvent(undefined);
          setIsEditMode(false);
          setIsFormOpen(true);
        }}
      />
      <Container style={{ marginTop: '7rem' }}>
        <h2>{eventStore.title}</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <EventDashboard
            events={events}
            selectEvent={handleSelectEvent}
            deselectEvent={() => setSelectedEvent(undefined)}
            selectedEvent={selectedEvent}
            isFormOpen={isFormOpen}
            isEditMode={isEditMode}
            openForm={openForm}
            closeForm={closeForm}
          />
        )}
      </Container>
    </>
  );
}

export default App;
