import React, { FC, useRef, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Event } from '../../../app/models/event';
import { observer } from 'mobx-react-lite';

const EventForm: FC = () => {
  const { eventStore } = useStore();
  const {
    selectedEvent,
    isEditMode,
    closeForm,
    createEvent,
    updateEvent,
    isLoading,
  } = eventStore;
  const [error, setError] = useState<string>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
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

    const eventToSubmit: Event = {
      id: selectedEvent ? selectedEvent.id! : crypto.randomUUID(),
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      category: categoryRef.current?.value,
      date: dateRef.current?.value,
      city: cityRef.current?.value,
      venue: venueRef.current?.value,
    };
    console.log('🚀 ~ handleSubmit ~ eventToSubmit:', eventToSubmit);

    if (!selectedEvent) {
      createEvent(eventToSubmit);
    } else {
      updateEvent(eventToSubmit);
    }
  };

  return isEditMode ? (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        {!selectedEvent && <Header as='h2' content='Create a new event' />}
        <Form.Input
          ref={titleRef}
          placeholder='Title'
          defaultValue={selectedEvent ? selectedEvent?.title : ''}
          required
        />
        <Form.TextArea
          ref={descriptionRef}
          placeholder='Description'
          defaultValue={selectedEvent ? selectedEvent?.description : ''}
          required
        />
        <Form.Input
          ref={categoryRef}
          placeholder='Category'
          defaultValue={selectedEvent ? selectedEvent?.category : ''}
          required
        />
        <Form.Input
          ref={dateRef}
          type='date'
          placeholder='Date'
          defaultValue={selectedEvent ? selectedEvent?.date : ''}
          required
        />
        <Form.Input
          ref={cityRef}
          placeholder='City'
          defaultValue={selectedEvent ? selectedEvent?.city : ''}
          required
        />
        <Form.Input
          ref={venueRef}
          placeholder='Venue'
          defaultValue={selectedEvent ? selectedEvent?.venue : ''}
          required
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <Button
              loading={isLoading}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
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

export default observer(EventForm);
