import { Profile } from './profile';

export interface IEvent {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attendees?: Profile[];
}

export class Event implements IEvent {
  constructor(init: EventFormValues) {
    this.id = init.id!;
    this.title = init.title;
    this.date = init.date;
    this.description = init.description;
    this.category = init.category;
    this.city = init.city;
    this.venue = init.venue;
    this.hostUsername = '';
    this.isCancelled = false;
    this.isGoing = false;
    this.isHost = false;
  }

  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attendees?: Profile[];
}

export class EventFormValues {
  id?: string = crypto.randomUUID();
  title: string = '';
  date: Date | null = null;
  description: string = '';
  category: string = '';
  city: string = '';
  venue: string = '';

  constructor(event?: EventFormValues) {
    if (event) {
      this.id = event.id;
      this.title = event.title;
      this.date = event.date;
      this.description = event.description;
      this.category = event.category;
      this.city = event.city;
      this.venue = event.venue;
    }
  }
}
