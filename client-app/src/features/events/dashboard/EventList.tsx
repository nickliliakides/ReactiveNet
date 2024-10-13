import { FC, Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import EventListItem from './EventListItem';

const EventList: FC = () => {
  const { eventStore } = useStore();
  const { groupedEvents } = eventStore;

  return (
    <>
      {groupedEvents.map(([group, events]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {events.map((evt) => (
            <EventListItem key={evt.id} event={evt} />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default observer(EventList);
