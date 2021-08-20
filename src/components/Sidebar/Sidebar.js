import React, { useEffect, useRef, useState } from 'react'
import './Sidebar.scss'
import '../UI/Button.scss'
import { Chapter } from './Chapter/Chapter'

export const Sidebar = () => {
    const [state, setState] = useState({
        countChats: 0,
        chatName: '',
        isBtnPress: false,
    })

    const inputEl = useRef(null)

    const setChat = event => {
        const chatName = event.target.value

        if (event.key !== 'Enter') return null

        setState(prev => ({
            ...prev,
            isBtnPress: false
        }))

        if (!chatName.trim()) return null

        const prevChats = JSON.parse(localStorage.getItem('chats'))

        const chats = JSON.stringify({
            ...prevChats,
            [chatName]: chatName
        })
        localStorage.setItem('chats', chats)
        console.log(JSON.parse(localStorage.getItem('chats')))
    }

    useEffect(() => {
        inputEl.current && inputEl.current.focus()
    }, [state.isBtnPress])

    return (
        <div className='Sidebar'>
            <div className='btn-container'>
                <div className='user-data'>
                    <div className='user-photo' />
                    <span>Pershin Konstantin</span>
                </div>
                <button
                    onClick={() => setState(prev => ({ 
                        ...prev, 
                        isBtnPress: !state.isBtnPress 
                    }))}
                />
            </div>
            <nav>
                <h2>MESSAGES</h2>
                <h5>history</h5>
                {
                    state.isBtnPress
                        ? <> <input
                            className='alert'
                            type='text'
                            ref={inputEl}
                            onKeyPress={setChat}
                            placeholder='new chat...'
                        /></>
                        : null
                }
                <Chapter chatName={state.chatName} countChats={state.countChats} />
            </nav>
        </div>
    )
}