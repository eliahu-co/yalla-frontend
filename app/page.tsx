import Image from 'next/image'
import Container from './Comp/Container'
import { volunteerOpportunities } from './data/volunteerOpportunities'
import Link from 'next/link'
import EventCard from './Comp/EventCard'


export default function Home() {
  return (
   <Container>
    <div className="container mx-auto mt-2 p-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
          {volunteerOpportunities.map((opportunity, index) => (
            <Link href={`/events/${encodeURIComponent(opportunity.title)}`} key={index} passHref>
            <EventCard {...opportunity}/>
            </Link>
          ))}
        </div>
        </div>
   </Container>
  )
}
