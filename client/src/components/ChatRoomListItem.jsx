import { useContext } from "react"
import { ChatContext } from "../context/chatContext"
import { Avatar } from "./Avatar";

export const ChatRoomListItem = ({ room,index }) => {
    const { selectedRoom, users, setSelectedRoom } = useContext(ChatContext);


    return (
        <li className={`w-full p-5 border-b border-gray cursor-pointer hover:bg-gray ${selectedRoom === room.id ? 'bg-gray' : null}`} key={index} onClick={() => setSelectedRoom(room.id)}>
            <div className="w-full flex items-center">
                <div className="grow flex items-center justify-between">
                    <Avatar name={users[room.id].name}/>
                    <div className="flex flex-col grow ml-2">
                        <div className="font-semibold">{users[room.id].name}</div>
                        <div className={`overflow-x-hidden text-ellipsis max-w-[148px] whitespace-nowrap text-xs ${selectedRoom === room.id ? 'text-black' : 'text-slate'}`}>{room.messages.length > 0 ? room.messages[room.messages.length - 1].data.message : null}</div>
                    </div>

                </div>
                {
                    users[room.id].userActivity.isOnline ? (<div className="rounded-full bg-green text-white p-2 text-xs">online</div>) : (<div>{users[room.id].userActivity.status}</div>)
                }
            </div>
        </li>
    )
}