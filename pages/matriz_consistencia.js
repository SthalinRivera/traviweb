import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import * as FaIcons from 'react-icons/fa';
import Nav from "./components/Nav"; // Import the Nav component
import Footer from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [va01Input, setVa01Input] = useState(""); // Renamed the state variable
  const [va02Input, setVa02Input] = useState(""); // Renamed the state variable
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const surpriseValues = [
    { va01: 'Aplicación móvil', va02: 'Mejorar proceso de ventas' },
    { va01: 'Nivel de educación de los padres', va02: 'Rendimiento académico de los estudiantes' },
    { va01: 'Acceso a recursos tecnológicos', va02: 'Competencia digital de los estudiantes' },
    { va01: 'Estilo de liderazgo de los gerentes', va02: 'Nivel de satisfacción y compromiso de los empleados' },
    { va01: 'Tipo de fertilizante utilizado', va02: 'Rendimiento de cultivos agrícolas' },
    { va01: 'Cumplimiento de regulaciones fiscales y tributarias', va02: 'Implicaciones fiscales y carga tributaria de la empresa' },
    { va01: ' Promoción de eventos culturales locales', va02: 'Percepción de autenticidad cultural por parte de los turistas' },
    { va01: 'Nivel de accesibilidad y usabilidad del sitio', va02: 'Rendimiento académico de los estudiantes' },

    // Agrega más valores sorpresa según sea necesario
  ];

  const handleSurpriseClick = () => {
    // Seleccionamos un valor sorpresa al azar de la lista
    const randomIndex = Math.floor(Math.random() * surpriseValues.length);
    const randomValue = surpriseValues[randomIndex];

    // Establecemos los valores sorpresa en los campos de entrada
    setVa01Input(randomValue.va01);
    setVa02Input(randomValue.va02);
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true); // Mostrar el spinner mientras se carga
    try {
      const response = await fetch("/api/generate.matriz_consistencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ va01: va01Input, va02: va02Input }),
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
      toast.error(error.message)
    } finally {
      setIsLoading(false); // Ocultar el spinner después de cargar
    }
  }
  // Divide el texto en filas y luego en columnas
  const filas = result.split("\n");
  const datos = filas.map((fila) => fila.split("|").map((dato) => dato.trim()));

  // Elimina las filas que contienen guiones "------------"
  const datosSinGuiones = datos.filter((fila) => !fila.includes("------------"));

  return (
    <div className={styles.gradient_background_dark}>
      <Head>
        <title> IA Generator matriz de consistencia</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav />

      <div className="container">
        <h3 className={`text-center ${styles.gradient_background_text}`} >IA Generator matriz <br /> de consistencia</h3>
        <p className={`ms-5 me-5 text-center ${styles.text_description_matriz}`}  > Convierte palabras en  matrices de consistencia, diseñado para facilitar la elaboración de tesis académicas. ¿Te gustaría ser uno de los primeros en probarla?</p>
        <div class="row ">
          <div class="col-sm-12 ">
            <div class="card  border-0 mb-3">
              <div class="card-body rounded">
                <form onSubmit={onSubmit}>
                  <div class="row">
                    <div class="col-sm-5">
                      <input
                        type="text"
                        name="variable1"
                        placeholder=" (Ej: Aplicación móvil, etc...)"
                        value={va01Input}
                        onChange={(e) => setVa01Input(e.target.value)}
                        className="form-control mt-1 border-0"
                      />
                    </div>
                    <div class="col-sm-5">
                      <input
                        type="text"
                        name="variable2"
                        placeholder=" (Ej: Mejorar proceso de ventas, etc...)"
                        value={va02Input}
                        onChange={(e) => setVa02Input(e.target.value)}
                        className={`form-control mt-1 mb-1  border-0`}
                      />
                    </div>
                    <div class="col-sm-2 ">
                      <div className="d-grid gap-2">
                        <button type="submit"
                          className={`mb-0 mt-0 ${styles.bg_gt}`}
                          value="Generar"><FaIcons.FaMagic color="white" size="15px" />  Generar</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-link text-warning"
              onClick={handleSurpriseClick}>
              <FaIcons.FaStarHalfAlt color="#F7FE2E" size="20px" /> Sorpréndeme
            </button>
          </div>
          {isLoading ? ( // Mostrar el spinner si isLoading es true
            <div class="text-center mt-4">
              <h5 className={`text-center text-white`}>Generando...</h5>
              <div class="spinner-border " role="status">
                <span class="visually-hidden text-white">Generando...</span>
              </div>
            </div>
          ) : result ? ( // Mostrar el resultado si result tiene datos
            <div className="card mt-2">
              <div className="card-body">
                <h4 className="text-center ">Matriz de consistencia generado</h4>
                <div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          {datosSinGuiones[0].map((encabezado, index) => (
                            <th scope="col" key={index}>{encabezado}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {datosSinGuiones.slice(1).map((fila, filaIndex) => (
                          <tr key={filaIndex}>
                            {fila.map((valor, valorIndex) => (
                              <td key={valorIndex}>{valor}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

        </div>

        <div class="row mt-5">
          <div class="col-sm-6">
            <div className="rounded-4 text-center">
              <img src="/matriz.png" class=" rounded-4 img-fluid mt-4 mb-4" alt="..." />
            </div>
          </div>
          <div class="col-sm-6">
            <h1 className="text-white mt-3" >Una nueva forma de crear matrices de  consistencia </h1>
            <p className={`${styles.text_description_matriz}`}>Nuestra aplicación de generación de matriz de consistencia con IA es una solución avanzada que agiliza y mejora significativamente el proceso de crear una matriz de consistencia robusta para cualquier proyecto de investigación</p>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-sm-6">
            <h1 className="text-white mt-3" >Ventaja</h1>
            <p className={`${styles.text_description_matriz}`}>Ahorro de Tiempo: La IA puede automatizar gran parte del proceso de elaboración de la matriz de consistencia, lo que reduce significativamente el tiempo y esfuerzo requeridos por parte del investigador.</p>
            <h1 className="text-white mt-3" >Desventaja</h1>
            <p className={`${styles.text_description_matriz}`}>Dependencia de la Tecnología: La eficacia de la aplicación depende de la calidad y la precisión de los algoritmos de IA, lo que significa que puede haber errores o limitaciones en la generación de la matriz de consistencia.</p>

          </div>
          <div class="col-sm-6">
            <div className="rounded-4 text-center">
              <img src="/cohete.gif" class=" rounded-4 img-fluid mt-4 mb-4" width={450} alt="..." />
            </div>
          </div>
        </div>
      </div>

     
        <Footer />
    
    </div>
  );
}