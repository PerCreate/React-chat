import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActiveChat } from '../../../context/ActiveChat'
import './Chapter.scss'
import { CountMess } from './CountMess'

export const Chapter = () => {
    const [activeLink, setActiveLink] = useState('')
    const [chatState, setChatState] = useState(true)
    const { setChat } = useContext(ActiveChat)

    const chats = JSON.parse(localStorage.getItem('chats'))
    //Set active chat at localStorage and at context 'ActiveChat' to save active state color
    const setActiveChat = (chatName) => {
        localStorage.setItem('openChat', chatName)
        setChat(chatName)
        setActiveLink(chatName)
    }
    //delete chat and rerender component to display the change immediately. Used useless state to rerender, 
    // not sure if this is good practice
    const deleteChat = (e, chatName) => {
        e.preventDefault()
        delete chats[chatName]
        localStorage.setItem('chats', JSON.stringify(chats))
        setChatState(!chatState)
    }

    return (
        <div className='Chapter'>
            {chats &&
                Object.values(chats).map((chatName, index) => {
                    const correctPath = chatName.replaceAll(' ', '')
                    return (
                        <Link
                            key={chatName}
                            to={'/messeger/' + correctPath}
                            className={`chat 
                                    ${activeLink === chatName
                                    ? 'active'
                                    : 'unactive'}`}
                            onClick={() => setActiveChat(chatName)}
                        >
                            <div className='link-icon' />
                            <span>{chatName} ({<CountMess currentChatName={chatName} />})</span>
                            <div className='close-btn'>
                                <button onClick={(e) => deleteChat(e, chatName)} />
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}