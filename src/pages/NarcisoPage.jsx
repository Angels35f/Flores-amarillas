import narciso from '../assets/narciso.png' 
import BotonVolver from '../components/BotonVolver';
import papel2 from '../assets/papel2.png';
import { textosCartas } from '../content/textos.js';
import React,{useState} from 'react';
import BotonVisibilidad from '../components/BotonVisibilidad';

const NarcisoPage = () => {
  const urlCancion = "https://open.spotify.com/intl-es/track/5SPUsNcUtRUpAPj7rJq7CD?si=832cac397bbe4c8c"; 
 const [isContentVisible, setIsContentVisible] = useState(true);
  return (
    <div
      className="h-screen w-full bg-contain bg-no-repeat bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${narciso})`, backgroundColor: "#c77ad1" }}
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
          backgroundImage: `url(${papel2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
        }}
      >
        <div className="max-w-lg"> 
          <h1 className="titulo">
            {textosCartas.narciso.titulo}
          </h1>
          
          <p className="text-base md:text-lg text-black leading-relaxed whitespace-pre-wrap text-justify">
            {textosCartas.narciso.cuerpo1}

            <a 
              href={urlCancion} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-blue-700 hover:underline"
            >
              {textosCartas.narciso.palabraLink}
            </a>
            
            {textosCartas.narciso.cuerpo2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NarcisoPage;