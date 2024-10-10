import React, { FC } from 'react';
import { Grid } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';
import EventList from './EventList';
import EventDetails from '../details/EventDetails';
import EventForm from '../form/EventForm';

interface EventDashboardProps {
  events: Event[];
  selectEvent: (id: string) => void;
  selectedEvent?: Event;
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (isOpen: boolean) => void;
}

const EventDashboard: FC<EventDashboardProps> = ({
  events,
  selectEvent,
  selectedEvent,
  isFormOpen,
  setIsFormOpen,
  isEditMode,
  setIsEditMode,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          selectedEventId={selectedEvent?.id}
        />
      </Grid.Column>
      {selectedEvent && (
        <Grid.Column width={6} className='detailColumn'>
          <EventDetails
            event={selectedEvent}
            openForm={() => {
              setIsEditMode(true);
              setIsFormOpen(true);
            }}
            closeForm={() => {
              setIsEditMode(false);
              setIsFormOpen(false);
            }}
          />
          <EventForm
            isEditMode={isEditMode}
            selectedEvent={selectedEvent}
            isFormOpen={isFormOpen}
            closeForm={() => setIsFormOpen(false)}
          />
        </Grid.Column>
      )}
      {!selectedEvent && isFormOpen && (
        <Grid.Column width={6} className='detailColumn'>
          <EventForm
            isEditMode={isEditMode}
            isFormOpen={isFormOpen}
            closeForm={() => setIsFormOpen(false)}
          />
        </Grid.Column>
      )}
    </Grid>
  );
};

export default EventDashboard;
