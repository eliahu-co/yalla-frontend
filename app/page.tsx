import Image from "next/image";
import Container from "./Comp/Container";
// import { eventsList } from "./data/eventsList";
import Link from "next/link";
import EventCard from "./Comp/EventCard";
import ClientOnly from "./Comp/ClientOnly";
import EmptyState from "./EmptyState";
import getListing from "./Comp/actions/getEvents";
import useCategories from "./hooks/useCategories";
import { useEffect } from "react";
import getAllCategories from "./Comp/actions/getEventById";
import getEvents from "./Comp/actions/getEvents";
import { Event } from "./types/Event";
import useEvents from "./hooks/useEvents";
import EventsContainer from "./Comp/EventsContainer";

export default async function Home() {
  const isEmpty = false;

  if (isEmpty) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <EventsContainer />
    </ClientOnly>
  );
}
