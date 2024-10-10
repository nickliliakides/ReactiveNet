import React, { FC, useRef, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';

interface EventFormProps {
  isEditMode: boolean;
  isFormOpen: boolean;
  selectedEvent?: Event;
  closeForm: () => void;
}

const EventForm: FC<EventFormProps> = ({
  isEditMode,
  isFormOpen,
  selectedEvent,
  closeForm,
}) => {
  const [error, setError] = useState<string>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (eventId?: string) => {
    if (
      !titleRef.current?.value ||
      !descriptionRef.current?.value ||
      !categoryRef.current?.value ||
      !dateRef.current?.value ||
      !cityRef.current?.value ||
      !venueRef.current?.value
    ) {
      setError('Invalid input. Please fill all fields.');
      return;
    }

    setError(undefined);

    let eventToSubmit: Partial<Event> = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      category: categoryRef.current?.value,
      date: dateRef.current?.value,
      city: cityRef.current?.value,
      venue: venueRef.current?.value,
    };
    if (eventId) {
      eventToSubmit = { ...eventToSubmit, id: crypto.randomUUID() };
    }
    console.log(eventToSubmit);
  };

  return isFormOpen ? (
    <Segment clearing>
      <Form onSubmit={() => handleSubmit(selectedEvent?.id)}>
        {!isEditMode && <Header as='h2' content='Create a new event' />}
        <Form.Input
          ref={titleRef}
          placeholder='Title'
          defaultValue={isEditMode ? selectedEvent?.title : undefined}
          required
        />
        <Form.TextArea
          ref={descriptionRef}
          placeholder='Description'
          defaultValue={isEditMode ? selectedEvent?.description : undefined}
          required
        />
        <Form.Input
          ref={categoryRef}
          placeholder='Category'
          defaultValue={isEditMode ? selectedEvent?.category : undefined}
          required
        />
        <Form.Input
          ref={dateRef}
          placeholder='Date'
          defaultValue={isEditMode ? selectedEvent?.date : undefined}
          required
        />
        <Form.Input
          ref={cityRef}
          placeholder='City'
          defaultValue={isEditMode ? selectedEvent?.city : undefined}
          required
        />
        <Form.Input
          ref={venueRef}
          placeholder='Venue'
          defaultValue={isEditMode ? selectedEvent?.venue : undefined}
          required
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <Button floated='right' positive type='submit' content='Submit' />
            <Button
              floated='right'
              type='button'
              content='Cancel'
              onClick={closeForm}
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </Form>
    </Segment>
  ) : null;
};

export default EventForm;
