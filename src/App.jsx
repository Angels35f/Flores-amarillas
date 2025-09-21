import React, { useState } from 'react';
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
  isOpenMargarita, setIsOpenMargarita,
  isOpenNarciso, setIsOpenNarciso,
  isOpenLoto, setIsOpenLoto,
  isOpenGirasol, setIsOpenGirasol,
  inputValue, setInputValue, checkWord
}) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed relative overflow-x-hidden"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      {/* Input central superior */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20">
        <input
          type="text"
          placeholder="Escribe la palabra..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkWord()}
          className="px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Caminito */}
      <svg
        className="absolute top-0 left-0 pointer-events-none"
        width="100vw"
        height="100vh"
        style={{ width: '100vw', height: '100vh', zIndex: 1 }}
      >
        <path
          d="M 350 650 Q 400 600 700 500, 
          M 800 500 Q 850 650 1200 750, 
          M 1300 750 Q 1500 500 1580 500"
          stroke="#000000ff"
          strokeWidth="6"
          fill="none"
          strokeDasharray="18 18"
          opacity="0.8"
        />
      </svg>

      {/* Flores */}
      <div className="absolute" style={{ top: '60%', left: '10%', zIndex: 2 }}>
        <Margarita
          isOpen={isOpenMargarita}
          onCenterClick={() => isOpenMargarita && navigate("/margarita")}
        />
      </div>
      <div className="absolute" style={{ top: '35%', left: '35%', zIndex: 2 }}>
        <Narciso
          isOpen={isOpenNarciso}
          onCenterClick={() => isOpenNarciso && navigate ("/narciso")}
        />
      </div>
      <div className="absolute" style={{ top: '60%', right: '28%', zIndex: 2 }}>
        <Loto
          isOpen={isOpenLoto}
          onClick={() => {  if (isOpenLoto) {
            navigate("/loto"); 
          }} }
/>
      </div>
      <div className="absolute" style={{ top: '35%', right: '10%', zIndex: 2 }}>
        <Girasol
          isOpen={isOpenGirasol}
          onClick={() => {
            if (isOpenGirasol) {
              navigate("/girasol"); 
            }
          }}
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

        {/* Puedes agregar más rutas para otras flores */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
