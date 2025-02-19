import { useMyContext } from '@/Provider/Context'
import ChatBox from '@/components/ChatBox'
import FooterMsg from '@/components/FooterMsg'
import Header from '@/components/Header'
import OtpView from '@/components/OtpView'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

const Host = () => {
    const { isServerStart, setisServerStart, messages } = useMyContext();
    return (
        <>
            <main className={`lg:max-w-2/3 p-2 mx-auto overflow-y-auto ${isServerStart ? "h-[calc(100vh_-_16rem)] lg:h-[calc(100vh_-_11rem)]":"h-[calc(100vh_-_5rem)]"}`}>
                {(!isServerStart && messages.length === 0) && <Header />}
                {(isServerStart && messages.length > 0) ? (<div className="flex flex-col gap-y-4 h-16">
                    <div className='flex items-center gap-x-2 justify-between'>
                        <ArrowLeft className='w-8 h-8' onClick={() => { setisServerStart(false) }} />
                        <OtpView isDisabled={true} />
                    </div>
                    <div>
                        {/* https://docs-shadcn-chat.vercel.app/ */}
                        <ChatBox messages={messages} />
                    </div>
                </div>)
                    :
                    isServerStart && <Header />
                }

            </main>
            {isServerStart && <footer className='h-28 fixed bottom-0 left-0 w-full'>
                <div className='lg:max-w-2/3 mx-auto px-2 lg:px-0'>
                    <FooterMsg />
                </div>
            </footer>}
        </>
    )
}

export default Host