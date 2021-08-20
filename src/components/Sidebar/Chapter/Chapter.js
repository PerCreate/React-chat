import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActiveChat } from '../../../context/ActiveChat'
import './Chapter.scss'
import { CountMess } from './CountMess'

export const Chapter = () => {
    const [activeLink, setLink] = useState('')
    const { setChat } = useContext(ActiveChat)

    const chats = JSON.parse(localStorage.getItem('chats'))


    const setActiveChat = (chatName) => {
        localStorage.setItem('openChat', chatName)
        setChat(chatName)
        setLink(chatName)
    }



    return (
        <div className='Chapter'>
            {chats &&
                Object.values(chats).map((chatName, index) => {
                    return (
                        <Link
                            key={chatName}
                            to={'/messeger/' + chatName}
                            className={`chat 
                                    ${activeLink === chatName
                                    ? 'active'
                                    : 'unactive'}`}
                            onClick={() => setActiveChat(chatName)}
                        >
                            <div className='link-icon' />
                            <span>{chatName} ({<CountMess currentChatName={chatName} />})</span>
                        </Link>)
                })
            }
        </div>
    )
}