import React from 'react'
import { ArrowRight, Computer, MoveDown, QrCode as QrCodeiCON, Radio, Smartphone, Wifi } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import QRCode from 'react-qr-code';
import OtpView from './OtpView';
import { useMyContext } from '@/Provider/Context';

const Header = () => {
    const { isServerStart, setisServerStart } = useMyContext();
    return (<div className='pt-4'>
        <Card>
            <div className="mockup-browser-toolbar">
                <div>
                    <div className="bg-[#d7d8de] p-2 py-3 rounded-b-0 rounded-t-xl border flex gap-x-2 items-center">
                        <div className="box1 bg-slate-500 w-4 h-4 rounded"></div>
                        <div className="box2 bg-slate-400 w-4 h-4 rounded"></div>
                        <div className="box2 bg-slate-100 w-4 h-4 rounded"></div>
                        <span className={`${isServerStart ? "bg-purple-100" : "bg-gray-100"} ps-2 pe-10 rounded`}>{window.location.href + "client"}</span>
                    </div>
                </div>
                <div className='flex border-t bg-[#ededf2] rounded-b-xl rounded-t-0 border items-center flex-wrap'>
                    {/* qr code section */}
                    <div className='w-full lg:w-1/3 flex justify-center my-4 lg:my-0'>

                        <div className={`flex items-center flex-col`}>
                            {isServerStart ? <>
                                <QRCode value={window.location.href + "client"} className='bg-white p-4 border rounded w-36 h-36' />
                                <span className=' italic my-2'>Scan to connect</span>
                                <Button variant="outline" onClick={() => { setisServerStart(!isServerStart) }}>Stop</Button>
                            </>
                                :
                                <>
                                    <QrCodeiCON className='min-h-20 min-w-20 mb-4' />
                                    <Button variant="outline" onClick={() => { setisServerStart(!isServerStart) }}>Start</Button>
                                </>
                            }
                        </div>

                    </div>
                    {/* instructions */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center px-4 py-16 gap-y-2">

                        <div className='max-w-lg'>
                            <OtpView isDisabled={true} />
                        </div>

                        <div className='flex gap-x-2 items-center'>
                            <h2 className='text-xl font-medium'>Share Messages Locally via Wifi-Hotspot Without Intenet</h2>
                        </div>

                        <div className="flex gap-x-8 my-2">
                            <div className='flex'><Smartphone className='w-8 h-8' /><Radio className='w-8 h-8' /></div>
                            <ArrowRight className='w-8 h-8' />
                            <div className="flex"><Wifi className='w-8 h-8' /><Computer className='w-8 h-8' /></div>
                        </div>

                        <ul className='list-disc list-inside'>
                            <li>Connect your device via Wifi-Hotspot</li>
                            <li>Click on Start Button</li>
                        </ul>

                        <div className='my-2'><MoveDown /></div>

                        <div className='flex gap-x-2 items-center'>
                            <h2 className='text-xl font-medium'>On Client Device</h2>
                        </div>
                        <ul className='list-disc list-inside'>
                            <li>Copy/type the above url in your browser Or Scan the QR code</li>
                            <li>Enter 4 Digit pin from the Host </li>
                            <li>Click on Connect Button</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
    </div>)

}
export default Header