import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import { Toaster } from 'react-hot-toast'
import Host from './pages/Host'
import Client from './pages/Client'
import { useMyContext } from './Provider/Context'
import { useEffect, useState } from 'react'
import NoWifi from './components/NoWifi'

function App() {
  const { setMessages, pin, socket } = useMyContext();
  const [isWifi, setisWifi] = useState(true);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("connect_error", (err) => {
      console.log("socket err" + err);
    });

    socket.on("receiveMessage", (data) => {
      if (data.pin !== pin) {
        /** incorrect pin */
        return false;
      }
      /** if pin are same: */
      setMessages(prev => [...prev, data]);

      /** LOGIC for chunk data receive from socket :: discarded :: now using file upload instead: 
      const { chunk, done } = data.fileData;
      if (chunk) {
        // set loading true 
        // if (!window.fileBuffers) { window.fileBuffers = [] };
        // window.fileBuffers.push(new Uint8Array(chunk));
        // return;
      }
      if (done) {
        // set loading false
        // setMessages(prev => [...prev, {
        //   ...data,
        //   fileData: {
        //     ...data.fileData,
        //     fileData: window.fileBuffers
        //   }
        // }])
        // window.fileBuffers = null;
        // return;
      }
      */
    })

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
    };
  }, [socket, pin]);


  useEffect(() => {
    if (window.location.origin === "http://127.0.0.1:3000") {
      setisWifi(false);
    }
  }, [])

  return (isWifi ? (<BrowserRouter>
    <AppNavbar />
    <Routes>
      <Route path='/' element={<Host />} />
      <Route path='/client' element={<Client />} />
    </Routes>
    <Toaster />
  </BrowserRouter >)
    :
    <NoWifi/>)
}

export default App
