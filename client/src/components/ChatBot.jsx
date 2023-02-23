import React, { useEffect, useState } from "react";
import io from 'socket.io-client';


const ChatBot = () => {
    const [messageList, setMessageList] = useState([]);
    const [socket, setSocket] = useState(io("http://localhost:3000"));
    const [room, setRoom] = useState('user1');
    const [message,setMessage] = useState('');

    useEffect(() => {
        if (socket !== null) {
            socket.connect(true);
            socket.emit('join', room);
            socket.on("send-msg-response", async (message) => {
                //setMessageList(messageList => messageList.pop());
                //this.state.messageList.pop();
                console.log(message)
                await setMessageList(messageList => [...messageList,{
                    author:'user',
                    type:'text',
                    data:{message}
                }])
            })
        }
    }, [socket])

    const onMessageWasSent = async(message) => {
        await setMessageList(messageList => [...messageList,message])
        sendMessage("••••");
        await socket.emit('new-msg', { msg: message, room: room })
    }

    const sendMessage = async () => {
        if (message.length > 0) {
            await socket.emit('new-msg', { msg: message, room: room });
            
            setMessageList(messageList => [...messageList, {
                author: 'them',
                type: 'text',
                data: { message }
            }]) 
        }
    }

    return (
        <div id="chatbox">
            <div className="flex justify-between items-center">
                <div>
                    <div>All Messages</div>
                    <div>Settings</div>
                </div>
                <div className="flex items-center">
                    <div>
                        <div>sttek</div>
                        <div>Cloud, The Internet</div>
                    </div>
                    <div className="grow flex items-center">
                        <div>booty-beep-boop</div>
                        <div>5m</div>
                    </div>
                    <div>Logo</div>
                </div>
            </div>
            {
                messageList.map((message,index) => (
                    <div key={index}>{message.data.message}</div>
                ))
            }
            <input type="text" className="border rounded" onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Gönder</button>
        </div>
    )
}
export default ChatBot;