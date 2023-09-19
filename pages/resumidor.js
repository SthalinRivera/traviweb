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
      const response = await fetch("/api/resumidor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text_resumen: animalInput, option: selectedOption }),
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
    <div className={styles.gradient_background}>
      <Head>
        <title>Resumidor IA</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav />

      <div className="container">

        <h3 className={`text-center ${styles.text_gt}`} >Resumidor IA</h3>
        <p className="container text-center">Para utilizar nuestro resumidor en línea con nuestra avanzada herramienta de resumir texto usando inteligencia artificial, solo necesita escribir o pegar su contenido y luego hacer clic en el botón que dice 'Resumir Textos'.</p>
        <div class="card mb-2">
          <div className={`card-header ${styles.bg_card_resumidor}`}>
            <button
              type="button"
              className={`btn btn-light ms-1 mt-1 ${selectedOption === "Narrativo" ? "active" : ""}`}
              onClick={() => setSelectedOption("Narrativo")}
            >
              Narrativo  <FaIcons.FaBook color="#045FB4" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 mt-1 ${selectedOption === "Analítico" ? "active" : ""}`}
              onClick={() => setSelectedOption("Analítico")}
            >
              Analítico  <FaIcons.FaChartArea color="#045FB4" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 mt-1 ${selectedOption === "Informativo" ? "active" : ""}`}
              onClick={() => setSelectedOption("Informativo")}
            >
              Informativo <FaIcons.FaCommentAlt color="#045FB4" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 mt-1 ${selectedOption === "visual" ? "active" : ""}`}
              onClick={() => setSelectedOption("visual")}
            >
              Visual <FaIcons.FaBookOpen color="#045FB4" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 mt-1 ${selectedOption === "creativo" ? "active" : ""}`}
              onClick={() => setSelectedOption("creativo")}
            >
              Creativo <FaIcons.FaStar color="#045FB4" size="20px" />
            </button>
            <button
              type="button"
              className={`btn btn-light ms-1 mt-1 ${selectedOption === "Crítico" ? "active" : ""}`}
              onClick={() => setSelectedOption("Crítico")}
            >
              Crítico <FaIcons.FaHeadSideVirus color="#045FB4" size="20px" />
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
                    <input type="submit" className={`mb-2 mt-0 ${styles.bg_gt}`} value="Resumir Textos" />
                    <Toaster />
                  </div>
                </form>
              </div>

              <div className="col-sm-6 ">
                <div class="position-relative">
                  <div class="position-absolute top-50 start-50 translate-middle">
                    <p class="fst-italic mt-5"> "Aquí se presentará el texto resumido"</p>
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
                        <h5 className="card-title text-dark ">Texto Resumido</h5>
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


      </div>
      <Footer />
    </div>
  );
}
