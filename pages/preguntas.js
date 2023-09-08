import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from "./components/Nav"; // Import the Nav component
export default function Home() {

  const [va01Input, setVa01Input] = useState(""); // Renamed the state variable
  const [va02Input, setVa02Input] = useState(""); // Renamed the state variable
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


    // Clear the form inputs
    setVa01Input("");
    setVa02Input("");

    // You can also make API requests here with the formData if needed
  }


  return (
    <div>
      <Head>
        <title>Parafrasador</title>
        <link rel="icon" href="/dosg.png" />
      </Head>
      <Nav />

      <div className="container">
        <div class="row">
          <div class="col-sm-4">
            <h3>preguntas</h3>
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
                <input type="submit" className="btn btn-success " value="generar preguntas y respuestas" />
              </div>
            </form>
          </div>


          <div class="col-sm-8">

            <main className={styles.main}>
              <div className="card mt-2">
                <div className="card-body">
                  <h5 className="card-title text-danger" >TEXTO INGRESADO</h5>
                  aki estareoms y go
                </div>
              </div>
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      ¿Qué es la escala nominal y ordinal en Likert?
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      En una escala nominal, las categorías no tienen un orden inherente y no se pueden comparar cuantitativamente. Por ejemplo, en una encuesta sobre el género de los encuestados, las opciones podrían ser "masculino" y "femenino".
                      La escala ordinal es uno de los niveles de medición que nos otorga la clasificación y el orden de los datos sin que realmente se establezca el grado de variación entre ellos.
                      <p>Variable 01: {va01Input}</p>
                      <p>Variable 02: {va02Input}</p>
                    </div>
                  </div>
                </div>

              </div>
            </main>

          </div>
        </div>
      </div>
    </div>
  );
}
