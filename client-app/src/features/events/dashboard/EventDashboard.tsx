import React, { FC } from 'react';
import { Grid } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';
import EventList from './EventList';
import EventForm from '../form/EventForm';
import EventDetails from '../details/EventDetails';

interface EventDashboardProps {
  events: Event[];
  selectEvent: (id: string) => void;
  deselectEvent: () => void;
  isFormOpen: boolean;
  isEditMode: boolean;
  selectedEvent?: Event;
  openForm: () => void;
  closeForm: () => void;
}

const EventDashboard: FC<EventDashboardProps> = ({
  events,
  selectEvent,
  deselectEvent,
  selectedEvent,
  isFormOpen,
  isEditMode,
  openForm,
  closeForm,
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
      {!selectedEvent && isFormOpen && (
        <Grid.Column width={6} className='detailColumn'>
          <EventForm
            isEditMode={isEditMode}
            isFormOpen={isFormOpen}
            closeForm={closeForm}
          />
        </Grid.Column>
      )}
      {selectedEvent && (
        <Grid.Column width={6} className='detailColumn'>
          <EventDetails
            event={selectedEvent}
            openForm={openForm}
            closeForm={closeForm}
            deselectEvent={deselectEvent}
          />
          <EventForm
            isEditMode={isEditMode}
            selectedEvent={selectedEvent}
            isFormOpen={isFormOpen}
            closeForm={closeForm}
          />
        </Grid.Column>
      )}
    </Grid>
  );
};

export default EventDashboard;
