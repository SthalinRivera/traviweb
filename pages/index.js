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
      <Nav/>
      <button className="btn btn-primary" onClick={openModal}>
        Abrir modal
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">  <Chatbot/></div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
            
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}

<div className="container">
        <button className={cssBot.floating_button} onClick={showModal ? closeModal : openModal}>
          {/* Utiliza el estado "isRobotIcon" para mostrar el ícono apropiado */}
          {isRobotIcon ? <FaIcons.FaRobot /> : <FaIcons.FaTimes />}
        </button>
        <div className={`${cssBot.floating_chat_position}`}>
          <div className={`m-0 p-0   ${showModal ? 'show' : ''}`} tabIndex="-3" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog " role="document">
              <div className="modal-content bg-dark ">
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

      <Portal />

      <Footer />
    </div>
  );
}
