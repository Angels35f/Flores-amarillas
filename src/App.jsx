// Los textos están en src/content/notas.json.
// El link para entrar es /me-lo-merezco.
// La encuesta llega a anglsant2002@hotmail.com por FormSubmit.
// En la lista de notas caben hasta 10. En el celular se apilan hacia abajo.
import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import paginas from './content/notas.json'
import pikachu from './assets/pikachu.png'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

function Cerrada() {
  useEffect(() => {
    document.title = 'nota'
  }, [])

  return (
    <main className="escena cerrada">
      <p>Por aquí no se entra.</p>
    </main>
  )
}

function Original() {
  useEffect(() => {
    document.title = 'En construcción'
  }, [])

  return (
    <main className="escena original">
      <h1>Lo siento, pero la vida sigue</h1>
      <img src={pikachu} alt="" />
      <p>En construcción...</p>
    </main>
  )
}

function enviarResena(estrellas, comentario) {
  fetch('https://formsubmit.co/ajax/0e2d4bf0ac734a73352e9e8be12dba64', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: 'Nota del regalo',
      _captcha: 'false',
      _template: 'table',
      estrellas: `${estrellas} de 5`,
      comentario: comentario.trim() || '(sin comentario)',
    }),
  }).catch(() => {})
}

function Encuesta({ pagina, onEnviar }) {
  const [estrellas, setEstrellas] = useState(0)
  const [comentario, setComentario] = useState('')
  const [enviado, setEnviado] = useState(false)

  const enviar = (evento) => {
    evento.preventDefault()
    if (enviado) return
    setEnviado(true)
    onEnviar(estrellas, comentario)
  }

  return (
    <main className="escena formulario">
      <form className="tarjeta" onSubmit={enviar}>
        <h1>{pagina.tituloEncuesta}</h1>
        <p className="puntaje">{estrellas} de 5</p>
        <div className="estrellas" role="group" aria-label="Estrellas">
          {[1, 2, 3, 4, 5].map((nivel) => (
            <button
              key={nivel}
              type="button"
              className={nivel <= estrellas ? 'estrella activa' : 'estrella'}
              aria-label={`${nivel} estrellas`}
              aria-pressed={nivel <= estrellas}
              onClick={() => setEstrellas(estrellas === nivel ? 0 : nivel)}
            >
              ★
            </button>
          ))}
        </div>
        <label className="campo">
          <span>{pagina.placeholderComentario}</span>
          <textarea
            value={comentario}
            onChange={(evento) => setComentario(evento.target.value)}
            rows={5}
          />
        </label>
        <button className="enviar" type="submit">
          {pagina.enviar}
        </button>
      </form>
    </main>
  )
}

function Broma({ pagina, onSi }) {
  const [escala, setEscala] = useState(1)
  const [fuga, setFuga] = useState(null)
  const [yaHuyo, setYaHuyo] = useState(false)
  const huyendo = useRef(false)

  const huir = (evento) => {
    evento.preventDefault()
    evento.stopPropagation()
    if (huyendo.current) return
    huyendo.current = true
    window.setTimeout(() => {
      huyendo.current = false
    }, 220)

    const ancho = 96
    const alto = 52
    const margen = 12
    let x = margen
    let y = margen
    for (let intento = 0; intento < 8; intento += 1) {
      x = margen + Math.random() * Math.max(0, window.innerWidth - ancho - margen * 2)
      y = margen + Math.random() * Math.max(0, window.innerHeight - alto - margen * 2)
      const lejos = Math.hypot(x - evento.clientX, y - evento.clientY) > 130
      if (lejos) break
    }

    setFuga({ x, y })
    setEscala((valor) => Math.min(valor * 1.4, 22))
    setYaHuyo(true)
  }

  return (
    <main className="escena broma">
      <p className="pregunta">{pagina.preguntaReal}</p>
      <div className="decision">
        <button
          type="button"
          className="si"
          style={{ transform: `scale(${escala})` }}
          onClick={onSi}
        >
          Sí
        </button>
        <button
          type="button"
          className={fuga ? 'no no-suelto' : 'no'}
          style={fuga ? { left: fuga.x, top: fuga.y } : undefined}
          onPointerEnter={yaHuyo ? huir : undefined}
          onPointerDown={huir}
          onKeyDown={(evento) => {
            if (evento.key === 'Enter' || evento.key === ' ') huir(evento)
          }}
        >
          No
        </button>
      </div>
    </main>
  )
}

