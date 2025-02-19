import { getOrigin } from "@/config/conf";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client"

const myContext = createContext(null);

export const useMyContext = () => {
    return useContext(myContext);
};

const Provider = ({ children }) => {
    const [isServerStart, setisServerStart] = useState(false);
    const [messages, setMessages] = useState([]);
    const [pin, setPin] = useState("0000");
    const [username, setUsername] = useState("host");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (window.location.pathname === "/") { /** working in host */
            if (isServerStart) {
                toast.success("Host Started!")
                /** generate 4 digin random pin */
                var random = Math.floor(1000 + Math.random() * 9000);
                setPin(random.toString())
            } else {
                if (pin !== "0000") {
                    toast.error("Host Stopped!")
                }
                /** reset the pin */
                setPin("0000");
                setMessages([])
            }
        } else {
            /** working for client */
            if (isServerStart) {
                toast.success("Client Connected!")
                /** pin will be generated by client: No need to handle code here */
            }else{
                if (pin !== "0000") {
                    toast.error("Client Disconnected!")
                }
                /** reset the pin */
                setPin("")
                setMessages([])
            }
        }
    }, [isServerStart])

    useEffect(() => {
        if (!socket) {
            let url = getOrigin();
            setSocket(io(url));
        }
        return () => {
            socket?.disconnect();
        };
    }, []);

    return (
        <myContext.Provider value={{
            isServerStart,
            setisServerStart,
            messages, setMessages,
            pin, setPin,
            username, setUsername,
            socket, setSocket,
        }}>
            {children}
        </myContext.Provider>
    )
}

export default Provider