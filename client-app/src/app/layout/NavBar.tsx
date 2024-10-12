import React, { FC } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

const NavBar: FC = () => {
  const { eventStore } = useStore();
  const { openForm, closeForm } = eventStore;

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
          <Button
            positive
            content='Add Event'
            onClick={() => {
              closeForm();
              setTimeout(() => {
                openForm();
              }, 100);
            }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
