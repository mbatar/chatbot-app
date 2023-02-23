import React, { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { Avatar } from "./Avatar";
import { ChatInfo } from "./ChatInfo";
import { ChatRoomSettings } from "./ChatRoomSettings";
import { ChatRoomInfo } from "./ChatRoomInfo";
import { ChatRoomList } from "./ChatRoomList";
import { ChatRoomMessages } from "./ChatRoomMessages";
import { UserInfo } from "./UserInfo";
import NotificationSound from "../notification.mp3";


const ChatBot = () => {
    const { setMessage, sendMessage, message, selectedRoom, users, audioPlayer } = useContext(ChatContext);
    
    return (
            <div className="flex h-screen overflow-hidden">
                <div className="w-[0px] md:w-[340px]">
                    <ChatRoomSettings />
                    <div className="hidden md:block">
                        <ChatRoomList />
                    </div>
                </div>
                <div className="grow flex flex-col">
                    <ChatRoomInfo />
                    <ChatRoomMessages />
                    <div className="w-full flex items-center justify-between p-5 h-[92px]">
                        {
                            selectedRoom !== null && (
                                <>
                                    <input type="text" placeholder="Write a message..." value={message} className="border border-transparent hover:border-inherit rounded px-3 py-1" onChange={e => setMessage(e.target.value)} />
                                    <button onClick={sendMessage}>Send</button></>
                            )
                        }
                    </div>
                </div>
                <div className="w-[0px] md:w-[340px]">
                    {selectedRoom && (
                        <>
                            <div className="p-5 items-center h-[92px] hidden md:flex">
                                <Avatar name={users[selectedRoom].name} />
                            </div>
                            <div>
                                <UserInfo />
                                <ChatInfo />
                            </div>
                        </>
                    )}
                </div>
                <audio ref={audioPlayer} src={NotificationSound} />
            </div>
    )
}
export default ChatBot;