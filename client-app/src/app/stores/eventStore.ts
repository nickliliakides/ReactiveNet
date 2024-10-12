import { makeAutoObservable, runInAction } from 'mobx';
import { Event } from '../models/event';
import agent from '../api/agent';

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
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadEvents = async () => {
    this.setIsLoadingInitial(true);
    try {
      const events = await agent.Events.list();
      events.forEach((evt) => {
        evt.date = evt.date.split('T')[0];
        this.eventRegistry.set(evt.id, evt);
      });
    } catch (error) {
      console.log('🚀 ~ EventStore ~ loadEvents= ~ error:', error);
    } finally {
      this.setIsLoadingInitial(false);
    }
  };

  setIsLoadingInitial = (loading: boolean) => {
    this.isLoadingInitial = loading;
  };

  selectEvent = (id: string) => {
    this.selectedEvent = this.eventRegistry.get(id);
  };

  deselectEvent = () => {
    this.selectedEvent = undefined;
  };

  openForm = (id?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id ? this.selectEvent(id) : this.deselectEvent();
    this.isEditMode = true;
  };

  closeForm = () => {
    this.isEditMode = false;
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
        this.selectedEvent = undefined;
        this.isEditMode = false;
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
