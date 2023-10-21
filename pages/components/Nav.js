import Link from "next/link";
import { useState } from "react";
import styles from "../index.module.css"
const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? styles.gradient_background_dark_menu : styles.gradient_background}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="/">TraviWeb</a>
        <button
          className="navbar-toggler bg-warning"
          type="button"
          onClick={toggleMobileMenu}>
          <span className="navbar-toggler-icon text-light "></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link text-light active" aria-current="page" href="/">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="parafrasear">Parafrasear</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="resumidor">Resumidor</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="q&a">Q&A</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="matriz_consistencia">Matriz consistencia</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="preguntas">Preguntas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="interpretador">Interpretador</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="articulos">Articulos Científicos</a>
            </li>
          </ul>
          <div className={`form-check form-switch ${styles.custom_switch_container}`}>
            <input type="checkbox" id="customSwitch" value="" onClick={toggleDarkMode} className={`form-check-input ${styles.form_check_input} ${styles.custom_switch}`} />
            <label className="form-check-label" htmlFor="customSwitch">
              <span className={` ${styles.custom_checkbox_icon} ${isDarkMode ? 'sun' : 'moon'}`}>{isDarkMode ? "☀" : "🌙"}</span>
            </label>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Nav;