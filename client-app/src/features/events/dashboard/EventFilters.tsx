import { FC } from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

const EventFilters: FC = () => {
  return (
    <>
      {' '}
      <Menu vertical size='large' style={{ width: '100%', marginTop: '26px' }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item content='All Events' />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
};

export default EventFilters;
