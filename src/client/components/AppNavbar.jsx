import React from 'react'
import { AuroraText } from '@/components/magicui/aurora-text'
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { getOrigin } from '@/config/conf';
import { useMyContext } from '@/Provider/Context';
import { Copy, Files, MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AppNavbar = () => {
    const { pin, isServerStart } = useMyContext();
    const location = useLocation();
    const navigate = useNavigate();
    const isClient = location.pathname !== "/" && location.pathname !== "/files";

    const handleCopy = async () => {
        const copyBtnText = document.getElementById("copyBtnText");
        copyBtnText.classList.toggle("hidden")
        copyBtnText.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                toast.success('Copied to clipboard');
            } else {
                toast.error('Unsupported Copy text!');
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        copyBtnText.classList.toggle("hidden")
    }

    return (
        <div className='flex justify-between items-center'>
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-white">
                <AuroraText>Wifi Share</AuroraText>
            </h1>

            <div className='hidden md:block'>
                <ShimmerButton className="shadow-xl"
                    onClick={handleCopy}
                    disabled={!isServerStart}
                >
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                        {getOrigin() + "/" + pin}
                    </span>
                    <input id='copyBtnText' type="text" value={getOrigin() + "/" + pin} className='hidden' onChange={()=>{}} />

                    <Copy className='ms-2 w-4 h-4' />
                </ShimmerButton>
            </div>

            <div className='md:hidden flex items-center'>
                {!isClient ? <>
                    {/* code for host view */}
                    <ShimmerButton className={`shadow-xl ${location.pathname === "/" && "text-black"}`}
                        background={location.pathname === "/" && "white"}
                        shimmerColor={location.pathname === "/" && "#000000"}
                        onClick={() => {
                            navigate("/")
                        }}>

                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight  lg:text-lg">
                            <MessageCircle />
                        </span>
                    </ShimmerButton>

                    <ShimmerButton className={`shadow-xl ${location.pathname === "/files" && "text-black"}`}
                        background={location.pathname === "/files" && "white"}
                        shimmerColor={location.pathname === "/files" && "#000000"}
                        onClick={() => {
                            navigate("/files")
                        }}>
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
                            <Files />
                        </span>
                    </ShimmerButton>
                </>
                    :
                    <>
                        {/* code for client view */}
                        <ShimmerButton className={`shadow-xl ${location.pathname === `/${pin}` && "text-black"}`}
                            background={location.pathname === `/${pin}` && "white"}
                            shimmerColor={location.pathname === `/${pin}` && "#000000"}
                            onClick={() => {
                                navigate(`/${pin}`)
                            }}>

                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight  lg:text-lg">
                                <MessageCircle />
                            </span>
                        </ShimmerButton>

                        <ShimmerButton className={`shadow-xl ${location.pathname === `/${pin}/files` && "text-black"}`}
                            background={location.pathname === `/${pin}/files` && "white"}
                            shimmerColor={location.pathname === `/${pin}/files` && "#000000"}
                            onClick={() => {
                                navigate(`/${pin}/files`)
                            }}>
                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
                                <Files />
                            </span>
                        </ShimmerButton>
                    </>
                }

            </div>
        </div>
    )
}

export default AppNavbar