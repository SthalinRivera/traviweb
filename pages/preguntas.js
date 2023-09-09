import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./components/Nav"; // Import the Nav component
import FormMetodologia from "./components/FormMetodologia"; // Import the Nav component
import Footer from "./components/Footer"; // Import the Nav component
import PreguntasData from "./components/PreguntasData";
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      // Si se hace clic en el elemento abierto, ciérralo
      setActiveIndex(null);
    } else {
      // Si se hace clic en un elemento cerrado, ábrelo
      setActiveIndex(index);
    }
  };
  const accordionData = [
    {
      question: '¿Qué es la escala nominal y ordinal en Likert?',
      answer:
        'En una escala nominal, las categorías no tienen un orden inherente y no se pueden comparar cuantitativamente. Por ejemplo, en una encuesta sobre el género de los encuestados, las opciones podrían ser "masculino" y "femenino". La escala ordinal es uno de los niveles de medición que nos otorga la clasificación y el orden de los datos sin que realmente se establezca el grado de variación entre ellos.',
    },
    // Agrega más preguntas y respuestas según sea necesario
  ];

  return (
    <div className={styles.gradient_background}>
      <Head>
        <title>Preguntas</title>
        <link rel="icon" href="/traviweb_logo.png" />
      </Head>
      <Nav />
      <div className="container">
        <h3 className={`text-center ${styles.text_gt}`}>Preguntas</h3>
        <p className="ms-5 me-5 text-dark text-center" >Estas son preguntas frecuentes que suelen surgir durante las sustentaciones de tesis académicas</p>
        <div class="row">
          <div class="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h5 className={`text-center ${styles.text_gt}`}>Preguntas</h5>
              </div>
              <div class="card-body text-center ">
              <a className={styles.subrayado_none} href="q&a"><button className={styles.btn_bg_gt}  type="button"> ¿Quieres ensayar ahora?</button></a>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <main className={styles.main}>
              <div className="card mt-2">
                <div className="card-body">
                  <h2 className="card-title text-dark" >Preguntas</h2>
                  <PreguntasData />
                </div>
              </div>

              <div className="accordion" id="accordionExample">
                {accordionData.map((item, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button bg-light ${activeIndex === index ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => toggleAccordion(index)}
                      >
                        {item.question}
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                      id={`collapse${index}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">{item.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </main>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
