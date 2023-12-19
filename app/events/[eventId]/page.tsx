import ClientOnly from "@/app/Comp/ClientOnly";
import getEventsById from "@/app/Comp/actions/getEventById";
import EmptyState from "@/app/EmptyState";
import EventClient from "./EventClient";

interface IParams {
    eventId?: string;
}

const EventPage = async ({ params }: {params:IParams}) => {
    // const event = await getEventsById(params);
    // const currentUser = await getCurrentUser();
    const event =  {
        id: "1",
        category: "Community Service",
        location: "IS",
        address: "123 Main Street, Ashkelon",
        title: "Help in School Construction",
        imageUrl: "https://source.unsplash.com/random?volunteering",
        startDate: "2013-03-10T02:00:00Z",
        endDate: "2013-03-10T04:00:00Z",
        capacity: 20,
        description: "Join us to build an educational future",
        languages: ["English", "Hebrew"],
      }

      if (!event) {
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <EventClient
           event={event}
        />
    </ClientOnly>

  )
}

export default EventPage