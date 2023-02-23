import AngleDown from '../angle_down.png'
import SettingsIcon from '../settings_icon.png'

export const ChatRoomSettings = () => {
    return (
        <div className="justify-between items-center p-5 h-[92px] hidden md:flex">
                    <div className='cursor-pointer flex items-center'><span className='mr-2'>All Messages</span> <img src={AngleDown} alt="" /></div>
                    <img className='cursor-pointer' src={SettingsIcon} alt="" />
                </div>
    )
}