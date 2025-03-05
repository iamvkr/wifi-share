import { useEffect } from 'react'
import './App.css'
import { GridPatternBg } from './components/AppBgGrid'
import AppNavbar from './components/AppNavbar'
import AppSidebar from './components/AppSidebar'
import AppShineBox from './components/AppShineBox'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShineFilesBox from './components/AppShineFilesBox'
import { useMyContext } from './Provider/Context'

function App() {
  const { setMessages, setFilesArr, pin, socket } = useMyContext();

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("connected to web!");
    });

    socket.on("connect_error", (err) => {
      console.log("socket connection error" + err);
    });

    socket.on("receiveMessage", (data) => {

      if (data.pin !== pin) {
        /** incorrect pin */
        return false;
      }
      /** if pin are same: */
      setMessages(data.messages);
    })

    socket.on("receiveFile", (data) => {
      if (data.pin !== pin) {
        /** incorrect pin */
        return false;
      }
      /** if pin are same: */
      setFilesArr(prev => [...prev, ...data.files]);
    })

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
    };
  }, [socket, pin]);

  return (
    <BrowserRouter>
      <GridPatternBg>
        <AppSidebar>
          <AppNavbar />
          <Routes>
            <Route path='/' element={<AppShineBox />} />
            <Route path='/files' element={<AppShineFilesBox />} />
            <Route path='/:pin' element={<AppShineBox />} />
            <Route path='/:pin/files' element={<AppShineFilesBox />} />
          </Routes>

        </AppSidebar>
      </GridPatternBg>
    </BrowserRouter>
  )
}

export default App
