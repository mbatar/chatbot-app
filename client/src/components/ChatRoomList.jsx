import { useContext } from "react"
import { ChatContext } from "../context/chatContext"
import { ChatRoomListItem } from "./ChatRoomListItem"

export const ChatRoomList = () => {
    const {rooms} = useContext(ChatContext);
    return (
        <ul className="text-sm font-medium">
            {
                Object.keys(rooms).length > 0 ? Object.values(rooms).map((room,index) => (
                    <ChatRoomListItem key={index} index={index} room={room}/>
                )) : (<div className="w-full h-[100%] flex justify-center items-center"><span>You do not have any messages yet</span></div>)
            }
        </ul>
    )
}