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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
              <div className="modal-body">Contenido del modal...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary">
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}
      <Portal />

      <Footer />
    </div>
  );
}
