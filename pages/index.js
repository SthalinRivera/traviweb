import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "./components/Nav"; // Import the Nav component
import Carousel from "./components/Carousel"; // Import the Nav component
import Portal from "./components/Portal"; 
import Footer from "./components/Footer"; 
export default function Home() {
  return (
    <div id="componente" className={styles.gradient_background}>
      <Head>
        <title>TraviWeb-Inicio</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>  
     <Nav/>
     <Portal/>
     <Footer/>
    
    </div>
  );
}
