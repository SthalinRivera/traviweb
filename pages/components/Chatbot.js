import { useState, useEffect, useRef } from "react";
import styles from "../index.module.css";

import * as FaIcons from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import cssBot from "./Chatbot.module.css"; // Importa tu archivo de estilos CSS
import * as FcIcons from "react-icons/fc";
const Chatbot = () => {
    const [mensajeInput, setMensajeInput] = useState("");
    const [result, setResult] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [isBotResponding, setIsBotResponding] = useState(false); // Nuevo estado
    const messageContainerRef = useRef(null);

    // Scroll hacia abajo cada vez que se actualiza el historial de mensajes
    useEffect(() => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }, [messageHistory]);

    // ...

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const botTypingMessage = { text: "Travi está escribiendo...", sender: 'bot' };

            // Agrega el mensaje de "Bot is typing..." al historial
            setMessageHistory([...messageHistory, { text: mensajeInput, sender: 'user' }, botTypingMessage]);

            // Limpia el mensaje de entrada
            setMensajeInput("");

            setTimeout(async () => {
                const response = await fetch("../api/chatbot", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mensaje: mensajeInput }),
                });

                const data = await response.json();
                if (response.status !== 200) {
                    throw data.error || new Error(`Request failed with status ${response.status}`);
                }

                // Remueve el mensaje de "Bot is typing..."
                setMessageHistory((prevHistory) => {
                    const updatedHistory = [...prevHistory];
                    const typingMessageIndex = updatedHistory.findIndex(
                        (message) => message === botTypingMessage
                    );
                    if (typingMessageIndex !== -1) {
                        updatedHistory.splice(typingMessageIndex, 1);
                    }
                    return [...updatedHistory, { text: data.result, sender: 'bot' }];
                });

                // Desplaza hacia abajo después de agregar la respuesta del bot
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }, 2000);

        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }

    // ...



    return (
        <div>
            <div className={`container  d-flex justify-content-center ${cssBot['']}`}>
                <div className={`card  bg-dark ${cssBot['']}`}>
                    <div className={`card-header d-flex flex-row justify-content-between p-1 adiv text-light bg-success bg-gradient ${cssBot['']}`}>
                        <i className="fas fa-chevron-left"></i>
                        <span className="pb-3">
                            <FaIcons.FaComment /> Live chat
                        </span>
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className={` ${cssBot['chat-history']}`} ref={messageContainerRef}>
                                <div className="m-3">
                                    <div className="row">
                                        <div className="col-1">
                                            <div className={`${cssBot['bg-bot']}`}> <FcIcons.FcReddit /> </div>
                                        </div>
                                        <div className="col-10">
                                            <div className={` ${cssBot['bg-bot-text']}`}>
                                                <p className={`card-text text-light mt-3 ${cssBot['bot-text']}`}>Hola soy Travi, ¿Cómo puedo ayudarte?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {messageHistory.map((message, index) => (
                                    <div key={index} className={`m-3 chat-message ${message.sender}`}>
                                        <div className={`message-text ${message.sender}-message`}>
                                            {message.sender === 'user' ? (
                                                <div className="row">
                                                    <div className="col-10">
                                                        <div className={` ${cssBot['bg-user-text']}`} >
                                                            <p className={`card-text text-light ${cssBot['user-text']}`}>{message.text}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-1">
                                                        <div className={` ${cssBot['bg-user']}`} >
                                                            <FcIcons.FcPortraitMode /> {/* User icon */}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="row">
                                                    <div className="col-1">
                                                        <div className={` ${cssBot['bg-bot']}`}> <FcIcons.FcReddit /> </div>
                                                    </div>
                                                    <div className="col-10">
                                                        <div className={` ${cssBot['bg-bot-text']}`}>
                                                            {isBotResponding && (
                                                                <p className={`card-text ${cssBot['bot-text']}`}>Travi está escribiendo...</p>
                                                            )}
                                                            <p className={`card-text text-light ${cssBot['bot-text']}`}>{message.text}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* ... (otros elementos del chat) */}
                    <div className={`${cssBot['']}`}>
                        <div className="card-footer text-muted bg-success bg-gradient">
                            <form onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col col-11">
                                        <input
                                            className={`form-control  bg-success bg-gradient text-light   ${cssBot['placeholder-color']}`}
                                            rows="2"
                                            placeholder="Escribe tu mensaje"
                                            name="mensaje"
                                            value={mensajeInput}
                                            onChange={(e) => setMensajeInput(e.target.value)}
                                         
                                        ></input>
                                    </div>
                                    <div className="col col-1">
                                        <button
                                            type="submit"
                                            className={`btn btn-warning ${cssBot['']}`}
                                        >
                                            <FaIcons.FaTelegramPlane color="white" size="15px" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Chatbot;
