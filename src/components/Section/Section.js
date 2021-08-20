import React, { useContext, useEffect, useRef, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ActiveChat } from '../../context/ActiveChat'
import { CountMessages } from '../../context/CountMessages'
import { getCurrentDate } from '../Functions'
import { Message } from './Message/Message'
import './Section.scss'

export const Section = (props) => {
    const [state, setState] = useState({
        value: '',
    })

    const chats = JSON.parse(localStorage.getItem('chats'))
    const { activeChat } = useContext(ActiveChat)
    const { setCountMess } = useContext(CountMessages)

    const chat = useRef(null)
    const inputText = useRef(null)

    const submitHandler = (event) => {
        event.preventDefault()
        const newMessage = state.value

        if (!state.value.trim()) return null

        setState(prev => ({
            ...prev,
            value: ''
        }))

        const openChat = localStorage.getItem('openChat')
        const prevMessages = JSON.parse(localStorage.getItem('messages'))
        const messagesOpenChat = prevMessages && prevMessages[openChat]

        const newMessOpenChat = {
            ...messagesOpenChat,
            [getCurrentDate()]: newMessage
        }


        const messages = JSON.stringify({
            ...prevMessages,
            [openChat]: { ...newMessOpenChat }
        })

        localStorage.setItem('messages', messages)
        chat.current.scrollTop = chat.current.scrollHeight
        setCountMess(prev => prev + 1)
    }

    useEffect(() => {
        chat.current.scrollTop = chat.current.scrollHeight
    }, [])

    useEffect(() => {
        inputText.current.focus()
        chat.current.scrollTop = chat.current.scrollHeight
    }, [activeChat])

    return (
        <section className='Section'>
            <div className='header'>
                <h1>{activeChat || localStorage.getItem('openChat')}</h1>
            </div>
            <div ref={chat} className='messages'>
                <Switch>
                    {chats &&
                        Object.values(chats).map((chatName, index) => {
                            return <Route
                                key={chatName}
                                path={'/messeger/' + chatName.trim()}
                                component={() => 
                                    <Message
                                        openChat={activeChat || localStorage.getItem('openChat')}
                                    />}
                                    />
                        })
                    }
                </Switch>
            </div>
            <form onSubmit={(e) => submitHandler(e)}>
                <div className='line' />
                <input
                    type='text'
                    ref={inputText}
                    className='type-message'
                    placeholder='Type a message...'
                    value={state.value}
                    onChange={(e) => setState(prev => ({
                        ...prev,
                        value: e.target.value
                    }))}
                    onSubmit={(e) => submitHandler(e)}
                />
                <button onSubmit={(e) => submitHandler(e)}></button>
            </form>
        </section>
    )
}