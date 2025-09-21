import React from 'react';

// --- Componente Principal del Narciso ---
const Narciso = ({ isOpen, onClick, onCenterClick }) => {
  // --- 1. Definición de las Formas ---

  // Pétalos exteriores: más estrechos y puntiagudos
  const closedPetalPath = `
    M 5 0
    C 15 -18, 10 -38, 0 -45
    C -10 -38, -15 -18, -5 0
    Z
  `;
  const openPetalPath = `
    M 10 0
    C 35 -30, 30 -80, 0 -85
    C -30 -80, -35 -30, -10 0
    Z
  `;

  // Trompeta central: más centrada y sobresaliente
  const closedCoronaPath = `
    M 0 -7
    Q 10 -12, 5 0
    Q 10 12, 0 7
    Q -10 12, -5 0
    Q -10 -12, 0 -7
    Z
  `;
  const openCoronaPath = `
     M 0 -15
    Q 25 -27, 13 0
    Q 25 27, 0 15
    Q -25 27, -13 0
    Q -25 -27, 0 -15
    Z
  `;

  const numPetals = 6;

  return (
    <svg
      width="150"
      height="200"
      viewBox="-75 -100 150 200"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={onClick}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
        </filter>
        <radialGradient id="corona-gradient" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#FFA000" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#f8ec80ff" />
        </radialGradient>
      </defs>
      {/* Tallo */}
      {!isOpen && (
        <g
          style={{
            opacity: isOpen ? 0 : 1,
            transform: `translateY(${isOpen ? '20px' : '0px'})`,
            transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Reemplazamos <rect> por <path> para crear la curva */}
          <path
            d="M 0 40 Q -15 80 0 120"
            fill="none"
            stroke="#689F38"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>
      )}
      <g filter="url(#shadow)">
        {/* Pétalos exteriores */}
        {Array.from({ length: numPetals }).map((_, i) => {
          const rotation = i * (360 / numPetals);
          const translate = isOpen ? 17 : 7;
          return (
            <g
              key={`petal-${i}`}
              style={{
                transform: `rotate(${rotation}deg) translate(0, -${translate}px)`,
                transformOrigin: "0 0",
                transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <path
                d={isOpen ? openPetalPath : closedPetalPath}
                fill="#ebe84dff"
                stroke="#FBC02D"
                strokeWidth="2"
                style={{ transition: "d 0.8s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />
            </g>
          );
        })}
        {/* Trompeta central */}
        <g
        className={isOpen ? "cursor-pointer" : ""}
          onClick={isOpen ? onCenterClick : undefined}
          style={{
            transform: `scale(${isOpen ? 1.2 : 1.2})`,
            transformOrigin: '0 0',
            transition: 'transform 0.8s cubic-bezier(0.6, 0, 0.2, 1) 0.2s'
            
          }}
        >
          <path
            d={isOpen ? openCoronaPath : closedCoronaPath}
            fill="url(#corona-gradient)"
            stroke="#fdb333ff"
            strokeWidth="2"
            style={{ transition: "d 0.8s cubic-bezier(0.6, 0, 0.2, 1) 0.2s" }}
          />
          {/* Borde rizado */}
          <ellipse
            cx="0"
            cy={isOpen ? 2 : 1}
            rx={isOpen ? 8 : 4}
            ry={isOpen ? 3.5 : 1.5}
            fill="#ffa200ff"
            opacity="0.25"
            style={{
              transition: "all 0.8s cubic-bezier(0.6, 0, 0.2, 1) 0.2s"
            }}
          />
        </g>
        {/* Centro */}
        <circle cx="0" cy="0" r={isOpen ? 3.8 : 2} fill="#d38703ff" 
          />
      </g>
    </svg>
  );
};

export default Narciso;