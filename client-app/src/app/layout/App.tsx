import { Container } from 'semantic-ui-react';
import './styles.css';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '8rem' }}>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);
