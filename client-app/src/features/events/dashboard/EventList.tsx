import { FC } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import EventListItem from './EventListItem';

const EventList: FC = () => {
  const { eventStore } = useStore();
  const { eventsByDate } = eventStore;

  return (
    <Segment>
      <Item.Group divided>
        {eventsByDate.map((evt) => (
          <EventListItem key={evt.id} event={evt} />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(EventList);
