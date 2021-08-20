import React, { useState } from "react"

export const ActiveChat = React.createContext()

export const ActiveChatProvider = ({ children }) => {
    const [activeChat, setChat] = useState('')

    return (
        <ActiveChat.Provider value={{activeChat, setChat}}>
            {children}
        </ActiveChat.Provider>
    )
}