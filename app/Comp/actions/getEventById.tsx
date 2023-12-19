import { API_URL } from "@/app/config";
import axios from "axios";

interface IParams {
    eventId?: string;
}

export default async function getEventsById(
    params: IParams
) {
    const { eventId } = params;

    axios
    .get(`${API_URL}/events/${eventId}`)
    
    .then((response) => {
        if (!response.data) {
            return null;
        }
        const events = response.data;
        const safeEvent = events.map((event: any) => ({
            ...event,
            createdAt: event.createdAt.toISOString()
        }));
    return safeEvent;
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {

    });
}