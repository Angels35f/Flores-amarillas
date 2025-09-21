import React, { useState } from 'react';
import { textosCartas } from '../content/textos.js';
import candy from '../assets/candy.png';
import papel1 from '../assets/papel1.png';
import BotonVolver from '../components/BotonVolver';
import BotonVisibilidad from '../components/BotonVisibilidad.jsx';

const MargaritaPage = () => {
  const [isContentVisible, setIsContentVisible] = useState(true);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${candy})` }}
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
          backgroundImage: `url(${papel1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
        }}
      >
        <div className="max-w-lg"> 
          <h1 className="text-4xl md:text-2xl font-bold text-black mb-6 text-center">
            {textosCartas.margarita.titulo}
          </h1>
          <p className="text-base md:text-lg text-black leading-relaxed whitespace-pre-wrap text-justify">
            {textosCartas.margarita.cuerpo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MargaritaPage;