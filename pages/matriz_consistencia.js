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
    }finally {
      setIsLoading(false); // Ocultar el spinner después de cargar
    }
  }
  // Divide el texto en filas y luego en columnas
  const filas = result.split("\n");
  const datos = filas.map((fila) => fila.split("|").map((dato) => dato.trim()));

  // Elimina las filas que contienen guiones "------------"
  const datosSinGuiones = datos.filter((fila) => !fila.includes("------------"));

  return (
    <div className={styles.gradient_background}>
      <Head>
        <title>Generador matriz de consistencia</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav />

      <div className="container">
      <div className="d-flex justify-content-center align-items-center">
          <div className="position-relative text-center">
            <div className={`card mt-3 mb-3 ${styles.bg_aviso}`} >
              <div className="card-body " >
                <h5 className="ms-5 me-5 text-light" >VERSIÓN BETA </h5>
              </div>
            </div>
          </div>
        </div>
        <h3 className={`text-center ${styles.text_gt}`}>Generador matriz de consistencia</h3>
        <p className="ms-5 me-5 text-dark text-center" > "Nuestra aplicación, en versión beta, es un generador de matrices de consistencia, diseñado para facilitar la elaboración de tesis académicas. ¿Te gustaría ser uno de los primeros en probarla?"</p>


        <div class="row">
          <div class="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h5 className={`text-center ${styles.text_gt}`}>Generar matriz de consistencia</h5>
              </div>
              <div class="card-body">
                <form onSubmit={onSubmit}>
                  <div class="mb-1">
                    <label for="disabledSelect" class="form-label">Variable Independiente ó variable 1</label>
                    <input type="text"
                      name="variable1"
                      placeholder=" (Eg: Aplicación movil, etc...) "
                      value={va01Input}
                      onChange={(e) => setVa01Input(e.target.value)} class="form-control" />
                  </div>
                  <div class="mb-1">
                    <label for="disabledSelect" class="form-label">Variable dependiente ó variable 2</label>
                    <input
                      type="text"
                      name="variable2"
                      placeholder=" (Eg: Mejorar proceso de ventas, etc...) "
                      value={va02Input}
                      onChange={(e) => setVa02Input(e.target.value)} class="form-control" />
                  </div>
                  <div class="d-grid gap-2">
                    <input type="submit" className={`mb-2 mt-0 ${styles.bg_gt}`} value="Generar" />
                    <Toaster />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {isLoading ? ( // Mostrar el spinner si isLoading es true
            <div class="text-center mt-4">
                <h5 className={`text-center ${styles.text_gt}`}>Generando...</h5>
              <div class="spinner-border " role="status">
                <span class="visually-hidden">Generando...</span>
              </div>
            </div>
          ) : result ? ( // Mostrar el resultado si result tiene datos
              <div className="card mt-2">
                <div className="card-body">
                  <h4 className={`text-center ${styles.text_gt}`}>Matriz de consistencia generado</h4>
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
      </div>
      <Footer />
    </div>
  );
}
