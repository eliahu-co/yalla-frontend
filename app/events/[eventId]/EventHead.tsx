'use client';

import Image from "next/image";
import useCountries from "@/app/hooks/useCountries";



interface EventHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
//   currentUser?: SafeUser | null
}

const EventHead: React.FC<EventHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
//   currentUser
}) => {
  const { getByValue } = useCountries();
  const locationLabel = `${getByValue(locationValue)?.label}, ${getByValue(locationValue)?.region}`


  return ( 
    <>
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold"> {title} </div>
        <div className="font-light text-neutral-500 mt-1 mb-6">
            {locationLabel}
        </div>
        </div>
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
        </div>
      </div>
    </>
   );
}
 
export default EventHead;