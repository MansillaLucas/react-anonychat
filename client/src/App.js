import { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3001");
const socket = io("/");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [numUsers, setNumUsers] = useState();

  useEffect(() => {

    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    const updateUserCount = (userCount) =>{
      setNumUsers(userCount);
    };

    const handleTabClose = (event) => {
      event.preventDefault();
      alert('Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);
    socket.on("message", receiveMessage);
    socket.on("connectedUser", updateUserCount)
    socket.on("disconnectedUser", updateUserCount)

    return () => {
      socket.off("message", receiveMessage);
      socket.off("connectedUser", receiveMessage);
      socket.off("disconnectedUser", receiveMessage);
      window.removeEventListener('beforeunload', handleTabClose);
    };

  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Yo",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <div className="h-screen bg-zinc-900 text-white flex items-center justify-center">

      <div className="grid grid-cols-2 grid-rows-2 w-auto bg-zinc-700 rounded-md">
        <div >Esto es una columnda de ejemplo</div>
        <div>
          <ul className="h-80 overflow-y-auto">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`my-2 p-2 table text-sm rounded-md ${message.from === "Yo" ? "bg-sky-700 ml-auto" : "bg-black"
                  }`}
              >
                <b>{message.from}</b>:{message.body}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-start-1 row-start-2">Usuarios conectados actualmente: {numUsers}</div>

        <div className="col-start-2 row-start-2">
          <form onSubmit={handleSubmit} className="">
            <h1 className="text-2xl font-bold my-2">AnonyChat</h1>
            <input
              name="message"
              type="text"
              placeholder="Ingresa tu mensaje..."
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
