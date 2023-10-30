import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import * as FaIcons from 'react-icons/fa';
import * as PiIcons from 'react-icons/pi';
import toast, { Toaster } from 'react-hot-toast';
import React, { useRef } from 'react';
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [textHistory, setTextHistory] = useState([]); // State variable to store entered text
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("normal"); // Estado para almacenar la opción seleccionada
  const notify = () => toast.success('copied')

  const textAreaRef = useRef(null);
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const tableLines = text.trim().split('\n');

    if (tableLines.length >= 2) {
      const markdownTable = tableLines.map((row, index) => {
        const cells = row.split('\t').map((cell) => cell.trim());
        return `| ${cells.join(' | ')} |`;
      });

      const tableMarkdown = markdownTable.join('\n');
      textAreaRef.current.value += `${tableMarkdown}`;
    }
  };


  // Función para copiar el texto al portapapeles
  const copyToClipboard = () => {
    const textToCopy = result;
    // Crea un elemento de textarea temporal para copiar el texto al portapapeles
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    // Selecciona y copia el texto
    textarea.select();
    document.execCommand('copy');
    // Limpia el elemento de textarea temporal
    document.body.removeChild(textarea);
    notify();
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true); // Mostrar el spinner mientras se carga
    try {
      const response = await fetch("/api/interpretador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput, option: selectedOption }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");

      // Add the entered text to the textHistory array
      setTextHistory([animalInput]);
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    } finally {
      setIsLoading(false); // Ocultar el spinner después de cargar
    }
  }
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setAnimalInput(inputValue);
    setCharCount(inputValue.length);
    if (inputValue.length >= 1000) {
          alert('Se ha superado el límite de 1000 caracteres.');
    } 
    
  };

  return (
    <div className={styles.gradient_background_dark}>
      <Head>
        <title>Interpretador</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav />

      <div className="container">
        <h3 className={`text-center ${styles.gradient_background_text}`} >Interpretador IA</h3>
        <p className={`ms-5 me-5 text-center ${styles.text_description_matriz}`} >Nuestra app te brinda análisis instantáneos y comprensibles de tus datos estadísticos, con solo copiar y pegar.</p>
        <h5 className="text-light">Recomendaciones</h5>
        <ul class="list n text-light">
          <li class="list--item">Asegurate que tenga un título la tabla</li>
          <li class="list-group-">Asegurar que se una tabla </li>
          <li class="list-group-">Cada fila y columna se diferencia con " | " </li>
        </ul>
        <div class="card mb-2">
          <div class="card-header">
            <button
              type="button"
              className={`btn btn-light ms-1 ${selectedOption === "Tabla Frecuencia" ? "active" : ""}`}
              onClick={() => setSelectedOption("Tabla Frecuencia")}
            >
              Tabla Frecuencia  <PiIcons.PiListMagnifyingGlassBold color="purple" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 ${selectedOption === "Prueba de normalidad" ? "active" : ""}`}
              onClick={() => setSelectedOption("Prueba de normalidad")}
            >
              Prueba de normalidad  <PiIcons.PiShootingStarDuotone color="purple" size="20px" />
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <form onSubmit={onSubmit}>
                  <div className="">
                    <textarea
                      ref={textAreaRef}
                      onPaste={handlePaste}
                      type="text"
                      name="animal"
                      rows="16"
                      className="form-control"
                      placeholder="Pega la tabla de Word aquí."
                      value={animalInput}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="mt-1">Número de caracteres: {charCount}</p>
                  <div class="d-grid gap-2">
                    <input type="submit" className={`mb-2 mt-0 ${styles.bg_gt}`} value="Interpretar tabla" />
                    <Toaster />
                  </div>
                </form>
              </div>

              <div className="col-sm-6 ">

                <div class="position-relative">
                  <div class="text-center">
                    <p class="fst-italic mt-2"> "Aquí se presentará el texto Interpretado"</p>
                  </div>
                </div>
                {isLoading ? ( // Mostrar el spinner si isLoading es true
                  <div class="text-center mt-4">
                    <div class="spinner-border " role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : result ? ( // Mostrar el resultado si result tiene datos
                  <main className={styles.main}>

                    <div className="card mt-2">
                      <div className="card-body">
                        <h5 className="card-title text-dark ">Texto Interpretado</h5>
                        <p className="card-text">{result}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-center ">
                      <button className="btn btn-light mt-2" onClick={copyToClipboard}>
                        Copy <FaIcons.FaCopy color="purple" />
                      </button>
                      <Toaster />
                    </div>

                  </main>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-sm-6">
            <div className="text-center">
              <img src="/3.gif" class=" rounded-4 img-fluid" alt="..." width={400} />
            </div>
          </div>
          <div class="col-sm-6">
            <div className="container">
              <div className="rounded-4 text-center">
                <h1 className="text-white mt-3" >Interpretar ahora es solo Ctrl+c y Ctrl+v  </h1>
                <p className={`${styles.text_description_matriz}`}>Descubre la aplicación definitiva para interpretar tablas de frecuencias, resultados de pruebas de normalidad y mucho más, impulsada por inteligencia artificial. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
