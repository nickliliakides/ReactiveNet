import { createContext, useContext } from 'react';
import EventStore from './eventStore';

interface Store {
  eventStore: EventStore;
}

export const store: Store = {
  eventStore: new EventStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
