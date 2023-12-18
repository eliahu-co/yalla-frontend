import React from "react";
import { volunteerOpportunities } from "./data/volunteerOpportunities";
import EventCard from "./Comp/EventCard";
import { useRouter } from "next/router";



const EventPage: React.FC = () => {
    const router = useRouter();
    const {title} = router.query;

    const eventData = volunteerOpportunities.find((opportunity) => encodeURIComponent(opportunity.title) === title);
    if (!eventData) {
        return <div>Event not found</div>
    }
    return (
        <div>
            <EventCard {...eventData} />
            <div>
                <h2>Details</h2>
                <p>{eventData.description}</p>
                <p>Location: {eventData.location}</p>
            </div>
        </div>
    )
};

export default EventPage;
