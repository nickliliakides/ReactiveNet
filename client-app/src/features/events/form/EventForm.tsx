import { FC, useEffect, useRef, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Event } from '../../../app/models/event';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../app/layout/Loading';

const EventForm: FC = () => {
  const { eventStore } = useStore();
  const {
    selectedEvent,
    createEvent,
    updateEvent,
    isLoading,
    loadEventById,
    isLoadingInitial,
  } = eventStore;
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);

  // const resetValues = () => {
  //   titleRef.current!.value = '';
  //   descriptionRef.current!.value = '';
  //   categoryRef.current!.value = '';
  //   dateRef.current!.value = '';
  //   cityRef.current!.value = '';
  //   venueRef.current!.value = '';
  // };

  useEffect(() => {
    if (eventId) {
      if (!selectedEvent) {
        loadEventById(eventId);
      }
    }
    //  else {
    //   resetValues();
    // }
  }, [eventId, loadEventById, selectedEvent]);

  if (isLoadingInitial || (eventId && !selectedEvent)) {
    return <Loading />;
  }

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

    if (!eventId) {
      createEvent(eventToSubmit).then(() =>
        navigate(`/events/${eventToSubmit.id}`)
      );
    } else {
      updateEvent(eventToSubmit).then(() =>
        navigate(`/events/${eventToSubmit.id}`)
      );
    }
  };

  return (
    <Segment
      style={{
        minWidth: '600px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      clearing
    >
      <Form onSubmit={handleSubmit}>
        <Header
          style={{ margin: '1rem 0 2.2rem' }}
          as='h2'
          content={eventId ? 'Edit event' : 'Create a new event'}
        />
        <Form.Input
          ref={titleRef}
          placeholder='Title'
          defaultValue={eventId ? selectedEvent?.title : ''}
          required
        />
        <Form.TextArea
          ref={descriptionRef}
          placeholder='Description'
          defaultValue={eventId ? selectedEvent?.description : ''}
          required
        />
        <Form.Input
          ref={categoryRef}
          placeholder='Category'
          defaultValue={eventId ? selectedEvent?.category : ''}
          required
        />
        <Form.Input
          ref={dateRef}
          type='date'
          placeholder='Date'
          defaultValue={eventId ? selectedEvent?.date : ''}
          required
        />
        <Form.Input
          ref={cityRef}
          placeholder='City'
          defaultValue={eventId ? selectedEvent?.city : ''}
          required
        />
        <Form.Input
          ref={venueRef}
          placeholder='Venue'
          defaultValue={eventId ? selectedEvent?.venue : ''}
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
              icon='save'
            />
            <Button
              floated='right'
              type='button'
              content='Back'
              icon='arrow left'
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </Form>
    </Segment>
  );
};

export default observer(EventForm);
