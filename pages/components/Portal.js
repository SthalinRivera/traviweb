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
            <h1 class="mb-3 fw-semibold lh-1 text-white mt-5">Genera contenido único y sorprendente en un abrir y cerrar de ojos con nuestra app web.</h1>
            <p class="lead mb-4 text-white mb-5">
              Ahorra tiempo y esfuerzo en tus proyectos académicos de forma facil y efectivos que garantizamos que son muy unicos y creativos utilizando nuestra app de generadores con inteligencia artificial.
            </p>
            <a href="#apps"><button type="button" class="btn btn-warning btn-lg mb-5">  <FaIcons.FaHubspot color="black" />  Comience  gratis</button></a>
          </div>
        </div>
      </div>




      <h1 class="mb-3 fw-semibold lh-1 text-white mt-5 text-center">Preguntas frecuentes</h1>

      <div className="accordion" id="accordionExample">

        {accordionData.map((item, index) => (
          <div className="accordion-item border-0" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button  text-light  ${styles.gradient_background_dark_menu} ${activeIndex === index ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleAccordion(index)}>
                {item.question}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
              id={`collapse${index}`}
              data-bs-parent="#accordionExample">
              <div className="accordion-body bg-dark text-light">{item.answer}</div>
            </div>
          </div>
        ))}

      </div>
    </div>

  );
};

export default Portal;