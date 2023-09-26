import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "./components/Nav"; // Import the Nav component
import Carousel from "./components/Carousel"; // Import the Nav component
import Portal from "./components/Portal"; 
import Footer from "./components/Footer"; 
import React, { useEffect} from 'react';
export default function Home() {


  return (
    <div id="componente" className={styles.gradient_background_dark}>
      <Head>
        <title>TraviWeb-Inicio</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>  
     <Nav/>

     <div className="App">
      <header className="App-header">
        
      </header>
    </div>
     <Portal/>
     <div className="contaniner"></div>
   
     <Footer/>
    
    </div>
  );
}
