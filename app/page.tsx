import Image from "next/image";
import Container from "./Comp/Container";
import { eventsList } from "./data/eventsList";
import Link from "next/link";
import EventCard from "./Comp/EventCard";
import ClientOnly from "./Comp/ClientOnly";
import EmptyState from "./EmptyState";
import getListing from "./Comp/actions/getEvents";

export default function Home() {
  const isEmpty = true;
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
            <Link
              href={`/events/${encodeURIComponent(event.title)}`}
              key={index}
              passHref
            >
              <EventCard 
              // currentUser={currentUser}
              key={event.id}
              data = {event} 
              />
            </Link>
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
