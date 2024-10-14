import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        The page you are looking for could not be found :(
      </Header>
      <Segment.Inline>
        <Button as={Link} to='events'>
          Return to events page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
