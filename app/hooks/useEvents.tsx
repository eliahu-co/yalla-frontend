import { create } from 'zustand';
import { Event } from '../types/Event';


interface EventsStore {
  events: Event[];
  setEvents: (events: Array<Event>) => void;
}

const useEvents = create<EventsStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));

export default useEvents;