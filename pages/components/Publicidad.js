import Link from "next/link";
import { useState } from "react";
import Publi_css from "./Publicidad.module.css"; // Importa tu archivo de estilos CSS
const Publicidad = () => {

  return (
    <nav className={`navbar ${Publi_css.bg_publi}`}>
      <div class="container-fluid">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Activity/Confetti%20Ball.webp"
          width="40"
          height="50"
        />
        <p className="text-light">Pruebe el generador de Matriz de consistencia v2 </p>
        <a href="matriz_consistencia" className={`btn  ${Publi_css.original_button}`} type="submit" >Probar ahora</a>
      </div>
    </nav>
  );
};

export default Publicidad;