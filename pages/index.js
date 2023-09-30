import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "./components/Nav"; // Import the Nav component
import * as FaIcons from 'react-icons/fa';
import Portal from "./components/Portal";
import Footer from "./components/Footer";
import Chatbot  from "./components/Chatbot";

import React, { useEffect } from 'react';
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div id="componente" className={` ${isDarkMode ? styles["gradient_background_dark"] : styles["gradient_background"]}`}>
      <Head>
        <title>TraviWeb-Inicio</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav />
      <div className="App">
        <header className="App-header">
        </header>
      </div>  
       <Chatbot />
     
      <Portal />
   
      <div className="contaniner"></div>
      <div >
        
        <button className={styles.floating_button} onClick={toggleDarkMode}> {isDarkMode ? "☀" : "🌙"}</button>
        <Footer />
      </div>
    </div>
  );
}
