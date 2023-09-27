import Link from "next/link";
import { useState } from "react";
import styles from "../index.module.css"

import * as FaIcons from 'react-icons/fa';
const Portal = () => {


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
      question: '¿Puedo confiar en que la parafraseo será precisa y coherente?',
      answer:
        'Nos esforzamos por proporcionar parafraseos precisos y coherentes, pero siempre es importante revisar el texto resultante para asegurarse de que se ajuste a sus necesidades y estilos específicos. La revisión manual puede ser necesaria en algunos casos.',


    },
    {
      question: '¿Qué es un generador de textos con inteligencia artificial?',
      answer: 'Un generador de textos con inteligencia artificial es una herramienta avanzada que utiliza algoritmos de aprendizaje automático para crear contenido de texto de manera automática. Puede generar textos para una amplia variedad de propósitos, como artículos, descripciones de productos, contenido para redes sociales y mucho más.',
    },
    {
      question: '¿Puedo confiar en la precisión de los resúmenes generados por su herramienta en línea?',
      answer: 'Nuestra herramienta se esfuerza por proporcionar resúmenes precisos, pero siempre recomendamos revisar el resumen resultante para asegurarse de que refleje completamente sus necesidades y el contenido original.',
    },
    // Agrega más preguntas y respuestas según sea necesario
  ];
  return (
    <div class="container py-4">

      <div class="bd-masthead mb-3" id="content">
        <div class="container-xxl bd-gutter">
          <div class="col-md-8 mx-auto text-center">
            <img src="/icon.gif" width="300" height="300" alt="Bootstrap" />
            <h1 class="mb-3 fw-semibold lh-1 text-white mt-5">El poder de la IA en tus manos: Resumir, parafrasear y más, fácilmente</h1>
            <p class="lead mb-4 text-white mb-5">
              La aplicación revolucionaria combina tecnología de vanguardia, aprendizaje automático y procesamiento de lenguaje natural para ofrecer soluciones creativas, precisas y eficientes en la generación de texto y comunicación
            </p>
            <a href="#apps"><button type="button" class="btn btn-warning btn-lg mb-5">  <FaIcons.FaHubspot color="black" />  Comience  gratis</button></a>
          </div>
        </div>
      </div>
      <div id="apps">
        <div class="p-5 h-50 mb-4 bg-body-tertiary rounded-3">
          <div class="container-fluid py-2">
            <h2 className="" >Generador de matriz de consistencia</h2>
            <p class="col-md-8 fs-4">"Pruebe ahora Generador de Matriz de Consistencia, una aplicación impulsada por inteligencia artificial que crea matrices de consistencia a partir de las variables ingresadas. Simplifique su trabajo de investigación y asegure la coherencia de su estudio en un instante."</p>
            <a className={styles.subrayado_none} href="matriz_consistencia"><button className={styles.btn_bg_gt} type="button">PROBAR AHORA</button></a>
          </div>
        </div>

        <div class="row align-items-md-stretch" >
          <div class="col-md-6">
            <div class="h-80 p-3 text-bg-dark rounded-3"  >
              <h2>Parafrasador con IA </h2>
              <p>Nuestra aplicación de Parafrasador con IA es la herramienta esencial que necesitas para darle un giro fresco y único a tus textos. Ya sea que estés escribiendo un artículo, un informe, un ensayo, contenido web o cualquier otro tipo de documento, nuestra aplicación te ofrece una manera rápida y eficiente de reformular tus palabras y expresiones sin perder el significado original.</p>
              <a href="parafrasear"><button class="btn btn-outline-light" type="button">PROBAR AHORA</button></a>
            </div>
          </div>
          <div class="col-md-6">
            <div class="h-80 p-3 bg-body-tertiary border rounded-3">
              <h2>Tesis Q&A</h2>
              <p>
                Q&A es una aplicación  que emplea inteligencia artificial para generar respuestas de tesis a partir de datos ingresados. Con una interfaz amigable y resultados personalizables, simplifica la investigación académica y brinda respuestas precisas y relevantes a tus preguntas de tesis..</p>
              <a href="q&a"> <button class="btn btn-outline-secondary" type="button">Explorar</button></a>
            </div>
          </div>
        </div>
      </div>
      <h1 class="mb-3 fw-semibold lh-1 text-white mt-5 text-center">Preguntas frecuentes</h1>

      <div className="accordion" id="accordionExample">
  {accordionData.map((item, index) => (
    <div className="accordion-item" key={index}>
      <h2 className="accordion-header">
        <button
          className={`accordion-button bg-dark text-light ${activeIndex === index ? '' : 'collapsed'}`}
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




    </div>

  );
};

export default Portal;