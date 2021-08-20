import React, { useState } from "react"

export const CountMessages = React.createContext()

export const CountMessagesProvider = ({ children }) => {
    const [countMess, setCountMess] = useState(0)

    return (
        <CountMessages.Provider value={{countMess, setCountMess}}>
            {children}
        </CountMessages.Provider>
    )
}