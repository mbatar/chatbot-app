import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import Times from '../times.png'

export const ChatInfo = () => {
    const { selectedRoom, rooms } = useContext(ChatContext);
    return (
        <div className="p-5">
            <div className="mb-5">
                <label htmlFor="">LABELS</label>
                <div className="flex mt-3">
                    {
                        rooms[selectedRoom].labels.map((label,index) => (
                            <span key={index} className="cursor-pointer rounded-full bg-indigo text-white p-2 text-xs font-semibold text-slate-700 mr-2 flex items-center">
                                <span className="mr-2">{label}</span>
                                <img className='cursor-pointer' src={Times} alt="" />

                            </span>
                        ))
                    }
                </div>
            </div>
            <div>
                <label htmlFor="">ATTACHMENTS</label>
                <ul className="mt-3 list-disc pl-4">
                    {
                        rooms[selectedRoom].attachments.map((attachment,index) => (
                            <li key={index}><span className="text-xs font-semibold">{attachment}</span></li>
                        ))
                    }
                </ul>
                <div className="mt-5 text-blue text-sm cursor-pointer">View All</div>
            </div>
        </div>
    )
}