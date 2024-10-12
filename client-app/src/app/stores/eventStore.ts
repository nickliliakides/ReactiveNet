import { makeObservable, observable } from 'mobx';

export default class EventStore {
  title = 'Hello from MobX';

  constructor() {
    makeObservable(this, {
      title: observable,
    });
  }
}
