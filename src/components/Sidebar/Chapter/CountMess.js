import { useContext, useEffect } from "react"
import { CountMessages } from "../../../context/CountMessages"


export const CountMess = ({ currentChatName }) => {

    const messages = JSON.parse(localStorage.getItem('messages'))
    const { countMess } = useContext(CountMessages)

    useEffect(() => {
        
    }, [countMess])

    if (messages) {
        const chatObj = Object.entries(messages).filter(([chatName, mess]) => chatName === currentChatName)[0]

        if (chatObj) {
            return  Object.values(chatObj[1]).length
        }
    }
    return 0
}

