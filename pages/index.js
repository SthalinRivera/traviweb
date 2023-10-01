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
 
  return (
    <div id="componente" className={`${styles.gradient_background_dark}`}>
      <Head>
        <title>TraviWeb-Inicio</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav/>
      <Portal />

      <Footer />
    </div>
  );
}
