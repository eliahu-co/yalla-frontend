import React, { useState} from "react";
import { volunteerOpportunities } from "./data/eventsList";
import EventCard from "./Comp/EventCard";
import { useRouter } from "next/router";
import Calendar from "./Comp/inputs/Calendar";



const EventPage: React.FC = () => {
    const router = useRouter();
    const {title} = router.query;

    const eventData = volunteerOpportunities.find((opportunity) => encodeURIComponent(opportunity.title) === title);
    if (!eventData) {
        return <div>Event not found</div>
    }

    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const handleCalendarChange = (value: any) => {
        setSelectedRange(value.selection);
    };


    const [numberOfPeople, setNumberOfPeople] = useState(1);

    const handleIncrement = () => {
        setNumberOfPeople((prev) => prev + 1);
    };
    const handleDecrement = () => {
        setNumberOfPeople((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleReservation = () => {
        console.log("Reservation for ${numberOfPeople} people");
    };
        
    return (
        <div>
            <EventCard {...eventData} />
            <div>
                <h2>Details</h2>
                <p>{eventData.description}</p>
                <p>Location: {eventData.location}</p>
            </div>
            <div>
                <h2>Choose Dates</h2>
                <Calendar value={selectedRange} onChange={handleCalendarChange} />
            </div>
            <div>
                <h2>Number of People</h2>
                <div>
                    <button onClick={handleDecrement}>-</button>
                    <span>{numberOfPeople}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
            </div>
            <button onClick={handleReservation}>Reserve</button>
        </div>
    )
};

export default EventPage;


// add map
// add social media buttons
// add save for later button 