"use client";
import Image from "next/image";

interface EventCardProps {
    imageUrl: string;
    title: string;
    description: string;
    location: string;
}

const EventCard: React.FC<EventCardProps> = ({
    imageUrl,
    title,
    description,
    location,
}) => {
    return (
        <div className="
        border
        rounded-lg
        overflow-hidden
        shadow-md
        hover:shadow-lg
        transition
        cursor-pointer"
        >
            <div className="relative h-56 w-full">
                <Image className="object-cover w-full h-full"
                src={imageUrl}
                alt={title}/>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-2">{description}</p>
                <p className="text-gray-500">{location}</p>
            </div>
        </div>
    )
}
export default EventCard;