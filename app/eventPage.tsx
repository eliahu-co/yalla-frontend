import React from "react";
import { volunteerOpportunities } from "./data/volunteerOpportunities";
import EventCard from "./Comp/EventCard";

interface EventPageProps {
    eventData: volunteerOpportunities;
}

const eventPage: React.FC<EventPageProps> = ({ eventData }) => {
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

export default eventPage;
