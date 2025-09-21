// src/components/BackButton.jsx
import { Link } from "react-router-dom";
import "../styles/boton.css";

const BotonVolver = () => (
  <Link 
    to="/" 
    className="volver"
  >
     Volver
  </Link>
);

export default BotonVolver;
