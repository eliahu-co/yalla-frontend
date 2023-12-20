"use client"

import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import getEvents from './actions/getEvents';
import { Event } from '../types/Event';
import EmptyState from '../EmptyState';

interface EventsContainerProps {
  initialEvents?: Event[];
}

const EventsContainer: React.FC<EventsContainerProps> = ({ initialEvents }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (events.length === 0) {
      getEvents({})
        .then(data => {
          setEvents(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [events]);

  return (
    <div className="pt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-20">
      {events.length > 0 ? (
        events.map((event: Event) => <EventCard key={event.id} event={event} />)
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default EventsContainer;