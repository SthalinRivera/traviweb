import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [textHistory, setTextHistory] = useState([]); // State variable to store entered text

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");

      // Add the entered text to the textHistory array
      setTextHistory([...textHistory, animalInput]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setAnimalInput(inputValue);
    setCharCount(inputValue.length);
  };

  return (
    <div>
      <Head>
        <title>Parafrasador</title>
        <link rel="icon" href="/dosg.png" />
      </Head>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">preguntas</a>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div class="row">
          <div class="col-sm-4">
            <h3>Parafraseador IA</h3>
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
              <p>Número de caracteres: {charCount}</p>
              <div class="d-grid gap-2">
                <input type="submit" className="btn btn-success " value="PARAFRASEAR" />
              </div>
            </form>
          </div>
          <div class="col-sm-8">
            {result && ( // Conditional rendering based on the result
              <main className={styles.main}>
                <div className="card mt-2">
                  <div className="card-body">
                    <h5 className="card-title text-danger" >TEXTO INGRESADO</h5>
                    {textHistory}
                  </div>
                </div>
                <div className="card mt-2">
                  <div className="card-body">
                    <h5 className="card-title text-success">TEXTO PARAFRASEADO</h5>
                    <p className="card-text">{result}</p>
                  </div>
                </div>
              </main>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
