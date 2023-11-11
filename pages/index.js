import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import cssBot from "./components/Chatbot.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "./components/Nav"; // Import the Nav component
import * as FaIcons from 'react-icons/fa';
import Portal from "./components/Portal";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Publicidad from "./components/Publicidad";
import * as FcIcons from "react-icons/fc";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isRobotIcon, setIsRobotIcon] = useState(true);

  const openModal = () => {
    setShowModal(true);
    setIsRobotIcon(false); // Cambia el estado del ícono cuando se abre el modal
  };

  const closeModal = () => {
    setShowModal(false);
    setIsRobotIcon(true); // Cambia el estado del ícono cuando se cierra el modal
  };



  return (
    <div id="componente" className={`${styles.gradient_background_dark}`}>
      <Head>
        <title>TraviWeb-Inicio</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Publicidad/>
      <Nav />

     <Portal />
      <div className="container">
        <button className={cssBot.floating_button} onClick={showModal ? closeModal : openModal}>
          {/* Utiliza el estado "isRobotIcon" para mostrar el ícono apropiado */}
          {isRobotIcon ? <FaIcons.FaRobot /> : <FaIcons.FaTimes />}
        </button>
        <div className={`${cssBot.floating_chat_position}`}>
          <div className={`m-0 p-0   ${showModal ? 'show' : ''}`} tabIndex="-3" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog " role="document">
              <div className="modal-content bg-dark border-5">
                <div className={`modal-header ${cssBot.chat_bg_header_dark}`} >
                  <span className="p-2 m-2">
                    <h5 className="modal-title mx-auto text-light">
                      <FcIcons.FcReddit /> Chatea con Travi IA
                    </h5>
                  </span>
                </div>
                <div className="modal-body ">
                  <Chatbot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

 

      <Footer />
    </div>
  );
}
