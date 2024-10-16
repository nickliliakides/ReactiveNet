import { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import AuthForm from '../Users/AuthForm';

const HomePage: FC = () => {
  const {
    userStore: { isLoggedIn },
    modalStore: { openModal },
  } = useStore();
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Reactive.Net
        </Header>
        <Header
          as='h2'
          inverted
          content='Welcome to Reactive.Net. A great space you can host and attend amazing events!'
        />

        {!isLoggedIn ? (
          <>
            <Button
              onClick={() => openModal(<AuthForm />)}
              size='huge'
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => openModal(<AuthForm isSignUp />)}
              size='huge'
              inverted
            >
              Sign Up
            </Button>
          </>
        ) : (
          <Button as={Link} to='/events' size='huge' inverted>
            {isLoggedIn ? 'Go to Events' : 'Login'}
          </Button>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
