"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "tailwindcss/tailwind.css";
import useCountries from "../hooks/useCountries";
import { useMemo } from "react";
import { format } from "date-fns";

interface EventCardProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  location: string;
  address: string;
  startDate: string;
  endDate: string;
  capacity: number;
  languages: string[];
  category: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  imageUrl,
  title,
  description,
  location,
  address,
  startDate,
  endDate,
  capacity,
  languages,
  category,
}) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const router = useRouter();
  const { getByValue } = useCountries();

  const locationObject = getByValue(location);
  const duration = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [startDate, endDate]);

  return (
    <div
      onClick={() => router.push(`/events/${id}`)}
      className="
        col-span-1 
        cursor-pointer 
        group  
        border-[2px] 
        border-black 
        hover:border-purple-400 
        transition 
        flex 
        flex-col 
        gap-2"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
                aspect-square
                w-full
                relative
                group-hover:border-purple-400
                border-b-[2px]
                border-black
                overflow-hidden"
        >
          <Image
            className="
            object-cover 
            w-full 
            h-full 
            group-hover:scale-110
            transition"
            src={imageUrl}
            alt={title}
            fill
          />
          <div className="
          absolute 
          inset-0 
          bg-purple-500 
          opacity-0 
          group-hover:opacity-50 
          transition 
          duration-200">
          </div>
        </div>
        <div className = "flex flex-col gap-2 w-full p-2">
          <div
            className="
            font-semibold text-lg group-hover:text-purple-400"
          >
            {truncateText(title, 20)}
          </div>
          <div
            className="
            font-light text-neutral-500 group-hover:text-purple-400"
          >
            {truncateText(description, 100)}
          </div>
          <div
            className="
         font-xs text-neutral-400 ml-2 group-hover:text-purple-400
         ">
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
