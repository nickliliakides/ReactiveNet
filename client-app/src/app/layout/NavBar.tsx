import React, { FC } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface NavBarProps {
  openForm: () => void;
}

const NavBar: FC<NavBarProps> = ({ openForm }) => {
  return (
    <Menu inverted fixed='top' className='mainNav'>
      <Container>
        <Menu.Item header>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Reactive.Net
        </Menu.Item>
        <Menu.Item name='Events' />
        <Menu.Item>
          <Button positive content='Add Event' onClick={openForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;