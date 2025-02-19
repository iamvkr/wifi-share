import React from 'react'
import { Button } from "@/components/ui/button"
import { Wifi } from 'lucide-react'
import { useMyContext } from '@/Provider/Context';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AppNavbar = () => {
  const { isServerStart, setisServerStart, pin } = useMyContext();
  const location = useLocation();

  return (
    <nav className='bg-primary'>
      <section className='h-16 flex justify-between items-center px-4 lg:max-w-2/3 lg:px-0 mx-auto'>
        <div className='flex items-center gap-x-2 text-white'>
          <Wifi className='w-6 h-6' />
          <h2 className='text-2xl'>WiFi-Share</h2>
        </div>
        {location.pathname === "/" ? <Button variant="outline" onClick={() => { setisServerStart(!isServerStart) }}>
          {isServerStart ? "Stop" : "Start"}
        </Button>
          :
          <Button variant="outline" onClick={() => {
            if (pin === "") {
              toast.error("Please Enter the pin to connect");
              return false;
            }
            setisServerStart(!isServerStart)
          }}>
            {isServerStart ? "Disconnect" : "Connect"}
          </Button>
        }

      </section>
    </nav>
  )
}

export default AppNavbar