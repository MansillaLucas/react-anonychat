import { useContext, useEffect, useState } from "react";
import { ChatContext } from './ChatContext'
import io from "socket.io-client";

// const socket = io("http://localhost:3001");
const socket = io("/");

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [numUsers, setNumUsers] = useState(1);
    const { userName } = useContext(ChatContext)
    useEffect(() => {

        const receiveMessage = (message) => {
            setMessages([message, ...messages]);
        };

        const updateUserCount = (userCount) => {
            setNumUsers(userCount);
        };

        socket.on("message", receiveMessage);
        socket.on("connectedUser", updateUserCount)
        socket.on("disconnectedUser", updateUserCount)

        return () => {
            socket.off("message", receiveMessage);
            socket.off("connectedUser", receiveMessage);
            socket.off("disconnectedUser", receiveMessage);
        };

    }, [messages]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = {
            body: message,
            from: userName
        };
        setMessages([newMessage, ...messages]);
        setMessage("");
        socket.emit("message", newMessage.body, newMessage.from);
    };

    return (
        <div className="h-screen bg-zinc-900 text-white flex justify-center overflow-hidden p-5">

            <div className="grid grid-cols-2 grid-rows-2 w-full bg-zinc-700 rounded-md p-5">

                <div className="h-full row-span-5 p-3">
                    <h1 className="text-2xl font-bold my-2">AnonyChat</h1>
                    <h2>Usuarios conectados</h2>
                    <ul className="overflow-y-auto">

                    </ul>
                </div>
                <div className="h-full overflow-y-auto row-span-5 p-3 bg-zinc-500">
                    <ul>
                        {messages.map((message, index) => (
                            <li
                                key={index}
                                className={`my-2 p-2 table text-sm rounded-md ${message.from === userName ? "bg-sky-500 ml-auto" : "bg-green-500"
                                    }`}
                            >
                                <b>{message.from === userName ? 'Yo' : message.from}</b>:{message.body}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-start-1 row-start-6 bg-sky-500 rounded-l-md p-3">
                    <p>Usuarios conectados actualmente: {numUsers}</p>
                </div>

                <div className="col-start-2 row-start-6 bg-sky-500 rounded-r-md p-3">
                    <form onSubmit={handleSubmit} className="">
                        <input
                            name="message"
                            type="text"
                            placeholder={"Envia tu mensaje como el usuario " + userName}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border-2 border-zinc-500 p-2 w-full text-black"
                            value={message}
                            autoFocus
                        />
                    </form>
                </div>

            </div>

        </div>
    );
}