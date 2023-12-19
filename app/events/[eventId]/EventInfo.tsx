"use client"

import useCountries from "@/app/hooks/useCountries";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import EventCategory from './EventCategory'
import { useMemo } from "react";


interface EventInfoProps {
    description: string;
    locationValue: string;
    address: string;
    capacity: number;
    languages: string[];
    category: {
      icon: string,
      label: string;
      description: string;
    } | undefined
  }

const EventInfo: React.FC<EventInfoProps> = ({
    description,
    locationValue,
    address,
    capacity,
    languages,
    category
}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;
    const Map = useMemo(
      () =>
        dynamic(() => import('@/app/Comp/Map'), {
          ssr: false,
        }),
      [locationValue]
    );

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {address}
          </div>
          <div>
            Capacity: {capacity}
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <EventCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
   );
}

export default EventInfo