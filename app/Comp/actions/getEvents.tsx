import { API_URL } from "@/app/config";
import axios from "axios";

export interface EventsParams {
    category?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
  }

export default async function getListing(
    params: EventsParams
) {
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

  axios
    .post(`${API_URL}/events/search`, {
        query: {
            ...query,
            ...(category && { category })
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(location && { location }),
      },
    })
    .then(() => {
      // RegisterModal.onClose();
      // toast.success("Account Created");
      // reset();
      // setStep(STEPS.IDENTITY);
      // RegisterModal.onClose();
    })
    .catch((error) => {
      // console.log(error.message);
      // toast.error("Invalid Details");
    })
    .finally(() => {
      // setIsLoading(false);
    });
}
