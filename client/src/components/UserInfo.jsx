import { useContext } from "react";
import { ChatContext } from "../context/chatContext";

export const UserInfo = () => {
    const { selectedRoom, users } = useContext(ChatContext);
    return (
        <div>
            <div className="p-5">
                <div className="flex flex-col mb-5">
                    <label htmlFor="">EMAIL</label>
                    <strong>{users[selectedRoom].email}</strong>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">PHONE</label>
                    <strong>{users[selectedRoom].phone}</strong>
                </div>
            </div>

        </div>
    )
}