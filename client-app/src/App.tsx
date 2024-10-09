import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import './App.css';

function App() {
  const [activities, setActivities] = useState<{ title: string }[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/activities');
        console.log('🚀 ~ getActivities ~ data:', res);
        setActivities(res.data);
      } catch (error) {
        console.log('🚀 ~ getActivities ~ error:', error);
      }
    };

    getActivities();
  }, []);
  return (
    <>
      <Header as='h2' icon='globe' content='ReactiveNet' />
      <List>
        {activities.map((act) => (
          <List.Item key={act.title}>{act.title}</List.Item>
        ))}
      </List>
    </>
  );
}

export default App;
