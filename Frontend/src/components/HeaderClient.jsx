import { Smartphone } from 'lucide-react';
import React from 'react'
import OtpView from './OtpView';
import ProfileView from './ProfileView';

const HeaderClient = () => {
    const isServerStart = false;
    return (
        <div className="mockup-browser-toolbar">
            <div>
                <div className="bg-[#d7d8de] p-2 py-3 rounded-b-0 rounded-t-xl border flex gap-x-2 items-center">
                    <div className="box1 bg-slate-500 w-4 h-4 rounded"></div>
                    <div className="box2 bg-slate-400 w-4 h-4 rounded"></div>
                    <div className="box2 bg-slate-100 w-4 h-4 rounded"></div>
                    <span className={`${isServerStart ? "bg-purple-100" : "bg-gray-100"} ps-2 pe-10 rounded`}>{"Client"}</span>
                </div>
            </div>
            <div className='flex border-t bg-[#ededf2] rounded-b-xl rounded-t-0 border items-center flex-wrap'>
                {/* instructions */}
                <div className="w-full lg:w-2/3 flex flex-col  px-4 py-16 gap-y-8">
                <div className='flex gap-x-2'>
                    <Smartphone />
                    <h2 className='text-xl font-medium'>Client Device</h2>
                </div>
                    <h2 className='text-xl font-medium'>Share Messages Locally via Wifi-Hotspot Without Intenet</h2>
                    <ProfileView />
                    <div>
                        <OtpView isDisabled={false} />
                        <p className='italic mt-2'>Enter pin to connect</p>
                    </div>
                    <ul className='list-disc list-inside'>
                        <li>Connect your device via Wifi-Hotspot</li>
                        <li>Enter 4 Digit pin provided from the Host </li>
                        <li>Click on Connect Button</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HeaderClient