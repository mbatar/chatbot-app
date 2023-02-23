import { useContext } from "react"
import { ChatContext } from "../context/chatContext"
import { ChatRoomMessageItem } from "./ChatRoomMessageItem"

export const ChatRoomMessages = () => {
    const {selectedRoom,rooms} = useContext(ChatContext);
    return (
        <div className="h-full bg-halfblue p-5 overflow-y-auto">
                    {
                        selectedRoom && rooms[selectedRoom].messages.length > 0 ? Object.values(rooms[selectedRoom].messages).reverse().map((message, index) => (
                            <ChatRoomMessageItem key={index} index={index} message={message}/>
                        )) : (<div className="w-full h-[100%] flex justify-center items-center"><span>You do not have any messages yet</span></div>)
                    }
                </div>
    )
}