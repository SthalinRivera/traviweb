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
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Obtén el contador de visitas almacenado en localStorage
    const storedCount = localStorage.getItem('visitCount');
    
    if (storedCount) {
      // Si se encuentra en localStorage, actualiza el estado
      setVisitCount(parseInt(storedCount, 10));
    } else {
      // Si no se encuentra, establece el contador en 0
      localStorage.setItem('visitCount', '0');
    }

    // Iniciar un temporizador para aumentar el contador automáticamente cada 5 segundos
    const timer = setInterval(incrementVisitCount, 5000);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearInterval(timer);
  }, []);

  const incrementVisitCount = () => {
    // Incrementa el contador y actualiza el estado
    const newCount = visitCount + 1;
    setVisitCount(newCount);

    // Guarda el nuevo contador en localStorage
    localStorage.setItem('visitCount', newCount.toString());
  };
  return (
    <div id="componente" className={styles.gradient_background}>
      <Head>
        <title>TraviWeb-Inicio</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>  
     <Nav/>

     <div className="App">
      <header className="App-header">
        <p>Visitas: {visitCount}</p>
      </header>
    </div>
     <Portal/>
     <Footer/>
    
    </div>
  );
}
