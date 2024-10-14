import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';
import './styles.css';

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer position='bottom-right' theme='colored' />
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          {' '}
          <NavBar />
          <Container style={{ marginTop: '8rem' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
