import { API_URL } from "@/app/config";
import axios from "axios";

export interface EventsParams {
    category?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
  }

  export default async function getEvents(params: EventsParams) {
    const {
      category,
      startDate,
      endDate,
      location,
    } = params;
  
    let query: any = {};
  
    if (category) {
      query.category = category;
    }
  
    if (startDate) {
      query.startDate = startDate;
    }
  
    if (endDate) {
      query.endDate = endDate;
    }
  
    if (location) {
      query.location = location;
    }
  
    try {
      const response = await axios.get(`${API_URL}/api/events/search`, {
        params: query,
      });
  
      const events = response.data;
      const safeEvents = events.map((event: any) => ({
        ...event,
        createdAt: event.createdAt.toISOString()
      }));
  
      return safeEvents;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  }