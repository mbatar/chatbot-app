import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/chatContext";


const ChatBot = () => {
    const { messages, setMessage, sendMessage, rooms, message, selectedRoom, setSelectedRoom,users } = useContext(ChatContext);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-[0px] md:w-[340px]">
                <div className="justify-between items-center p-5 h-[92px] hidden md:flex">
                    <div>All Messages</div>
                    <div>Settings</div>
                </div>
                <div className="hidden md:block">
                    <ul className="text-sm font-medium">
                        {
                            Object.keys(rooms).length > 0 ? Object.values(rooms).map(room => (
                                <li className={`w-full p-5 border-b border-gray cursor-pointer hover:bg-gray ${selectedRoom === room.id ? 'bg-gray' : null}`} key={room.id} onClick={() => setSelectedRoom(room.id)}>
                                    <div className="w-full flex items-center">
                                        <div className="grow flex items-center justify-between">
                                            <div className="rounded-full bg-slate-100 p-3 text-xs font-semibold">MB</div>
                                            <div className="flex flex-col grow ml-2">
                                                <div>{room.with}</div>
                                                <div className={`overflow-x-hidden max-w-[187px] whitespace-nowrap text-xs ${selectedRoom === room.id ? 'text-black' : 'text-slate'}`}>{room.messages.length > 0 ? room.messages[room.messages.length - 1].data.message : null}</div>
                                            </div>

                                        </div>
                                        {
                                            users[room.id].isOnline ? (<div className="rounded-full bg-green text-white p-2 text-xs">online</div>) : (<div>2 hours</div>)
                                        }
                                    </div>
                                </li>
                            )) : 'YOK'
                        }
                    </ul>

                </div>
            </div>
            <div className="grow flex flex-col">
                <div className="flex items-center p-5 h-[92px]">
                    <div>
                        <div>sttek</div>
                        <div>Cloud, The Internet</div>
                    </div>
                    <div className="grow flex items-center justify-end">
                        <div>booty-beep-boop</div>
                        <div>5m</div>
                    </div>
                </div>
                <div className="h-full bg-halfblue p-5 overflow-y-auto">
                    {
                        selectedRoom && rooms[selectedRoom].messages.length > 0 ? Object.values(rooms[selectedRoom].messages).reverse().map((message, index) => (
                            <div key={index} className={`flex justify-${message.author === 'buddy' ? 'start' : 'end'}`}>
                                <div className={`text-xs rounded p-3 rounded rounded-full ${message.author === 'buddy' ? 'bg-white rounded-bl-none' : 'bg-blue rounded-br-none text-white'}`}>{message.data.message}</div>
                            </div>
                        )) : 'YOK'
                    }
                </div>
                <div className="w-full flex items-center justify-between p-5 h-[92px]">
                    {
                        selectedRoom !== null && (
                            <>
                                <input type="text" placeholder="Type here..." value={message} className="border border-transparent hover:border-inherit rounded px-3 py-1" onChange={e => setMessage(e.target.value)} />
                                <button onClick={sendMessage}>Gönder</button></>
                        )
                    }
                </div>
            </div>
            <div className="w-[0px] md:w-[340px]">
                <div className="p-5 items-center h-[92px] hidden md:flex">
                    <span>Logo</span>
                </div>
                <div className="p-5">
                    <div>
                        <div>
                            <label htmlFor="">EMAIL</label>
                            <strong>example@example.com</strong>
                        </div>
                        <div>
                            <label htmlFor="">PHONE</label>
                            <strong>+90 555 555 55 55</strong>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">LABELS</label>
                        <div className="flex">
                            <span className="rounded-full bg-slate-100 p-2 text-xs font-semibold text-slate-700">Bot</span>
                            <span className="rounded-full bg-slate-100 p-2 text-xs font-semibold text-slate-700">React</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">ATTACHMENTS</label>
                        <ul>
                            <li>Dataset.csv</li>
                            <li>bot_face.jpg</li>
                        </ul>
                        <div>View All</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatBot;