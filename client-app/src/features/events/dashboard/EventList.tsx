import React, { FC } from 'react';
import clsx from 'clsx';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';

const EventList: FC = () => {
  const { eventStore } = useStore();
  const { eventsByDate, selectEvent, selectedEvent, closeForm } = eventStore;

  return (
    <Segment>
      <Item.Group divided>
        {eventsByDate.map((evt) => (
          <Item
            key={evt.id}
            className={clsx('eventItem', {
              active: selectedEvent?.id === evt.id,
            })}
          >
            <Item.Content>
              <Item.Header as='a'>{evt.title}</Item.Header>
              <Item.Meta>{evt.date}</Item.Meta>
              <Item.Description>
                <div>{evt.description}</div>
                <div>
                  {evt.city}, {evt.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated='right'
                  content='View'
                  color='blue'
                  onClick={() => {
                    selectEvent(evt.id);
                    closeForm();
                  }}
                />
                <Label basic content={evt.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(EventList);
