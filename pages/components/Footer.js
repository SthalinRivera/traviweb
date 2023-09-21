import React from "react";
import { FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';
import styles from "../index.module.css"
function Footer() {
  return (
    <div className="">
      <div className="container">
  
        <footer class="text-center text-lg-start  text-muted">
          <section class="">
            <div class="container text-center text-md-start mt-5">
              <div class="row mt-3">
                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 class="text-uppercase fw-bold ">
                    <i class="fas fa-gem me-3"></i>TraviWeb
                  </h6>
                  <p>
                    Transforma tus tareas académicas y profesionales con nuestra innovación
                  </p>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 class="text-uppercase fw-bold ">
                   links
                  </h6>
                  <ul class=" me-auto ">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/">Inicio</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="parafrasear">Parafrasear</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="q&a">Q&A</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="matriz_consistencia">Matriz consistencia</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="preguntas">Preguntas</a>
                    </li>

                  </ul>
                </div>
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 ">

                  <h6 class="text-uppercase fw-bold ">Contact</h6>
                  <p><i class="fas fa-home me-3"></i> Cañete - Lima</p>
                  <p>
                    <i class="fas fa-envelope me-3"></i>
                    TraviWeb.@gmail.com
                  </p>
                  <p><i class="fas fa-phone me-3"></i>+51 910985938</p>
                </div>
              </div>
            </div>
          </section>
          <hr className="custom-hr" style={{ backgroundColor: 'purple', height: '2px', width: '100%' }} />
          <div class="text-center" >

            <section class="d-flex justify-content-center justify-content-lg-between">
              <p className={`${styles.text_gt}`} >&copy; {new Date().getFullYear()} by TraviWeb</p>
              <div>
                <ul className="list-unstyled d-flex " >
                  <li className="ms-3 mt-1"><a title="Github" target="_black" className="link-dark" href="https://github.com/SthalinRivera/"> <FaGithub size={20} color="purple" />  </a></li>
                  <li className="ms-3 mt-1"><a title="Facebook" target="_black" className="link-dark" href="https://web.facebook.com/adlersthalin.riveracenteno"><FaFacebook size={20} color="purple" /></a></li>
                </ul>
              </div>
            </section>
          </div>

        </footer>

      </div>
    </div>

  );
}

export default Footer;
