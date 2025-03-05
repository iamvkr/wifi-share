import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, QrCode as QRIcon, Video } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from './ui/button';
import { useMyContext } from '@/Provider/Context';
import { getOrigin } from '@/config/conf';
import QRCode from 'react-qr-code';

const AppSidebar = ({ children }) => {
    const location = useLocation();
    const { isServerStart, setisServerStart, pin, setPin } = useMyContext();
    const [data, setdata] = useState({
        nav: [
            { name: "Messages", icon: MessageCircle, href: "/" },
            { name: "Files and Media", icon: Video, href: "/files" },
        ],
    })
    const isClient = location.pathname !== "/" && location.pathname !== "/files";

    useEffect(() => {
        const pinFromUrl = window.location.pathname.split("/")[1];
        if (isClient) {
            setdata({
                nav: [
                    { name: "Messages", icon: MessageCircle, href: "/" + pinFromUrl },
                    { name: "Files and Media", icon: Video, href: "/" + pinFromUrl + "/files" },
                ],
            });
            setPin(pinFromUrl)
        }
    }, [])

    return (
        <div>
            <SidebarProvider className="items-start">
                <Sidebar collapsible="none" className="hidden md:flex h-[96vh] bg-transparent text-white border-e-2">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>

                                <div className='flex items-center flex-col gap-y-4 mb-6'>
                                    {!isClient ? <>
                                        {!isServerStart ? <div className='w-36 h-36 flex items-center justify-center'>
                                            <QRIcon className='w-24 h-24' />
                                        </div>
                                            :
                                            <QRCode value={getOrigin() + "/" + pin} className='bg-white p-4 border rounded w-36 h-36' />}
                                        <span>Scan to Connect</span>
                                    </>
                                        :
                                        <span>Connected to</span>
                                    }
                                    <div className="pinBox flex items-center justify-center gap-x-2">
                                        <span className='text-center border rounded-xl w-8 h-8 block pt-1'>{pin.charAt(0)}</span>
                                        <span className='text-center border rounded-xl w-8 h-8 block pt-1'>{pin.charAt(1)}</span>
                                        <span className='text-center border rounded-xl w-8 h-8 block pt-1'>{pin.charAt(2)}</span>
                                        <span className='text-center border rounded-xl w-8 h-8 block pt-1'>{pin.charAt(3)}</span>
                                    </div>
                                    {<Button className={"w-full bg-white/90 text-black hover:bg-white"}
                                        onClick={() => { setisServerStart(!isServerStart) }}>
                                        {/* location is sever */}
                                        {(location.pathname === "/" || location.pathname === "/files") && (isServerStart ? "Stop" : "Start")}
                                        {/* location is client */}
                                        {isClient && (isServerStart ? "Disconnect" : "Connect")}
                                    </Button>}
                                </div>
                                <SidebarMenu>
                                    {data.nav.map((item) => (
                                        <SidebarMenuItem key={item.name}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isClient ? (item.href === location.pathname) : (item.href === location.pathname)}
                                            >
                                                <Link to={item.href}>
                                                    <item.icon />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <main className="flex h-[98vh] flex-1 flex-col overflow-hidden">
                    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                        {children}
                        <div className='md:hidden'>
                            <Button className="bg-white/90 text-black hover:bg-white w-full"
                                onClick={() => { setisServerStart(!isServerStart) }}>
                                {isClient ?
                                    (isServerStart ? `[Disconnect] @${getOrigin()}/${pin}` : "Connect")
                                    :
                                    (isServerStart ? `[Stop] @${getOrigin()}/${pin}` : "Start")}
                            </Button>
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}

export default AppSidebar