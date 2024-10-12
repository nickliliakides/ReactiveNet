import React, { FC, useRef, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';
import Loading from '../../../app/layout/Loading';
import agent from '../../../app/api/agent';

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (eventId?: string) => {
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

    setIsSubmitting(true);
    setError(undefined);

    const eventToSubmit: Event = {
      id: isEditMode ? eventId! : crypto.randomUUID(),
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      category: categoryRef.current?.value,
      date: dateRef.current?.value,
      city: cityRef.current?.value,
      venue: venueRef.current?.value,
    };

    if (!isEditMode) {
      try {
        await agent.Events.create(eventToSubmit as Event);
      } catch (error) {
        console.log('🚀 ~ Create Event ~ error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        await agent.Events.update(eventToSubmit as Event);
      } catch (error) {
        console.log('🚀 ~ Update Event ~ error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
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
      {isSubmitting ? <Loading content='Saving...' /> : null}
    </Segment>
  ) : null;
};

export default EventForm;
