export const ChatRoomMessageItem = ({message,index}) => {
    return (
        <div key={index} className={`flex justify-${message.author === 'buddy' ? 'start' : 'end'}`}>
                                <div className={`text-xs rounded p-3 rounded rounded-full ${message.author === 'buddy' ? 'bg-white rounded-bl-none' : 'bg-blue rounded-br-none text-white'}`}>{message.data.message}</div>
        </div>
    )
}