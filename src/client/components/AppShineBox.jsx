import React, { useEffect } from 'react'
import { ShineBorder } from '@/components/magicui/shine-border'
import { useMyContext } from '@/Provider/Context';


const AppShineBox = () => {
    const { messages, setMessages, socket, pin,isServerStart,setisServerStart } = useMyContext();
    const handleChange = (e) => {
        setMessages(e.target.value);
    }

    const emmitMsg = () => {
        socket.emit("sendMessage", {
            messages:messages + "\n",
            pin,
        });
    }

    useEffect(() => {
        if (pin !== "0000" && !isServerStart && window.location.pathname !== "/" && window.location.pathname !== "/files") {
            // is a client view: so Automatically connect to the server
            setisServerStart(true)
        }
    }, [pin])
    

    return (
        <ShineBorder
            borderWidth={2}
            className="relative w-full h-[94vh] md:h-[80vh] rounded-lg bg-transparent text-white"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
            <textarea className='bg-transparent focus:outline-none w-full h-full text-start resize-none disabled:cursor-not-allowed'
            disabled={!isServerStart}
                type="text"
                id="myTextarea"
                placeholder='Write Something and press enter to send...'
                value={messages}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        emmitMsg()
                    }
                }}
            />
        </ShineBorder>
    )
}

export default AppShineBox