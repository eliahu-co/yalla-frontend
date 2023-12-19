"use client";
import Image from "next/image";
import "tailwindcss/tailwind.css";

interface EventCardProps {
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
    imageUrl,
    title,
    description,
    location,
    address,
    startDate,
    endDate,
    capacity,
    languages,
    category
}) => {
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="
        max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden h-[200px] flex flex-col">
            <div className="aspect-w-16 aspect-h-9">
                <Image className= "object-cover w-full h-full max-h-40"
                src={imageUrl}
                alt={title}
                />
            </div>
            <div className="p-6 flex-grow">
                <div className="text-xl font-semibold mb-2">{truncateText(title, 20)}</div>
                <p className="text-gray-600 mb-2">{truncateText(description, 100)}</p>
                </div>
                <div className="text-gray-500">
                    {location}
                </div>
            </div>
    );
};
export default EventCard;
