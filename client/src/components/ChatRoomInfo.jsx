import { useContext } from "react"
import { ChatContext } from "../context/chatContext"

export const ChatRoomInfo = () => {
    const { selectedRoom, users } = useContext(ChatContext);
    return (
        <div className="flex items-center p-5 h-[92px]">
            {
                selectedRoom && (
                    <>
                        <div>
                            <div>{users[selectedRoom].name}</div>
                            <div>Cloud, The Internet</div>
                        </div>
                        <div className="grow flex items-center justify-end">
                            <div className="mr-2">booty-beep-boop</div>
                            {users[selectedRoom].userActivity.isOnline ?
                                (<div className="rounded-full bg-green text-white p-2 text-xs">online</div>) :
                                (<div>{users[selectedRoom].userActivity.status}</div>)}
                        </div>
                    </>
                )
            }
        </div>
    )
}