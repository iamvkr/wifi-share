import React from 'react'
import { ChatMessageList } from './ui/chat/chat-message-list'
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from './ui/chat/chat-bubble'
import { useMyContext } from '@/Provider/Context';
import { Computer, File, Smartphone } from 'lucide-react';
import { getOrigin } from '@/config/conf';

const ChatBox = ({ messages }) => {
    const { username } = useMyContext();

    const handleDownloadFile = async (fileData) => {
        const { fileName } = fileData;
        let Url = getOrigin();
        // const res = await fetch(Url + "/uploads/" + fileName);
        // if (!res.ok) {
        //     return false;
        // }
        // const blob = await res.blob();
        // const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = Url + "/download/" + fileName;
        link.download = fileData.fileName.substring(fileData.fileName.indexOf("-") + 1);
        link.click();
        URL.revokeObjectURL(Url + "/uploads/" + fileName);
    }
    return (
        <div className='h-[calc(100vh_-_15rem)] overflow-y-auto'>
            <ChatMessageList>

                {messages.map((data, i) => {
                    return (<ChatBubble variant={username === data.username ? "sent" : "received"} key={i}>
                        <ChatBubbleAvatar fallback={username === data.username ? <Computer /> : <Smartphone />} />
                        <ChatBubbleMessage variant='sent'>
                            <span className='text-xs capitalize'>{data.username}</span><br />
                            {data?.message}
                            {data?.fileData && <p className="mt-2 cursor-pointer" onClick={() => { handleDownloadFile(data.fileData) }}>
                                <span className="flex items-center gap-2 text-sm font-medium">
                                    <File />
                                    {/* sanitize file name */}
                                    {data.fileData.fileName.substring(data.fileData.fileName.indexOf("-") + 1)}
                                </span>
                            </p>}
                        </ChatBubbleMessage>
                    </ChatBubble>)
                })}

            </ChatMessageList>
        </div>
    )
}

export default ChatBox