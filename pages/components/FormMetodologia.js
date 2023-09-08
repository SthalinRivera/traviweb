import Link from "next/link";
import { useState } from "react";
import styles from "../index.module.css"
const FormMetodologia = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
   
      <div className="container-fluid">
esto es una prueba
      </div>
   
  );
};

export default FormMetodologia;