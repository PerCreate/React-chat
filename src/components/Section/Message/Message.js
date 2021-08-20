import './Message.scss'


export const Message = ({ openChat }) => {

    const messages = JSON.parse(localStorage.getItem('messages'))

    return (
        <div className='Message'>
            {
                messages &&
                Object.entries(messages).map(([currentChatName, mess]) => {
                    if (!openChat.trim()) return null

                    if (currentChatName === openChat) {
                        return Object.entries(mess).map(([date, message]) => {
                            return (
                                <div key={date} className='message-container'>
                                    <div className='task-info' />
                                    <div className='date-info' >
                                        <div>{message}</div>
                                        <div>{date}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    return null
                })
            }
        </div>
    )
}