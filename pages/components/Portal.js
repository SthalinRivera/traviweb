import Link from "next/link";
import styles from "../index.module.css"
const Portal = () => {
  return (
    <div class="container py-4">
      <div class="p-5 h-50 mb-4 bg-body-tertiary rounded-3">
        <div class="container-fluid py-2">
          <h2 className={styles.text_gt} >Generador de matriz de consistencia</h2>
          <p class="col-md-8 fs-4">Simplifica tu proceso de investigación y toma decisiones informadas con nuestras matrices de consistencia. ¡Pruebe la aplicación hoy mismo y experimenta la diferencia en la gestión de tus datos de investigación!.</p>
          <a className={styles.subrayado_none} href="matriz_consistencia"><button className={styles.btn_bg_gt}  type="button">PROBAR AHORA</button></a>
        </div>
      </div>

      <div class="row align-items-md-stretch" >
        <div class="col-md-6">
          <div class="h-80 p-3 text-bg-dark rounded-3"  >
            <h2>Parafrasador con IA </h2>
            <p>Nuestra aplicación de Parafrasador con IA es la herramienta esencial que necesitas para darle un giro fresco y único a tus textos. Ya sea que estés escribiendo un artículo, un informe, un ensayo, contenido web o cualquier otro tipo de documento, nuestra aplicación te ofrece una manera rápida y eficiente de reformular tus palabras y expresiones sin perder el significado original.</p>
            <a  href="parafrasear"><button class="btn btn-outline-light" type="button">PROBAR AHORA</button></a>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-80 p-3 bg-body-tertiary border rounded-3">
            <h2>Tesis Q&A</h2>
            <p>"Tesis Q&A" es la herramienta esencial para estudiantes, investigadores y entusiastas de la investigación académica. Ya sea que estés trabajando en tu propia tesis, buscando inspiración o deseando mantenerte al día con las últimas investigaciones, nuestra aplicación te ofrece un acceso sin complicaciones a una amplia gama de conocimientos académicos.</p>
            <a  href="q&a"> <button class="btn btn-outline-secondary" type="button">Explorar</button></a>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Portal;