function Cierre({ texto }) {
  return (
    <main className="escena">
      <div className="intro">
        <h1>{texto}</h1>
      </div>
    </main>
  )
}

function NotasPage() {
  const { palabra } = useParams()
  const clave = decodeURIComponent(palabra || '').trim().toLowerCase()
  const pagina = paginas[clave]
  const [fase, setFase] = useState('word')
  const [vista, setVista] = useState('notas')
  const [escalaBoton, setEscalaBoton] = useState(1)

  useEffect(() => {
    if (!pagina) return undefined

    setFase('word')
    setVista('notas')
    setEscalaBoton(1)
    document.title = pagina.titulo || clave

    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const espera = reducir ? 1200 : 4200
    const salida = reducir ? 900 : 700

    const dejar = setTimeout(() => setFase('leaving'), espera)
    const quitar = setTimeout(() => setFase('gone'), espera + salida)

    return () => {
      clearTimeout(dejar)
      clearTimeout(quitar)
    }
  }, [clave, pagina])

  useEffect(() => {
    if (vista !== 'notas') window.scrollTo(0, 0)
  }, [vista])

  if (!pagina) return <Cerrada />

  if (vista === 'encuesta') {
    return (
      <Encuesta
        pagina={pagina}
        onEnviar={(estrellas, comentario) => {
          enviarResena(estrellas, comentario)
          setVista('broma')
        }}
      />
    )
  }

  if (vista === 'broma') {
    return <Broma pagina={pagina} onSi={() => setVista('si')} />
  }

  if (vista === 'si') {
    return <Cierre texto={pagina.respuestaSi} />
  }

  const notasVisibles = fase !== 'word'

  return (
    <main className="escena">
      {fase !== 'gone' && (
        <div className={`intro ${fase === 'leaving' ? 'intro-sale' : ''}`}>
          <h1>{pagina.titulo}</h1>
        </div>
      )}

      <section className={`muro ${notasVisibles ? 'muro-visible' : ''}`} aria-hidden={!notasVisibles}>
        {pagina.notas.map((texto, indice) => (
          <article
            key={`${clave}-${indice}`}
            className="nota"
            style={{ animationDelay: `${indice * 80}ms` }}
          >
            <p>{texto}</p>
          </article>
        ))}
      </section>

      {notasVisibles && (
        <>
          <button
            type="button"
            className="crecer"
            style={{
              fontSize: `${Math.min(0.16 * escalaBoton, 8)}rem`,
              width: `${Math.min(2.2 * escalaBoton, 200)}rem`,
              whiteSpace: escalaBoton < 4 ? 'nowrap' : 'normal',
              overflow: escalaBoton < 4 ? 'hidden' : 'visible',
              borderRadius: escalaBoton < 4 ? '999px' : '12px',
              padding: escalaBoton < 4 ? '0.12rem 0.4rem' : '0.75rem 0.95rem',
            }}
            onClick={() => setEscalaBoton((valor) => Math.min(valor * 1.7, 90))}
          >
            {pagina.botonEsquina}
          </button>
          <footer className="pie">
            <button type="button" className="finalizar" onClick={() => setVista('encuesta')}>
              {pagina.finalizar}
            </button>
          </footer>
        </>
      )}
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={base || undefined}>
      <Routes>
        <Route path="/" element={<Original />} />
        <Route path="/:palabra" element={<NotasPage />} />
        <Route path="*" element={<Cerrada />} />
      </Routes>
    </BrowserRouter>
  )
}
