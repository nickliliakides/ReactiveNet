import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';
import { EventDetailedProps } from './EventDetailedHeader';

const EventDetailedInfo: FC<EventDetailedProps> = ({ event }) => (
  <Segment.Group>
    <Segment attached>
      <Grid verticalAlign='middle'>
        <Grid.Column width={1}>
          <Icon name='calendar' size='large' color='teal' />
        </Grid.Column>
        <Grid.Column width={15}>
          <span>{format(event.date!, 'dd MMM yyyy h:mm aa')}</span>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment attached>
      <Grid verticalAlign='middle'>
        <Grid.Column width={1}>
          <Icon name='marker' size='large' color='teal' />
        </Grid.Column>
        <Grid.Column width={11}>
          <span>
            {event.venue}, {event.city}
          </span>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>
      <Grid>
        <Grid.Column width={1}>
          <Icon size='large' color='teal' name='info' />
        </Grid.Column>
        <Grid.Column width={15}>
          <p>{event.description}</p>
        </Grid.Column>
      </Grid>
    </Segment>
  </Segment.Group>
);

export default observer(EventDetailedInfo);
