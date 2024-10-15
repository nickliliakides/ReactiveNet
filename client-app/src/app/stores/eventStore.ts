import { configure, makeAutoObservable, runInAction } from 'mobx';
import { Event } from '../models/event';
import agent from '../api/agent';
import { format } from 'date-fns';

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
      console.log('🚀 ~ EventStore ~ loadEvents= ~ error:', error);
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
        this.selectedEvent = event;
      } catch (error) {
        console.log('🚀 ~ EventStore ~ loadEventById= ~ error:', error);
      } finally {
        this.setIsLoadingInitial(false);
      }
    }
    return event && { ...event, date: new Date(event.date!) };
  };

  setIsLoadingInitial = (loading: boolean) => {
    this.isLoadingInitial = loading;
  };

  createEvent = async (event: Event) => {
    this.isLoading = true;
    try {
      await agent.Events.create(event);
      runInAction(() => {
        this.eventRegistry.set(event.id, event);
        this.selectedEvent = event;
        this.isEditMode = false;
      });
    } catch (error) {
      console.log('🚀 ~ EventStore ~ createEvent= ~ error:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateEvent = async (event: Event) => {
    this.isLoading = true;
    try {
      await agent.Events.update(event);
      runInAction(() => {
        this.eventRegistry.set(event.id, event);
        this.selectedEvent = event;
        this.isEditMode = false;
      });
    } catch (error) {
      console.log('🚀 ~ EventStore ~ createEvent= ~ error:', error);
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
}
