import Categories from '@/app/Comp/Categories'
import { categoriesData } from '@/app/data/categoriesData'
import { Event } from '@/app/types/Event'
import  Container  from '@/app/Comp/Container'
import React, { useMemo } from 'react'
import EventHead from './EventHead'
import EventInfo from './EventInfo'

interface EventClientProps {
    event: Event
    //user?: User | null;
}

              

const EventClient: React.FC<EventClientProps> = ({
    event
}) => {

    const category = useMemo(() => {
        return categoriesData.find((item)=> item.label === event.category);
    },[event.category])

  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className= "flex flex-col gap-6">
                <EventHead
                title={event.title}
                locationValue={event.location}
                imageSrc={event.imageUrl}
                id={event.id}
                // currentUser={currentUser}
                />
                <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <EventInfo
              category={category}
              description={event.description}
              locationValue={event.location}
              address={event.address}
              capacity={event.capacity}
              languages={event.languages}
            />
            </div>
                
            </div>
        </div>
    </Container>
  )
}

export default EventClient