// src/components/BackButton.jsx
import { Link } from "react-router-dom";

const BotonVolver = () => (
  <Link 
    to="/" 
    className="absolute top-4 left-4 px-4 py-2 bg-white/80 text-black rounded-lg shadow hover:bg-white transition"
  >
    ⬅ Volver
  </Link>
);

export default BotonVolver;
