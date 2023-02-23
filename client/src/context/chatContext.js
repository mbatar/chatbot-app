import { createContext, useState, useEffect,useRef } from "react";
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment/moment";
const socket = io("http://localhost:3000");

export const ChatContext = createContext(null)

export const ChatProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null)
    const audioPlayer = useRef(null)
    const [rooms, setRooms] = useState({
        1: {
            id: 1,
            userId: 1,
            attachments: ['testimage1.jpg', 'testdata1.csv'],
            labels: ['Bot1', 'React1'],
            messages: [
                {
                    author: 'them',
                    data: { message: 'Hello!' },
                    id: 1234
                },
                {
                    author: 'buddy',
                    data: { message: 'Hello there!' },
                    id: 1235
                }
            ]
        },
        2: {
            id: 2,
            userId: 2,
            attachments: ['testimage2.jpg', 'testdata2.csv'],
            labels: ['Bot2', 'React2'],
            messages: [
                {
                    author: 'them',
                    data: { message: 'Hello!' },
                    id: 1234
                },
                {
                    author: 'buddy',
                    data: { message: 'Yes, of course. Thanks!' },
                    id: 1235
                }
            ]
        },
        3: {
            id: 3,
            userId: 3,
            attachments: ['testimage2.jpg', 'testdata2.csv'],
            labels: ['Bot3', 'React3'],
            messages: [
                {
                    author: 'them',
                    data: { message: 'Hello!' },
                    id: 1234
                },
                {
                    author: 'buddy',
                    data: { message: 'This is a question regulator' },
                    id: 1235
                }
            ]
        },
        4: {
            id: 4,
            userId: 4,
            attachments: ['testimage4.jpg', 'testdata4.csv'],
            labels: ['Bot4', 'React4'],
            messages: [
                {
                    author: 'them',
                    data: { message: 'Hello!' },
                    id: 1234
                },
                {
                    author: 'buddy',
                    data: { message: 'Do you need help with' },
                    id: 1235
                }
            ]
        },
        5: {
            id: 5,
            userId: 5,
            attachments: ['testimage5.jpg', 'testdata5.csv'],
            labels: ['Bot5', 'React5'],
            messages: [
                {
                    author: 'them',
                    data: { message: 'Hello!' },
                    id: 1234
                },
                {
                    author: 'buddy',
                    data: { message: 'Choose the perfect ambiance' },
                    id: 1235
                }
            ]
        },
        6: {
            id: 6,
            userId: 6,
            attachments: ['testimage6.jpg', 'testdata6.csv'],
            labels: ['Bot6', 'React6'],
            messages: [
                {
                    author: 'them',
                    data: { message: 'Hello!' },
                    id: 1234
                },
                {
                    author: 'buddy',
                    data: { message: 'Yes thanks!' },
                    id: 1235
                }
            ]
        },
        7: {
            id: 7,
            userId: 7,
            attachments: ['testimage7.jpg', 'testdata7.csv'],
            labels: ['Bot7', 'React7'],
            messages: [
                {
                    author: 'them',
                    data: { message: 'Hello!' },
                    id: 1234
                },
                {
                    author: 'buddy',
                    data: { message: 'Of course, send as an photo please' },
                    id: 1235
                }
            ]
        },

    })
    const [users, setUsers] = useState({
        1: {
            id: 1,
            name: 'Brandon Andrews',
            email: 'brandonandrews@gmail.com',
            phone: '+90 551 551 51 51',
            userActivity: { isOnline: true, status: '', lastLoginTime: 1677182356720 },
        },
        2: {
            id: 2,
            name: 'Clyton Day',
            email: 'clytonday@gmail.com',
            phone: '+90 554 554 54 54',
            userActivity: { isOnline: true, status: '', lastLoginTime: 1677176362206 },
        },
        3: {
            id: 3,
            name: 'Bernice Clark',
            email: 'berniceclark@gmail.com',
            phone: '+90 554 554 54 54',
            userActivity: { isOnline: true, status: '', lastLoginTime: 1677176362206 },
        },
        4: {
            id: 4,
            name: 'Christine Fields',
            email: 'christinefields@gmail.com',
            phone: '+90 554 554 54 54',
            userActivity: { isOnline: true, status: '', lastLoginTime: 1677176362206 },
        },
        5: {
            id: 5,
            name: 'Mike Morgan',
            email: 'mikemorgan@gmail.com',
            phone: '+90 554 554 54 54',
            userActivity: { isOnline: true, status: '', lastLoginTime: 1677176362206 },
        },
        6: {
            id: 6,
            name: 'Callie Schmidt',
            email: 'callieschmidt@gmail.com',
            phone: '+90 554 554 54 54',
            userActivity: { isOnline: true, status: '', lastLoginTime: 1677176362206 },
        },
        7: {
            id: 7,
            name: 'Herbert Watkins',
            email: 'herbertwatkins@gmail.com',
            phone: '+90 554 554 54 54',
            userActivity: { isOnline: true, status: '', lastLoginTime: 1677176362206 },
        }
    })

    const checkTime = () => {
        const updatedUsers = {};

        Object.keys(users).forEach(user => {
            const updatedUser = { ...users[user] };
            const loginDiffHours = moment().diff(moment(updatedUser.userActivity.lastLoginTime), 'hours')
            const loginDiffMinutes = moment().diff(moment(updatedUser.userActivity.lastLoginTime), 'minutes')
            if (loginDiffMinutes <= 1) {
                updatedUser.userActivity = ({ ...updatedUser.userActivity, isOnline: true, status: '' })
            } else {
                updatedUser.userActivity = ({ ...updatedUser.userActivity, isOnline: false, status: `${loginDiffHours > 0 ? `${loginDiffHours} hours ago` : `${loginDiffMinutes} minutes ago`}` })
            }
            updatedUsers[user] = updatedUser;
        });

        setUsers(updatedUsers);
    }

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        checkTime();

        const timeInterval = setInterval(() => {
            checkTime();
        }, 60000)

        return () => {
            clearInterval(timeInterval);
            socket.off('connect');
            socket.off('disconnect');
            socket.off('send-msg-response');
        };
    }, []);

    useEffect(() => {
        socket.on("send-msg-response", async (message) => {

            setTimeout(() => {
                const updatedUsers = {}
                Object.keys(users).forEach(user => {
                    if (user == selectedRoom) {
                        const updatedUser = { ...users[user] };
                        updatedUser.userActivity = ({ ...updatedUser.userActivity, isOnline: true, status: '', lastLoginTime: Date.now() })
                        updatedUsers[user] = updatedUser;
                    }else{
                        updatedUsers[user] = { ...users[user] }
                    }
                });
                setUsers(updatedUsers)
                setRooms(rooms => ({
                    ...rooms, [selectedRoom]: {
                        ...rooms[selectedRoom], messages: [...rooms[selectedRoom].messages, {
                            id: uuidv4(),
                            author: 'buddy',
                            data: { message: '...' }
                        }]
                    }
                }))
            }, 500)

            setTimeout(() => {
                audioPlayer.current.play();
                setRooms(rooms => ({
                    ...rooms, [selectedRoom]: {
                        ...rooms[selectedRoom], messages: [...rooms[selectedRoom].messages.slice(0, -1), {
                            id: uuidv4(),
                            author: 'buddy',
                            data: { message }
                        }]
                    }
                }))
            }, 2000)
        });
        return () => {
            socket.off('send-msg-response');
        };
    }, [selectedRoom, rooms])

    useEffect(() => {
        if (selectedRoom !== null) {
            socket.emit('join', selectedRoom)
        }
    }, [selectedRoom])

    const sendMessage = async () => {
        if (message.length > 0 && selectedRoom !== null) {
            await socket.emit('new-msg', { msg: message, room: selectedRoom });
            setRooms(rooms => ({
                ...rooms, [selectedRoom]: {
                    ...rooms[selectedRoom], messages: [...rooms[selectedRoom].messages, {
                        id: uuidv4(),
                        author: 'them',
                        data: { message }
                    }]
                }
            }))
            setMessage('')
        }
    }

    return (
        <ChatContext.Provider value={{ rooms, message, selectedRoom, users, sendMessage, setMessage, setSelectedRoom, audioPlayer }}>
            {children}
        </ChatContext.Provider>
    )
}