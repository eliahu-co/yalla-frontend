import Image from "next/image";
import Container from "./Comp/Container";
import { eventsList } from "./data/eventsList";
import Link from "next/link";
import EventCard from "./Comp/EventCard";
import ClientOnly from "./Comp/ClientOnly";
import EmptyState from "./EmptyState";
import getListing from "./Comp/actions/getEvents";
import useCategories from "./hooks/useCategories";
import { useEffect } from "react";
import getAllCategories from "./Comp/actions/getEventById";

export default function Home() {
  const isEmpty = false;
  // cont eventsList = await getListing();
  // const currentUser = await getCurrentUser();
  
  if (isEmpty) {
   return (
  <ClientOnly>
    <EmptyState showReset />
  </ClientOnly>
  )}
  
  return (
    <ClientOnly>
      <Container>
        <div className="
        pt-14
        grid 
        grid-cols-1 
        sm: grid-cols-2
        md:grid-cols-3 
        lg:grid-cols-4
        gap-8 
        mt-20">
          {eventsList.map((event, index) => (
              <EventCard 
              key={event.id}
              id={event.id}
              category={event.category}
              title={event.title}
              location={event.location}
              address={event.address}
              imageUrl={event.imageUrl}
              startDate={event.startDate}
              endDate={event.endDate}
              capacity={event.capacity}
              description={event.description}
              languages={event.languages}
              />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
