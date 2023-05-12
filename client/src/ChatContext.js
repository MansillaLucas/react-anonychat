import { createContext, useState } from 'react'

export const ChatContext = createContext()

export function ChatContextProvider(props) {

    const [userName, setUserName] = useState()

    return (
        <ChatContext.Provider
        value={{
            userName,
            setUserName
        }}>
            {props.children}
        </ChatContext.Provider>
    )
}