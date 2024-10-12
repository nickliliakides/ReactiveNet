import { FC } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const NavBar: FC = () => {
  return (
    <Menu inverted fixed='top' className='mainNav'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Reactive.Net
        </Menu.Item>
        <Menu.Item name='Events' as={NavLink} to='/events' />
        <Menu.Item>
          <Button
            positive
            content='Add Event'
            as={NavLink}
            to='/events/create'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
