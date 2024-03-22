import ServiceBtns from "../components/Home/ServiceBtns";
import UserCard from "../components/Home/UserCard";

export default function Home () {
  
  return (
    <div className='px-4 flex flex-col  gap-16'>
      <UserCard />
      <ServiceBtns />
    </div>
  )
}