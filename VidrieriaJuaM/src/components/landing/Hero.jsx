// src/components/landing/Hero.jsx
import { useMemo } from 'react'
import { logos } from '../../data/landingData'

function Hero() {
  const heroCopy = useMemo(
    () => ({
      title: 'Mamparas de cristal templado instaladas en 48 horas.',
      subtitle:
        'Elegancia, seguridad y cero filtraciones para tu baño, oficina o galeria.',
    }),
    [],
  )

  return (
    <div className="hero container py-lg-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <div className="hero-card position-relative">
            <div className="hero-eyebrow">
              <span className="dot"></span> Vidrios Villarroel · Especialistas en mamparas a medida
            </div>
            <h1>{heroCopy.title}</h1>
            <p className="lead mb-1">{heroCopy.subtitle}</p>
            <p className="mt-2 mb-4">
              Instalación profesional, asesoramiento sin cargo y garantía.
            </p>

            <div className="hero-list">
              {[
                'Vidrios templados de seguridad',
                'Medidas exactas sin filtraciones',
                'Equipo propio y puntual',
                
              ].map((item) => (
                <div className="pill" key={item}>
                  <span className="dot"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-3">
              <a className="btn btn-primary btn-lg px-4" href="#contacto">
                Pedí tu presupuesto sin cargo
              </a>
              <div className="mini-badge">
                <span className="dot"></span>
                <span>Instalaciones disponibles esta semana</span>
              </div>
            </div>

            <div className="brand-bar">
              <span className="fw-semibold">Elegidos por</span>
              {logos.map((logo, idx) => (
                <img
                  key={logo.alt + idx}
                  src={logo.src}
                  alt={logo.alt}
                  className="brand-logo rounded"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="hero-visual">
            <div className="glass-panel">
              <img
                className="hero-image"
                src="public/Gemini_Generated_Image_bz3yp4bz3yp4bz3y.png"
                alt="Mampara de vidrio templado instalada"
              />
            </div>
            <div className="floating-card">
              <div className="mini-badge mb-2">
                <span className="dot"></span>
                <span>Garantía de colocación</span>
              </div>
              <p className="mb-1 fw-semibold">“Sin goteras,, sin problemas y  sin demoras.”</p>
              <small className="text-muted">Equipo Vidrios Villarroel</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
