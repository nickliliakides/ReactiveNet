import { FC } from 'react';
import {
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  Menu,
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { useStore } from '../stores/store';

const NavBar: FC = () => {
  const {
    userStore: { user, logout },
  } = useStore();
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
        <Menu.Item name='Errors' as={NavLink} to='/errors' />
        <Menu.Item>
          <Button
            positive
            content='Add Event'
            as={NavLink}
            to='/events/create'
          />
        </Menu.Item>
        {user && (
          <Menu.Item position='right'>
            <Image
              src={user?.image || '/assets/user.png'}
              avatar
              spaced='right'
            />
            <Dropdown pointing='top left' text={user?.displayName}>
              <DropdownMenu>
                <DropdownItem
                  as={Link}
                  to={`/profile/${user?.username}`}
                  text='My Profile'
                  icon='user'
                />
                <DropdownItem onClick={logout} text='Logout' icon='power' />
              </DropdownMenu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
