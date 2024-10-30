import { configure, makeAutoObservable, runInAction } from 'mobx';
import { Event, EventFormValues } from '../models/event';
import agent from '../api/agent';
import { format } from 'date-fns';
import { store } from './store';
import { UserProfile } from '../models/profile';

configure({
  useProxies: 'never',
});

export default class EventStore {
  eventRegistry = new Map<string, Event>();
  selectedEvent: Event | undefined = undefined;
  isEditMode = false;
  isLoading = false;
  isLoadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get eventsByDate() {
    return Array.from(this.eventRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedEvents() {
    return Object.entries(
      this.eventsByDate.reduce((events, evt) => {
        const date = format(evt.date!, 'dd MMM yyyy');
        events[date] = events[date] ? [...events[date], evt] : [evt];
        return events;
      }, {} as { [key: string]: Event[] })
    );
  }

  private getEvent = (id: string) => {
    return this.eventRegistry.get(id);
  };

  private setEvent = (event: Event) => {
    const user = store.userStore.user;
    if (user) {
      event.isGoing = event.attendees!.some(
        (att) => att.username === user.username
      );
      event.isHost = event.hostUsername === user.username;
      event.host = event.attendees!.find(
        (att) => att.username === event.hostUsername
      );
    }
    event.date = new Date(event.date!);
    this.eventRegistry.set(event.id, event);
  };

  loadEvents = async () => {
    this.setIsLoadingInitial(true);
    try {
      const events = await agent.Events.list();
      events.forEach((evt) => {
        this.setEvent(evt);
      });
    } catch (error) {
      console.log('🚀 ~ EventStore ~ loadEvents ~ error:', error);
    } finally {
      this.setIsLoadingInitial(false);
    }
  };

  loadEventById = async (id: string) => {
    let event = this.getEvent(id);
    if (event) {
      this.selectedEvent = event;
    } else {
      this.setIsLoadingInitial(true);
      try {
        event = await agent.Events.details(id);
        this.setEvent(event);
        runInAction(() => {
          this.selectedEvent = event;
        });
      } catch (error) {
        console.log('🚀 ~ EventStore ~ loadEventById ~ error:', error);
      } finally {
        this.setIsLoadingInitial(false);
      }
    }
    return event && { ...event, date: new Date(event.date!) };
  };

  setIsLoadingInitial = (loading: boolean) => {
    this.isLoadingInitial = loading;
  };

  createEvent = async (event: EventFormValues) => {
    this.isLoading = true;
    const user = store.userStore.user;
    const attendee = new UserProfile(user!);
    try {
      await agent.Events.create(event);
      const newEvent = new Event(event);
      newEvent.hostUsername = user!.username;
      newEvent.attendees = [attendee];
      this.setEvent(newEvent);
      runInAction(() => {
        this.selectedEvent = newEvent;
        // this.isEditMode = false;
      });
    } catch (error) {
      console.log('🚀 ~ EventStore ~ createEvent ~ error:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateEvent = async (event: EventFormValues) => {
    this.isLoading = true;
    try {
      await agent.Events.update(event);
      runInAction(() => {
        if (event.id) {
          const updatedEvent = { ...this.getEvent(event.id), ...event };
          this.eventRegistry.set(event.id, updatedEvent as Event);
          this.selectedEvent = updatedEvent as Event;
        }

        // this.isEditMode = false;
      });
    } catch (error) {
      console.log('🚀 ~ EventStore ~ createEven ~ error:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  deleteEvent = async (id: string) => {
    this.isLoading = true;
    try {
      await agent.Events.delete(id);
      runInAction(() => {
        this.eventRegistry.delete(id);
        // this.selectedEvent = undefined;
        // this.isEditMode = false;
      });
    } catch (error) {
      console.log('🚀 ~ EventStore ~ deleteEvent ~ error:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.isLoading = true;
    try {
      await agent.Events.attend(this.selectedEvent!.id);
      runInAction(() => {
        if (this.selectedEvent?.isGoing) {
          this.selectedEvent.attendees = this.selectedEvent.attendees?.filter(
            (att) => att.username !== user?.username
          );
          this.selectedEvent.isGoing = false;
        } else {
          const attendee = new UserProfile(user!);
          this.selectedEvent?.attendees?.push(attendee);
          this.selectedEvent!.isGoing = true;
        }
        this.eventRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
      });
    } catch (error) {
      console.log('🚀 ~ EventStore ~ updateAttendance ~ error:', error);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  };

  toggleCancelEvent = async () => {
    this.isLoading = true;
    try {
      await agent.Events.attend(this.selectedEvent!.id);
      runInAction(() => {
        this.selectedEvent!.isCancelled = !this.selectedEvent?.isCancelled;
        this.eventRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
      });
    } catch (error) {
      console.log('🚀 ~ EventStore ~ cancelEvent ~ error:', error);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  };
}
