import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { EventFormValues } from '../../../app/models/event';
import Loading from '../../../app/layout/Loading';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import {
  categoryOptions,
  formStyles,
  eventFormValidationSchema,
} from '../../../app/common/constants';

const EventForm: FC = () => {
  const { eventStore } = useStore();
  const {
    createEvent,
    updateEvent,
    isLoading,
    loadEventById,
    isLoadingInitial,
  } = eventStore;
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const [eventForm, setEventForm] = useState<EventFormValues>(
    new EventFormValues()
  );

  useEffect(() => {
    if (eventId)
      loadEventById(eventId).then((event) => {
        setEventForm(new EventFormValues(event));
      });
  }, [eventId, loadEventById]);

  if (isLoadingInitial) {
    return <Loading />;
  }

  const handleFormSubmit = async (formdata: EventFormValues) => {
    if (!eventId) {
      createEvent(formdata).then(() => navigate(`/events/${formdata.id}`));
    } else {
      updateEvent(formdata).then(() => navigate(`/events/${formdata.id}`));
    }
  };

  return eventForm ? (
    <Segment style={formStyles} clearing>
      <Formik
        validationSchema={eventFormValidationSchema}
        enableReinitialize
        initialValues={eventForm}
        onSubmit={(formdata) => handleFormSubmit(formdata)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <Header
              style={{ margin: '1rem 0 2.2rem' }}
              as='h2'
              content={eventId ? 'Edit event' : 'Create a new event'}
              color='teal'
            />
            <TextInput name='title' placeholder='Title' />
            <TextArea name='description' placeholder='Description' />
            <SelectInput
              options={categoryOptions}
              name='category'
              placeholder='Category'
            />
            <DateInput name='date' placeholder='Date' />
            <TextInput name='city' placeholder='City' />
            <TextInput name='venue' placeholder='Venue' />
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div>
                <Button
                  loading={isLoading}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                  icon='save'
                  disabled={isSubmitting || !dirty || !isValid}
                />
                <Button
                  floated='right'
                  type='button'
                  content='Back'
                  icon='arrow left'
                  onClick={() => {
                    navigate(eventId ? `/events/${eventId}` : '/events');
                  }}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Segment>
  ) : null;
};

export default observer(EventForm);
