import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import './styles.css';
import { Event } from '../models/event';
import NavBar from './NavBar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const res = await axios.get<Event[]>(
          'http://localhost:5000/api/activities'
        );

        setEvents(res.data);
      } catch (error) {
        console.log('🚀 ~ getActivities ~ error:', error);
      }
    };

    getActivities();
  }, []);

  const handleSelectEvent = (id: string) => {
    const event = events.find((evt) => evt.id === id);
    setSelectedEvent(event);
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
        <EventDashboard
          events={events}
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      </Container>
    </>
  );
}

export default App;
