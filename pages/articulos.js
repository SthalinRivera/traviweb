import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import * as FaIcons from 'react-icons/fa';
import * as PiIcons from 'react-icons/pi';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
 

  return (
    <div className={styles.gradient_background_dark}>
      <Head>
        <title>Articulos Científicos</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav />
      <div className="container">
        <h3 className={`text-center ${styles.gradient_background_text}`} >Todo sobre Articulos Científicos</h3>
        <p className={`ms-5 me-5 text-center ${styles.text_description_matriz}`}  > Los mejores buscadores de Articulos Científicos con inteligencia artificial.</p>


        <div class="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
    <div class="col-lg-6 px-0">
      <h1 class="display-4 fst-italic">SciSpace
</h1>
      <p class="lead my-3">SciSpace es una herramienta increíble (impulsada por IA) que le ayudará a comprender mejor los trabajos de investigación. Puede explicar y elaborar la mayoría de los textos académicos en palabras</p>
      <p class="lead mb-0"><a target="_black" href="https://typeset.io/" class="text-body-emphasis fw-bold">Explorar</a></p>
    </div>
  </div>
        </div>
      <Footer />
    </div>
  );
}
