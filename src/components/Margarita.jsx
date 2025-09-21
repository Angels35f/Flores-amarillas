import React from 'react';

const Petal = ({ rotation, isOpen, scale = 1, color = "#FFF59D", stroke = "#FBC02D", pathOverride }) => {
  // Pétalo cerrado: pequeño y cerca del centro
  // Pétalo abierto: más grande y más alejado
  const closedPetalPath = `
    M 0 0
    C 6 -10, 6 -30, 0 -40
    C -6 -30, -6 -10, 0 0
    Z
  `;
  const openPetalPath = `
    M 0 0
    C 12 -25, 12 -50, 0 -65
    C -12 -50, -12 -25, 0 0
    Z
  `;
  const petalPath = pathOverride || (isOpen ? openPetalPath : closedPetalPath);
  const scaleValue = scale * (isOpen ? 1.1 : 0.7);
  const translate = isOpen ? 20 : 10;

  return (
    <g
      style={{
        transform: `rotate(${rotation}deg) translate(0, -${translate}px) scale(${scaleValue})`,
        transformOrigin: "0 0",
        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <path
        d={petalPath}
        fill={color}
        stroke={stroke}
        strokeWidth="2"
        style={{
          transition: "d 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </g>
  );
};

const Margarita = ({ isOpen, onClick, onCenterClick }) => {
  // Capa exterior: pétalos largos
  const outerPetals = 14;
  const openTwist = 50; // grados extra de giro al abrirse

  // Capa interior: pétalos más cortos y claros
  const innerPetals = 10;

  // Puedes ajustar el path para la capa interior si quieres que sea más corto
  const closedInnerPetalPath = `
    M 0 0
    C 4 -7, 13 -18, 0 -44
    C -13 -18, -4 -7, 0 0
    Z
  `;
  const openInnerPetalPath = `
    M 0 0
    C 8 -15, 8 -45, 0 -55
    C -8 -45, -8 -15, 0 0
    Z
  `;

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
        <filter id="shadow-margarita">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.2" />
        </filter>
      </defs>
      {/* Tallo */}
      {!isOpen && (
        <path
          d="M 0 30 C -15 70 15 80 0 100"
          fill="none"
          stroke="#689F38"
          strokeWidth="8"
          strokeLinecap="round"
        />
      )}
      <g filter="url(#shadow-margarita)">
        {/* Capa exterior */}
        {Array.from({ length: outerPetals }).map((_, i) => (
          <Petal
            key={`outer-${i}`}
            rotation={i * (360 / outerPetals) + (isOpen ? openTwist : 0)}
            isOpen={isOpen}
            color="#FFF59D"
            stroke="#FBC02D"
          />
        ))}
        {/* Capa interior */}
        {Array.from({ length: innerPetals }).map((_, i) => (
          <Petal
            key={`inner-${i}`}
            rotation={i * (360 / innerPetals) + 18 + (isOpen ? openTwist : 0)}
            isOpen={isOpen}
            color="#FFFDE7"
            stroke="#FBC02D"
            scale={0.7}
            pathOverride={isOpen ? openInnerPetalPath : closedInnerPetalPath}
          />
        ))}
        {/* Centro */}
        <circle
          cx="0"
          cy="0"
          r={isOpen ? 22 : 12}
          fill="#FFD600"
          stroke="#FBC02D"
          strokeWidth="2"
          className={isOpen ? "cursor-pointer" : ""}
          onClick={isOpen ? onCenterClick : undefined}
          style={{
            transition: "r 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </g>
    </svg>
  );
};

export default Margarita;