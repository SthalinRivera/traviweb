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




      <section className="bg-100" id="apps">
        <div className="container">
          <div className="text-center mb-6">
            <h3 className="fs-2 fs-md-3 text-light">APPS</h3>
            <hr
              className="short"
              data-zanim-xs='{"from":{"opacity":0,"width":0},"to":{"opacity":1,"width":"4.20873rem"},"duration":0.8}'
              data-zanim-trigger="scroll"
            />
          </div>
          <div className="row g-0 position-relative mb-4 mb-lg-0">
            <div className="col-lg-6 py-3 py-lg-0 mb-0 position-relative" style={{ minHeight: '400px' }}>
              <div
                className="bg-holder rounded-ts-lg rounded-te-lg rounded-lg-te-0"
                style={{
                  backgroundImage: `url('./matriz.jpg')`, // Ruta relativa a la imagen
                  width: '100%', // Ancho del div
                  height: '100%', // Altura del div
                  backgroundSize: 'cover', // Ajusta el tamaño de la imagen de fondo
                }}
              >
                {/* Contenido del div */}
              </div>
            </div>
            <div className="col-lg-6 px-lg-5 py-lg-6 p-4 my-lg-0 bg-dark rounded-bs-lg rounded-lg-bs-0 rounded-be-lg rounded-lg-be-0 rounded-lg-te-lg ">
              <div className="elixir-caret d-none d-lg-block"></div>
              <div className="d-flex align-items-center h-100">
                <div data-zanim-timeline="{}" data-zanim-trigger="scroll">
                  <div className="overflow-hidden">
                    <h1 className="text-light">Generador de matriz de consistencia</h1>
                  </div>
                  <div className="overflow-hidden">
                    <p className="mt-3 text-light">"Pruebe ahora Generador de Matriz de Consistencia, una aplicación impulsada por inteligencia artificial que crea matrices de consistencia a partir de las variables ingresadas. Simplifique su trabajo de investigación y asegure la coherencia de su estudio en un instante."</p>
                  </div>
                  <div className="overflow-hidden">
                    <a href="parafrasear"><button class="btn btn-light" type="button">PROBAR AHORA</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 position-relative mb-4 mb-lg-0">
            <div className="col-lg-6 py-3 py-lg-0 mb-0 position-relative order-lg-2" style={{ minHeight: '400px' }}>
              <div className="bg-holder rounded-ts-lg rounded-te-lg rounded-lg-te-0  rounded-lg-ts-0"  style={{
                  backgroundImage: `url('./parafraseador.png')`, // Ruta relativa a la imagen
                  width: '100%', // Ancho del div
                  height: '100%', // Altura del div
                  backgroundSize: 'cover', // Ajusta el tamaño de la imagen de fondo
                }}></div>
            </div>
            <div className="col-lg-6 px-lg-5 py-lg-6 p-4 my-lg-0  rounded-bs-lg rounded-lg-bs-0 rounded-be-lg  rounded-lg-be-0 bg-dark">
              <div className="elixir-caret d-none d-lg-block"></div>
              <div className="d-flex align-items-center h-100">
                <div data-zanim-timeline="{}" data-zanim-trigger="scroll">
                  <div className="overflow-hidden">
                    <h1 className="text-light">Parafrasador con IA</h1>
                  </div>
                  <div className="overflow-hidden">
                    <p className="mt-3 text-light" >Nuestra aplicación de Parafrasador con IA es la herramienta esencial que necesitas para darle un giro fresco y único a tus textos. Ya sea que estés escribiendo un artículo, un informe, un ensayo, contenido web o cualquier otro tipo de documento, nuestra aplicación te ofrece una manera rápida y eficiente de reformular tus palabras y expresiones sin perder el significado original.</p>
                  </div>
                  <div className="overflow-hidden">
                    <a href="parafrasear"><button class="btn btn-outline-light" type="button">PROBAR AHORA</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 position-relative mb-4 mb-lg-0">
            <div className="col-lg-6 py-3 py-lg-0 mb-0 position-relative" style={{ minHeight: '400px' }}>
              <div className="bg-holder rounded-ts-lg rounded-te-lg rounded-lg-te-0 rounded-lg-ts-0 rounded-bs-0 rounded-lg-bs-lg "  style={{
                  backgroundImage: `url('./questios.png')`, // Ruta relativa a la imagen
                  width: '100%', // Ancho del div
                  height: '100%', // Altura del div
                  backgroundSize: 'cover', // Ajusta el tamaño de la imagen de fondo
                }}></div>
            </div>
            <div className="col-lg-6 px-lg-5 py-lg-6 p-4 my-lg-0 bg-dark rounded-bs-lg rounded-lg-bs-0 rounded-be-lg  ">
              <div className="elixir-caret d-none d-lg-block"></div>
              <div className="d-flex align-items-center h-100">
                <div data-zanim-timeline="{}" data-zanim-trigger="scroll">
                  <div className="overflow-hidden">
                    <h1 className="text-light">Tesis Q&A</h1>
                  </div>
                  <div className="overflow-hidden">
                    <p className="mt-3 text-light" >Q&A es una aplicación que emplea inteligencia artificial para generar respuestas de tesis a partir de datos ingresados. Con una interfaz amigable y resultados personalizables, simplifica la investigación académica y brinda respuestas precisas y relevantes a tus preguntas de tesis...</p>
                  </div>
                  <div className="overflow-hidden">
                    <a href="q&a"> <button class="btn btn-outline-light" type="button">Explorar</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

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