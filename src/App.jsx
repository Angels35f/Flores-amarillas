
import React, { useState, useRef, useEffect } from 'react'; // Se añaden useRef y useEffect
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import Girasol from './components/Girasol'
import Narciso from './components/Narciso'
import Margarita from './components/Margarita'
import Loto from './components/Loto'
import MargaritaPage from './pages/MargaritaPage';
import NarcisoPage from './pages/NarcisoPage';
import LotoPage from './pages/LotoPage';
import GirasolPage from './pages/GirasolPage';
import fondo from './assets/fondo.png'

function Home({
  isOpenMargarita,
  isOpenNarciso,
  isOpenLoto,
  isOpenGirasol,
  inputValue, setInputValue, checkWord
}) {
  const navigate = useNavigate();

  const margaritaRef = useRef(null);
  const narcisoRef = useRef(null);
  const lotoRef = useRef(null);
  const girasolRef = useRef(null);
  const [pathData, setPathData] = useState('');

  useEffect(() => {
    const calculatePath = () => {
      if (margaritaRef.current && narcisoRef.current && lotoRef.current && girasolRef.current) {
        const margaritaRect = margaritaRef.current.getBoundingClientRect();
        const narcisoRect = narcisoRef.current.getBoundingClientRect();
        const lotoRect = lotoRef.current.getBoundingClientRect();
        const girasolRect = girasolRef.current.getBoundingClientRect();

        const margaritaPoint = { x: margaritaRect.left + margaritaRect.width / 2, y: margaritaRect.top + margaritaRect.height / 2 };
        const narcisoPoint = { x: narcisoRect.left + narcisoRect.width / 2, y: narcisoRect.top + narcisoRect.height / 2 };
        const lotoPoint = { x: lotoRect.left + lotoRect.width / 2, y: lotoRect.top + lotoRect.height / 2 };
        const girasolPoint = { x: girasolRect.left + girasolRect.width / 2, y: girasolRect.top + girasolRect.height / 2 };
        
        const newPathData = `
          M ${margaritaPoint.x} ${margaritaPoint.y}
          Q ${(margaritaPoint.x + narcisoPoint.x) / 2} ${(margaritaPoint.y + narcisoPoint.y) / 2 + 50} ${narcisoPoint.x} ${narcisoPoint.y}
          M ${narcisoPoint.x} ${narcisoPoint.y}
          Q ${(narcisoPoint.x + lotoPoint.x) / 2} ${(narcisoPoint.y + lotoPoint.y) / 2 - 50} ${lotoPoint.x} ${lotoPoint.y}
          M ${lotoPoint.x} ${lotoPoint.y}
          Q ${(lotoPoint.x + girasolPoint.x) / 2} ${(lotoPoint.y + girasolPoint.y) / 2 + 50} ${girasolPoint.x} ${girasolPoint.y}
        `;
        
        setPathData(newPathData);
      }
    };
    
    calculatePath();
    window.addEventListener('resize', calculatePath);
    return () => window.removeEventListener('resize', calculatePath);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed relative overflow-hidden"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="palabra"> {/* Movido el input arriba para consistencia */}
        <input
          type="text"
          placeholder="Escribe la palabra..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkWord()}
          className="px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <svg
        className="absolute top-0 left-0 pointer-events-none"
        width="100%"
        height="100%"
        style={{ zIndex: 1 }}
      >
        <path
          d={pathData}
          stroke="#000000"
          strokeWidth="4"
          fill="none"
          strokeDasharray="15 15"
          opacity="0.7"
        />
      </svg>
      
      <div ref={margaritaRef} className="absolute top-[75%] left-[15%] md:top-[60%] md:left-[10%] z-10">
        <Margarita
          isOpen={isOpenMargarita}
          onCenterClick={() => isOpenMargarita && navigate("/margarita")}
        />
      </div>
      <div ref={narcisoRef} className="absolute top-[50%] left-[40%] md:top-[35%] md:left-[35%] z-10">
        <Narciso
          isOpen={isOpenNarciso}
          onCenterClick={() => isOpenNarciso && navigate("/narciso")}
        />
      </div>
      <div ref={lotoRef} className="absolute top-[70%] left-[65%] md:top-[60%] md:right-[28%] md:left-auto z-10">
        <Loto
          isOpen={isOpenLoto}
          onClick={() => { if (isOpenLoto) { navigate("/loto"); }}}
        />
      </div>
      <div ref={girasolRef} className="absolute top-[45%] left-[80%] md:top-[35%] md:right-[10%] md:left-auto z-10">
        <Girasol
          isOpen={isOpenGirasol}
          onClick={() => { if (isOpenGirasol) { navigate("/girasol"); }}}
        />
      </div>
    </div>
  );
}

function App() {
  const [isOpenGirasol, setIsOpenGirasol] = useState(false);
  const [isOpenMargarita, setIsOpenMargarita] = useState(false);
  const [isOpenLoto, setIsOpenLoto] = useState(false);
  const [isOpenNarciso, setIsOpenNarciso] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const secretWords = {
    girasol: "sistólica",
    margarita: "amo",
    loto: "evy",
    narciso: "narciso",
  };

  const checkWord = () => {
    if (inputValue.toLowerCase() === secretWords.girasol) setIsOpenGirasol(true);
    if (inputValue.toLowerCase() === secretWords.margarita) setIsOpenMargarita(true);
    if (inputValue.toLowerCase() === secretWords.loto) setIsOpenLoto(true);
    if (inputValue.toLowerCase() === secretWords.narciso) setIsOpenNarciso(true);
  };

  return (
    <BrowserRouter basename="/Flores-amarillas/">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isOpenMargarita={isOpenMargarita}
              setIsOpenMargarita={setIsOpenMargarita}
              isOpenNarciso={isOpenNarciso}
              setIsOpenNarciso={setIsOpenNarciso}
              isOpenLoto={isOpenLoto}
              setIsOpenLoto={setIsOpenLoto}
              isOpenGirasol={isOpenGirasol}
              setIsOpenGirasol={setIsOpenGirasol}
              inputValue={inputValue}
              setInputValue={setInputValue}
              checkWord={checkWord}
            />
          }
        />
        <Route path="/margarita" element={<MargaritaPage />} />
        <Route path="/narciso" element={<NarcisoPage />} />
        <Route path="/loto" element={<LotoPage />} />
        <Route path="/girasol" element={<GirasolPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
