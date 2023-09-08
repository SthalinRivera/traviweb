import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "./components/Nav"; // Import the Nav component
export default function Home() {
  const [va01Input, setVa01Input] = useState(""); // Renamed the state variable
  const [va02Input, setVa02Input] = useState(""); // Renamed the state variable
  const [result, setResult] = useState("");


  async function onSubmit(event) {
    event.preventDefault();
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
      alert(error.message);
    }
  }
  // Divide el texto en filas y luego en columnas
  const filas = result.split("\n");
  const datos = filas.map((fila) => fila.split("|").map((dato) => dato.trim()));

  // Elimina las filas que contienen guiones "------------"
  const datosSinGuiones = datos.filter((fila) => !fila.includes("------------"));

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
              <div class="mb-1">
                <input type="text"
                  name="variable1"
                  placeholder="Escribir variable 1 (Eg: Aplicación movil, etc...) "
                  value={va01Input}
                  onChange={(e) => setVa01Input(e.target.value)} class="form-control" />
              </div>
              <div class="mb-1">
                <input
                  type="text"
                  name="variable2"
                  placeholder="Escribir variable 2 (Eg: Mejorar proceso de ventas, etc...) "
                  value={va02Input}
                  onChange={(e) => setVa02Input(e.target.value)} class="form-control" />
              </div> 
              <div class="d-grid gap-2">
                <input type="submit" className="btn btn-success" value="PARAFRASEAR" />
              </div>
            </form>
          </div>
        
            {result && ( // Conditional rendering based on the result
              <main className={styles.main}>
                <div className="card mt-2">
                  <div className="card-body">
                    <h5 className="card-title text-success">MATRIZ DE CONSITENCIA</h5>
                    <div>
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
              </main>
            )}
         
        </div>
      </div>
    </div>
  );
}
