import React from 'react';

// --- Componente Principal de la Rosa Amarilla ---
const Loto = ({ isOpen, onClick, onCenterClick}) => {
  // --- 1. Definición de las Formas de los Pétalos ---
  // Forma del pétalo cuando la rosa está cerrada (capullo)
  const closedPetalPath = `
    M 0 0
    C 12 -18, 18 -45, 0 -60
    C -18 -45, -12 -18, 0 0
    Z
  `;
  // Forma del pétalo cuando la rosa está abierta (desplegado)
  const openPetalPath = `
    M 0 0
    C 25 -20, 40 -60, 0 -100
    C -40 -60, -25 -20, 0 0
    Q 0 -10, 10 -25
    Q 0 -5, -10 -25
    Q 0 -10, 0 0
    Z
  `;
  // Elige la forma a mostrar según el estado 'isOpen'
  const petalPath = isOpen ? openPetalPath : closedPetalPath;

  // --- 2. Configuración de las Capas ---
  // Una rosa tiene varias capas que se abren a destiempo.
  const layers = [
    // Capa exterior: más grande, se aleja menos
    { numPetals: 6, distance: 15, size: 1.0, delay: '0s', offset: 0 },
    // Capa media: tamaño intermedio, se aleja menos
    { numPetals: 5, distance: 8, size: 0.8, delay: '0.2s', offset: 36 },
    // Capa interior: la más pequeña, casi no se aleja
    { numPetals: 4, distance: 1, size: 0.6, delay: '0.4s', offset: 15 },
  ];

  return (
    <svg
      width="250"
      height="250"
      viewBox="-125 -125 250 250"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={onClick}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Degradado para dar un color más vivo a la rosa */}
        <linearGradient id="yellowRoseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFEB3B' }} /> 
          <stop offset="100%" style={{ stopColor: '#FFD700' }} /> 
        </linearGradient>
        {/* Sombra para darle profundidad */}
        <filter id="roseShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Nenúfar (hoja de loto) - DEBE IR ANTES */}
      <g
        style={{
          transform: `scale(${isOpen ? 1 : 0.7})`,
          transformOrigin: "0 0",
          transition: "transform 0.8s cubic-bezier(0.6, 0, 0.2, 1)",
        }}
      >
        {/* Base del nenúfar */}
        <ellipse
          cx="0"
          cy="10"
          rx="100"
          ry="90"
          fill="#A5D6A7"
          stroke="#388E3C"
          strokeWidth="6"
          className={isOpen ? "cursor-pointer" : ""}
          onClick={isOpen ? onClick : undefined}
        />
        {/* Hendidura característica */}
        <path
          d="M 0 30 L -30 95"
          stroke="#388E3C"
          strokeWidth="8"
          fill="none"
        /> <path
          d="M 0 30 L 30 95"
          stroke="#388E3C"
          strokeWidth="8"
          fill="none"
        />
      </g>

      {/* Flor */}
      <g filter="url(#roseShadow)">
        {/* --- 3. Renderizado de las Capas --- */}
        {layers.map((layer, layerIndex) =>
          Array.from({ length: layer.numPetals }).map((_, petalIndex) => {
            const rotation = petalIndex * (360 / layer.numPetals) + layer.offset;
            const translate = isOpen ? layer.distance : 0;

            return (
              <g
                key={`${layerIndex}-${petalIndex}`}
                style={{
                  transform: `rotate(${rotation}deg) translateY(-${translate}px) scale(${layer.size})`,
                  transformOrigin: "0 0", // El pivote está en la base (0,0)
                  transition: `transform 0.8s cubic-bezier(0.6, 0, 0.2, 1) ${layer.delay}`,
                }}
              >
                <path
                  d={petalPath}
                  fill="url(#yellowRoseGradient)"
                  stroke="#DAA520"
                  strokeWidth="1.5"
                  style={{
                    // La magia de la metamorfosis sucede aquí
                    transition: `d 0.8s cubic-bezier(0.6, 0, 0.2, 1) ${layer.delay}`,
                  }}
                />
              </g>
            );
          })
        )}
      </g>
    </svg>
  );
};

export default Loto;