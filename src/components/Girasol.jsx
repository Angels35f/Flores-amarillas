import React from 'react';

const Petal = ({ rotation, isOpen, scale = 1, color = "#FFEB3B", stroke = "#d3c331ff", pathOverride, translateOverride }) => {
  const closedPetalPath = `
    M 0 0 
    C 15 -20, 15 -40, 0 -45 
    C -15 -40, -15 -20, 0 0 
    Z
  `;
  const openPetalPath = `
    M 0 0 
    C 25 -20, 25 -60, 0 -75 
    C -25 -60, -25 -20, 0 0 
    Z
  `;
  const closedInnerPetalPath = `
    M 0 0 
    C 8 -10, 8 -25, 0 -35 
    C -8 -25, -8 -10, 0 0 
    Z
  `;
  const openInnerPetalPath = `
    M 0 0 
    C 18 -20, 15 -40, 0 -50 
    C -15 -40, -18 -20, 0 0 
    Z
  `;

  const petalPath = pathOverride || (isOpen ? openPetalPath : closedPetalPath);
  const scaleValue = scale;
  const translate = translateOverride !== undefined
    ? translateOverride
    : isOpen ? 28 : 10;

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
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: "d 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </g>
  );
};


const Girasol = ({ isOpen, onClick }) => {
  const numPetals = 13;
  const numInnerPetals = 10;
  const openTwist = 60; 
  return (
    <svg
      width="150"
      height="200"
      viewBox="-75 -100 150 200"
      xmlns="http://www.w3.org/2000/svg"
      className={isOpen ? "cursor-pointer" : ""}
      onClick={isOpen ? onClick : undefined}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>

      <g
        style={{
          opacity: isOpen ? 0 : 1,
          transform: `translateY(${isOpen ? '20px' : '0px'})`,
          transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <path
          d="M 0 40 Q 15 80 0 120"
          fill="none"
          stroke="#689F38"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 3 75 Q -32 60 -17 40 Q 0 55 3 75"
          fill="#7BC67E"
          stroke="#558B2F"
          strokeWidth="2"
          transform="rotate(-18 -7 70)"
        />
        <path
          d="M 13 95 Q 37 100 30 120 Q 0 115 13 95"
          fill="#7BC67E"
          stroke="#558B2F"
          strokeWidth="2"
          transform="rotate(-18 7 105)"
        />
      </g>

      <g filter="url(#shadow)">
        {Array.from({ length: numPetals }).map((_, i) => (
          <Petal
            key={`outer-${i}`}
            rotation={i * (360 / numPetals) + (isOpen ? openTwist : 0)}
            isOpen={isOpen}
            color="#FFEB3B"
            stroke="#d3c331ff"
          />
        ))}
        {Array.from({ length: numInnerPetals }).map((_, i) => (
          <Petal
            key={`inner-${i}`}
            rotation={i * (360 / numInnerPetals) + (360 / numInnerPetals) / 2 + (isOpen ? openTwist / 2 : 0)}
            isOpen={isOpen}
            color="#FFF176"
            stroke="#d3c331ff"
            scale={0.7}
            pathOverride={isOpen ? `
              M 0 0 
              C 18 -20, 15 -40, 0 -70 
              C -15 -40, -18 -20, 0 0 
              Z
            ` : `
              M 0 0 
              C 8 -10, 8 -25, 0 -45 
              C -8 -25, -8 -10, 0 0 
              Z
            `}
            translateOverride={isOpen ? 18 : 7}
          />
        ))}
        <g>
          {Array.from({ length: 100 }).map((_, i) => {
            const angle = i * 137.5 * (Math.PI / 180); 
            const radius = isOpen ? 2 + (i * 0.25) : 2 + (i * 0.13);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={isOpen ? 3 : 1.5}
                fill="#A67C2E"
                opacity="0.7"
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
};

export default Girasol;
