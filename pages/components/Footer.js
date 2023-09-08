import React from "react";
import { FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';
import styles from "../index.module.css"
function Footer() {
  return (
    <div className="">
      <div className="container">
        <footer className="py-5 " >
          <div className="row">
            <div className="col-md-12 text-center mb-3">
              <h2 className={styles.text_gt}>TraviWeb</h2>
              <p>Transforma tus tareas académicas y profesionales con nuestra innovación.</p>
            </div>
          </div>
          <hr className="custom-hr" style={{ backgroundColor: 'purple', height: '2px', width: '100%' }} />
          <div className="d-flex flex-column flex-sm-row justify-content-between">
            <p className={`${styles.text_gt}`} >&copy; {new Date().getFullYear()} by Sthalin Rivera</p>
            <ul className="list-unstyled d-flex " >
              <li className="ms-3 mt-1"><a title="Github" target="_black" className="link-dark" href="https://github.com/SthalinRivera/"> <FaGithub size={20} color="purple" />  </a></li>
              <li className="ms-3 mt-1"><a title="Facebook" target="_black" className="link-dark" href="https://web.facebook.com/adlersthalin.riveracenteno"><FaFacebook size={20} color="purple" /></a></li>
            </ul>
          </div>
        </footer>
      </div>
    </div>

  );
}

export default Footer;
