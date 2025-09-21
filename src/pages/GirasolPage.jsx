import React, { useState } from 'react'; 
import { textosCartas } from '../content/textos.js';
import girasolFondo from '../assets/girasol.png'; 
import papel4 from '../assets/papel4.png';       
import BotonVolver from '../components/BotonVolver';
import BotonVisibilidad from '../components/BotonVisibilidad'; 


const GirasolPage = () => {
  const urlPlaylist = "https://open.spotify.com/playlist/36k6Y0HSTKEhqxpXQ0r9cm?si=6f53cc0bbf064bf9&pt=ea5c07a1a65d51570e2670eca6c91bdd";
 const [isContentVisible, setIsContentVisible] = useState(true);
  return (
    <div
      className="h-screen w-full bg-contain bg-no-repeat bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${girasolFondo})`, backgroundColor: "#4529c2" }}
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
          backgroundImage: `url(${papel4})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
        }}
      >
        <div className="max-w-lg w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 text-center">
            {textosCartas.girasol.titulo}
          </h1>

          <p className="text-base md:text-lg text-black leading-relaxed whitespace-pre-wrap text-justify">
            {textosCartas.girasol.cuerpo}
          </p>

          <p className="text-base md:text-lg text-black leading-relaxed whitespace-pre-wrap text-justify mt-6 italic">
            {textosCartas.girasol.posdata1_parte1}
            <a
              href={urlPlaylist}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 hover:underline not-italic"
            >
              {textosCartas.girasol.posdata1_link}
            </a>
            {textosCartas.girasol.posdata1_parte2}
          </p>

          <p className="text-base md:text-lg text-black leading-relaxed whitespace-pre-wrap text-justify mt-4 italic">
            {textosCartas.girasol.posdata2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GirasolPage;