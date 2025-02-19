import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'
import { WifiOff } from 'lucide-react'

const NoWifi = () => {
  return (
    <div className='p-4'>
        <Card>
            <CardHeader>
                <p className='text-center text-2xl font-bold capitalize'>Could Not Detect Wifi</p>
                <p className='flex items-center justify-center mt-4'>
                    <WifiOff className='h-16 w-16 border-2 rounded-full p-2'/>
                </p>
                <p className='text-center'>Connect to wifi and Restart the app!</p>
            </CardHeader>
        </Card>
    </div>
  )
}

export default NoWifi