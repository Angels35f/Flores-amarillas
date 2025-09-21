// src/components/BotonVisibilidad.jsx

import React from 'react';

// Este componente recibe dos props:
// 1. isVisible: Un booleano (true/false) que nos dice si el texto se está mostrando.
// 2. toggleVisibility: La función que cambia el estado de visibilidad.
const BotonVisibilidad = ({ isVisible, toggleVisibility }) => {
  return (
    <button
      onClick={toggleVisibility}
      className="fixed top-5 right-5 z-50 p-3 bg-white/40 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/60 transition-colors"
      aria-label="Toggle text visibility"
    >
      {/* Mostramos un ícono diferente dependiendo de si el texto está visible o no */}
      {isVisible ? (
        // Ícono de "ojo tachado" (para ocultar)
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m0 0l-2.206-2.207" />
        </svg>
      ) : (
        // Ícono de "ojo" (para mostrar)
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.543 7-4.477 0-8.268-2.943-9.543-7z" />
        </svg>
      )}
    </button>
  );
};

export default BotonVisibilidad;