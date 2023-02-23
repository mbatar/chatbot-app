import { createContext, useState, useEffect } from "react";
import io from 'socket.io-client';
const socket = io("http://localhost:3000");

export const ChatContext = createContext(null)

export const ChatProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null)
   
    const [rooms, setRooms] = useState({
        1: {
            id: 1,
            userId: 1,
            with: 'User 1',
            messages: []
        },
        2: {
            id: 2,
            userId: 2,
            with: 'User 2',
            messages: []
        }
    })
    const [users, setUsers] = useState({
        1:{
            id: 1,
            name: 'User 1',
            isOnline:true
        },
        2:{
            id: 2,
            name: 'User 2',
            isOnline:false
        }
    })

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('send-msg-response');
        };
    }, []);

    useEffect(()=>{
        socket.on("send-msg-response", async (message) => {
            setTimeout(()=>{
                setRooms(rooms => ({...rooms,[selectedRoom]:{...rooms[selectedRoom],messages:[...rooms[selectedRoom].messages,{
                    id: 978,
                    author: 'buddy',
                    data: { message }
                }]}}))
            },2000)
        });
        return () => {
            socket.off('send-msg-response');
        };
    },[selectedRoom,rooms])

    useEffect(() => {
        if (selectedRoom !== null) {
            socket.emit('join', selectedRoom)
        }
    }, [selectedRoom])

    const sendMessage = async () => {
        if (message.length > 0 && selectedRoom !== null) {
            await socket.emit('new-msg', { msg: message, room: selectedRoom });
            setRooms(rooms => ({...rooms,[selectedRoom]:{...rooms[selectedRoom],messages:[...rooms[selectedRoom].messages,{
                id: 1423,
                author: 'them',
                data: { message }
            }]}}))
            setMessage('')
        }
    }

    useEffect(()=>{
        console.log('selectedRoom',selectedRoom);
        console.log('rooms',rooms);
        console.log('MF',rooms[selectedRoom]);
        },[selectedRoom,rooms])

    return (
        <ChatContext.Provider value={{ messageList, rooms, message, selectedRoom, users, sendMessage, setMessage, setSelectedRoom }}>
            {children}
        </ChatContext.Provider>
    )
}