import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import * as FaIcons from 'react-icons/fa';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
export default function Home() {
  const [va01Input, setVa01Input] = useState(""); // Renamed the state variable
  const [va02Input, setVa02Input] = useState(""); // Renamed the state variable
  const [result, setResult] = useState("");
  const [textHistory, setTextHistory] = useState([]); // State variable to store entered text
  const [enfoqueInvestigacion, setEnfoqueInvestigacion] = useState("");
  const [tipoInvestigacion, setTipoInvestigacion] = useState("");
  const [disenoInvestigacion, setDisenoInvestigacion] = useState("");
  const [tiposDisenoExperimental, setTiposDisenoExperimental] = useState("");
  const [tiposDisenoNoExperimental, setTiposDisenoNoExperimental] = useState("");
  const [nivelInvestigacion, setNivelInvestigacion] = useState("");

  const [showTiposDisenoExperimental, setShowTiposDisenoExperimental] = useState(false); // Estado para controlar la visibilidad
  const [showTiposDisenoNoExperimental, setShowTiposDisenoNoExperimental] = useState(false); // Estado para controlar la visibilidad
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate.q&a", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ va01: va01Input, va02: va01Input, enfoque: va01Input }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setVa01Input("");
      setVa02Input("");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    // Create an object to store the form inputs
    const formData = {
      va01Input,
      va02Input,
      enfoqueInvestigacion,
      tipoInvestigacion,
      disenoInvestigacion,
      tiposDisenoExperimental,
      tiposDisenoNoExperimental,
      nivelInvestigacion
      // Add other form fields here
    };

    // Save the entered form data to textHistory
    setTextHistory([...textHistory, formData]);

    // Clear the form inputs
    setVa01Input("");
    setVa02Input("");

    // You can also make API requests here with the formData if needed
  }
  // Función para dividir el texto en `result` en una matriz de cadenas de texto usando expresiones regulares
  function splitTextIntoList(text) {
    const regex = /\d+/g; // Expresión regular para encontrar números
    const parts = text.split(regex);
    return parts.map((part, index) => (
      <li key={index}>{part}</li>
    ));
  }

  return (
    <div className={styles.gradient_background}>
      <Head>
        <title>Generar preguntas y respuestas con IA</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav />

      <div className="container">

        <div className="d-flex justify-content-center align-items-center">
          <div className="position-relative text-center">
            <div className=" " >
              <h3 className={`text-center mt-2 ${styles.text_gt}`}>Generar preguntas y respuestas con IA</h3>
              <p className="ms-5 me-5m mb-3 text-dark " >Nuestra aplicación utiliza inteligencia artificial para generar respuestas y preguntas comunes relacionadas con tesis académicas. ¿Quieres ensayar ahora?</p>
            </div>
          </div>
        </div>



        <div class="row">

          <div class="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h5 className={`text-center ${styles.text_gt}`}>Ingresar algunos datos para generar tus respuestas</h5>
              </div>
              <div class="card-body">
                <form onSubmit={onSubmit}>
                  <div className="">
                    <div class="mb-3">
                      <label htmlFor="exampleFormControlInput1" class="form-label">Variable Independiente o Variable 01</label>
                      <input
                        type="text"
                        rows="16"
                        name="va01"
                        className="form-control"
                        placeholder=" "
                        value={va01Input}
                        onChange={(e) => setVa01Input(e.target.value)}
                      />
                    </div>
                    <div class="mb-3">
                      <label htmlFor="exampleFormControlInput1" class="form-label">Variable Dependiente o Variable 02</label>
                      <input
                        type="text"
                        rows="16"
                        className="form-control"
                        placeholder=" "
                        value={va02Input}
                        onChange={(e) => setVa02Input(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="enfoqueInvestigacion" className="form-label">
                        Enfoque de investigación
                      </label>
                      <select
                        id="enfoqueInvestigacion"
                        className="form-select form-select-sm"
                        aria-label="Small select example"
                        value={enfoqueInvestigacion}
                        onChange={(e) => setEnfoqueInvestigacion(e.target.value)}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Cualitativo">Cualitativo</option>
                        <option value="Cuantitativo">Cuantitativo</option>
                        <option value="Mixto">Mixto</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tipoInvestigacion" className="form-label">
                        Tipo de investigación
                      </label>
                      <select
                        id="tipoInvestigacion"
                        className="form-select form-select-sm"
                        aria-label="Small select example"
                        value={tipoInvestigacion}
                        onChange={(e) => setTipoInvestigacion(e.target.value)}
                      >
                        <option value="" >Seleccionar</option>
                        <option value="Básica o Pura">Básica o Pura</option>
                        <option value="Aplicada o Tecnológica">Aplicada o Tecnológica</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="disenoInvestigacion" className="form-label">
                        Diseño de investigación
                      </label>
                      <select
                        id="disenoInvestigacion"
                        className="form-select form-select-sm"
                        aria-label="Small select example"
                        value={disenoInvestigacion}
                        onChange={(e) => {
                          setDisenoInvestigacion(e.target.value);
                          // Actualizar la visibilidad en función de la selección
                          setShowTiposDisenoExperimental(e.target.value === "Experimental");
                          setShowTiposDisenoNoExperimental(e.target.value === "No experimental");
                        }}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Experimental">Experimental</option>
                        <option value="No experimental">No experimental</option>
                      </select>
                    </div>
                    {/* Mostrar Tipos de diseño experimental solo si showTiposDisenoExperimental es verdadero */}
                    {showTiposDisenoExperimental && (
                      <div className="mb-3">
                        <label htmlFor="tiposDisenoExperimental" className="form-label">
                          Tipos de diseño experimental
                        </label>
                        <select
                          id="tiposDisenoExperimental"
                          className="form-select form-select-sm"
                          aria-label="Small select example"
                          value={tiposDisenoExperimental}
                          onChange={(e) => setTiposDisenoExperimental(e.target.value)}
                        >
                          <option value="">Seleccionar</option>
                          <option value="Preexperimental">Preexperimental</option>
                          <option value="Cuasiexperimental">Cuasiexperimental</option>
                          <option value="Experimento puro">Experimento puro</option>
                        </select>
                      </div>
                    )}
                    {/* Mostrar Tipos de diseño no experimental solo si showTiposDisenoNoExperimental es verdadero */}
                    {showTiposDisenoNoExperimental && (
                      <div className="mb-3">
                        <label htmlFor="tiposDisenoNoExperimental" className="form-label">
                          Tipos de diseño no experimental
                        </label>
                        <select
                          id="tiposDisenoNoExperimental"
                          className="form-select form-select-sm"
                          aria-label="Small select example"
                          value={tiposDisenoNoExperimental}
                          onChange={(e) => setTiposDisenoNoExperimental(e.target.value)}
                        >
                          <option value="">Seleccionar</option>
                          <option value="Tranversal">Tranversal</option>
                          <option value="Longitudinal">Longitudinal</option>
                        </select>
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="nivelInvestigacion" className="form-label">
                        Nivel de investigación
                      </label>
                      <select
                        id="nivelInvestigacion"
                        className="form-select form-select-sm"
                        aria-label="Small select example"
                        value={nivelInvestigacion}
                        onChange={(e) => setNivelInvestigacion(e.target.value)}
                      >
                        <option value="" >Seleccionar</option>
                        <option value="Explicativo">Explicativo</option>
                        <option value="Correlacional">Correlacional</option>
                        <option value="Descriptivo">Descriptivo</option>
                        <option value="Exploratorio">Exploratorio</option>
                      </select>
                    </div>

                  </div>

                  <div class="d-grid gap-2">
                    <input type="submit" className={`mb-2 mt-0 ${styles.bg_gt}`} value="Generar preguntas y respuestas con IA" />
                  </div>
                </form>
              </div>
            </div>
          </div>


          <div class="col-sm-8">
            {result && ( // Conditional rendering based on the result
              <main className={styles.main}>
                <div className="card mt-2">
                  <div className="card-body">
                    <h5 className="card-title text-danger" >TEXTO INGRESADO</h5>

                    <ul>
                      {textHistory.map((formData, index) => (
                        <li key={index}>
                          <p>Variable 01: {formData.va01Input}</p>
                          <p>Variable 02: {formData.va02Input}</p>
                          <p>Enfoque de investigación: {formData.enfoqueInvestigacion}</p>
                          {/* Renderizar otros campos aquí */}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card mt-2">
                  <div className="card-body">
                    <h5 className="card-title text-success">PREGUNTAS RESPONDIDAS</h5>
                    <ul>
                      {splitTextIntoList(result)} {/* Dividir `result` y mostrarlo en una lista */}
                    </ul>
                  </div>
                </div>
              </main>
            )}
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
}
