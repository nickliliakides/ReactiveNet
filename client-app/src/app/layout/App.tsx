import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';
import './styles.css';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import Modal from '../common/modal/Modal';
import Loading from './Loading';

function App() {
  const location = useLocation();
  const {
    commonStore: { token, setAppLoaded, isAppLoaded },
    userStore: { getUser },
  } = useStore();

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, setAppLoaded, getUser]);

  if (!isAppLoaded) return <Loading />;

  return (
    <>
      <Modal />
      <ToastContainer position='bottom-right' theme='colored' />
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
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
