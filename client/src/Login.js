import { useContext, useState } from 'react'
import { ChatContext } from './ChatContext'

export default function Login() {

    const [showLoginModal, setShowLoginModal] = useState(true)
    const { userName, setUserName } = useContext(ChatContext)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowLoginModal(false)
    };

    return (
        <>
            {showLoginModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-700 outline-none focus:outline-none">

                                {/*header*/}
                                <div className="flex items-center justify-center p-5 rounded-t bg-green-500">
                                    <h3 className="text-3xl text-white font-semibold">¡A chatear!</h3>
                                </div>

                                {/*body*/}
                                <div className="relative p-5 flex-auto">
                                    <p className="text-white text-lg leading-relaxed">
                                        No necesitas registrarte, si hay personas disponibles van a poder ver tus mensajes.
                                    </p>
                                </div>
                                <form
                                onSubmit={handleSubmit}
                                className='flex items-center justify-center'>
                                    <input
                                        name="userName"
                                        type="text"
                                        placeholder="Ingresa tu nombre de usuario."
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="border-2 border-zinc-500 p-2 w-3/5 text-black justify-center align-middle"
                                        value={userName}
                                        autoFocus
                                    />
                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 rounded-b">
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}