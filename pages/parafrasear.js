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
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [textHistory, setTextHistory] = useState([]); // State variable to store entered text
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("normal"); // Estado para almacenar la opción seleccionada
  const notify = () => toast.success('copied')

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
      const response = await fetch("/api/generate", {
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
  };

  return (
    <div className={styles.gradient_background_dark}>
      <Head>
        <title>Parafrasador</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav />

      <div className="container">

        <h3 className={`text-center ${styles.gradient_background_text}`} >Parafraseador IA</h3>
        <p className={`ms-5 me-5 text-center ${styles.text_description_matriz}`} >Para parafrasear online usando nuestra herramienta de paráfrasis de texto, escriba o pegue y haga clic en el botón "Parafrasear Textos".</p>
        <div class="card mb-2">
          <div class="card-header">
            <button
              type="button"
              className={`btn btn-light ms-1 ${selectedOption === "sencillo" ? "active" : ""}`}
              onClick={() => setSelectedOption("sencillo")}
            >
              Sencilla  <PiIcons.PiListMagnifyingGlassBold color="purple" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 ${selectedOption === "corto" ? "active" : ""}`}
              onClick={() => setSelectedOption("corto")}
            >
              Corto  <PiIcons.PiShootingStarDuotone color="purple" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 ${selectedOption === "Resumido" ? "active" : ""}`}
              onClick={() => setSelectedOption("Resumido")}
            >
              Resumido <FaIcons.FaMeteor color="purple" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 ${selectedOption === "Extensivo" ? "active" : ""}`}
              onClick={() => setSelectedOption("Extensivo")}
            >
              Extensivo <FaIcons.FaAlignCenter color="purple" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 ${selectedOption === "inteligente" ? "active" : ""}`}
              onClick={() => setSelectedOption("inteligente")}
            >
              Inteligente <FaIcons.FaHeadSideVirus color="purple" size="20px" />
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">

                <form onSubmit={onSubmit}>
                  <div className="">
                    <textarea
                      type="text"
                      name="animal"
                      rows="16"
                      className="form-control"
                      placeholder="Ingresa tu párrafo en español ... Máximo 1000 caracteres por vez"
                      value={animalInput}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="mt-1">Número de caracteres: {charCount}</p>
                  <div class="d-grid gap-2">
                    <input type="submit" className={`mb-2 mt-0 ${styles.bg_gt}`} value="Parafrasear Textos" />
                    <Toaster />
                  </div>
                </form>
              </div>

              <div className="col-sm-6 ">

                <div class="position-relative">
                  <div class="text-center">
                    <p class="fst-italic mt-2"> "Aquí se presentará el texto parafraseado"</p>
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
                        <h5 className="card-title text-dark">Texto ingresado</h5>
                        {textHistory}
                      </div>
                    </div>
                    <div className="card mt-2">
                      <div className="card-body">
                        <h5 className="card-title text-dark ">Texto parafraseado</h5>
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
                <h1 className="text-white mt-3" >Parafrasea y dale sentido a tus parrafos </h1>
                <p className={`${styles.text_description_matriz}`}>Simplemente ingresa tu texto y obtén rápidamente una versión única y coherente. Simplifica la tarea de reformular contenidos de manera eficiente y efectiva, ahorrando tiempo y esfuerzo.</p>
              </div>
            </div>


          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
