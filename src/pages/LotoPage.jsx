// src/pages/LotoPage.jsx

import React, { useState } from 'react';
import { textosCartas } from '../content/textos.js';
import lotus from '../assets/lotus.png';
import papel3 from '../assets/papel3.png'; 
import BotonVolver from '../components/BotonVolver';
import Tooltip from '../components/Tooltip';
import BotonVisibilidad from '../components/BotonVisibilidad';

const LotoPage = () => { 
  

  const [isContentVisible, setIsContentVisible] = useState(true);

  return (
    <div
      className="h-screen w-full bg-contain bg-no-repeat bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${lotus})`, backgroundColor: "#b0a3ec" }}
    >
      <BotonVolver />
      <BotonVisibilidad 
        isVisible={isContentVisible} 
        toggleVisibility={() => setIsContentVisible(!isContentVisible)} 
      />
      <div
        className={`relative rounded-xl p-6 sm:p-10 max-w-3xl w-full max-h-[95vh] overflow-y-auto flex flex-col items-center
                   transition-all duration-500 ease-in-out ${
                   isContentVisible 
                     ? 'opacity-100 scale-100' 
                     : 'opacity-0 scale-95 pointer-events-none'
                   }`}
        style={{
          backgroundImage: `url(${papel3})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
        }}
      >
        <div className="max-w-lg w-full">
          <h1 className="titulo">
            {textosCartas.loto.titulo}
          </h1>
          
          {textosCartas.loto.parrafos.map((parrafo, pIndex) => (
            <p key={pIndex} className="text-base md:text-lg text-black leading-relaxed whitespace-pre-wrap text-justify mb-4">
              {parrafo.map((item, iIndex) => {
                if (typeof item === 'string') {
                  return <React.Fragment key={iIndex}>{item}</React.Fragment>;
                }
                
                return (
                  <Tooltip 
                    key={iIndex}
                    word={item.word} 
                    translation={item.translation} 
                  />
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LotoPage;