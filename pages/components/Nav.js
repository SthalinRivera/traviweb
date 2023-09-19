import Link from "next/link";
import { useState } from "react";
import styles from "../index.module.css"
const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.gradient_background}`}>
      <div className="container-fluid">
        <a className={`navbar-brand ${styles.text_gt}`} href="/">TraviWeb</a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobileMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="parafrasear">Parafrasear</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="resumidor">Resumedor</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="q&a">Q&A</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="matriz_consistencia">Matriz consistencia</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="preguntas">Preguntas</a>
            </li>
            
          </ul>
          <a target="_black"  className={styles.subrayado_none} href="https://api.whatsapp.com/send?phone=51910985938&text=Hola,%20vengo%20desde%20la%20en%20app%20y%20..."> <button type="button" className={styles.bg_gt} >Contactanos</button></a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;