// src/components/landing/Hero.jsx
// -------------------------------------------------------------
// Sección "Hero" de la landing.
//
// Es la primera sección grande que ve el usuario:
//  - Título principal y subtítulo (beneficio clave)
//  - Bullets de valor (píldoras)
//  - Botón de CTA al formulario
//  - Badge de urgencia ("Instalaciones disponibles...")
//  - Logos de marcas que confían (chips en brand-bar)
//  - Imagen principal con una tarjeta flotante
// -------------------------------------------------------------

import { useMemo } from 'react'
import { logos } from '../../data/landingData'

function Hero() {
  // ---------------------------------------------------------
  // heroCopy:
  // Usamos useMemo para evitar recrear este objeto en cada render.
  // No es estrictamente necesario acá (porque es texto estático),
  // pero es una buena práctica que muestra intención.
  // ---------------------------------------------------------
  const heroCopy = useMemo(
    () => ({
      title: 'Mamparas de cristal templado instaladas en 48 horas.',
      subtitle:
        'Elegancia, seguridad y cero filtraciones para tu baño, oficina o galería.',
    }),
    [],
  )

  return (
    <div className="hero container py-lg-5">
      <div className="row g-4 align-items-center">
        {/* Columna izquierda: texto + CTA + logos */}
        <div className="col-lg-6">
          <div className="hero-card position-relative">
            {/* Eyebrow: mini etiqueta arriba del título */}
            <div className="hero-eyebrow">
              <span className="dot"></span>{' '}
              Vidrios Villarroel · Especialistas en mamparas a medida
            </div>

            {/* Título y subtítulos principales */}
            <h1>{heroCopy.title}</h1>
            <p className="lead mb-1">{heroCopy.subtitle}</p>
            <p className="mt-2 mb-4">
              Instalación profesional, asesoramiento sin cargo y garantía.
            </p>

            {/* Lista de bullets de valor en forma de "pills" */}
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

            {/* CTA principal + badge de urgencia */}
            <div className="d-flex flex-wrap gap-3">
              <a className="btn btn-primary btn-lg px-4" href="#contacto">
                Pedí tu presupuesto sin cargo
              </a>

              {/* Badge de "Instalaciones disponibles" */}
              <div className="mini-badge">
                <span  className="dot"></span>
                <span style={{color: "white"}}>Instalaciones disponibles</span>
                
              </div>
            </div>

            {/* Barra de logos "Elegidos por" */}
            <div className="brand-bar">
  <span className="fw-semibold me-3">Elegidos por</span>

  {logos.map((logo, idx) => (
    <div key={idx} className="brand-item">
      <img
        src={logo.src}
        alt={logo.alt}
        className="brand-logo"
        loading="lazy"
      />
      <small className="brand-caption">{logo.alt}</small>
    </div>
  ))}
</div>

          </div>
        </div>

        {/* Columna derecha: imagen principal + tarjeta flotante */}
        <div className="col-lg-6">
          <div className="hero-visual">
            <div className="glass-panel">
              <img
                className="hero-image"
                // ⚠ IMPORTANTE: si la imagen está en /public, la ruta correcta es:
                // src="/Gemini_Generated_Image_bz3yp4bz3yp4bz3y.png"
                // NO "public/..." porque Vite sirve public como raíz.
                src="/Gemini_Generated_Image_bz3yp4bz3yp4bz3y.png"
                alt="Mampara de vidrio templado instalada"
              />
            </div>

            {/* Tarjeta flotante sobre la imagen */}
            <div className="floating-card">
              <div className="mini-badge mb-2">
                <span className="dot"></span>
                <span>Garantía de colocación</span>
              </div>
              <p className="mb-1 fw-semibold">
                “Sin goteras, sin problemas y sin demoras.”
              </p>
              <small className="text-muted">Equipo Vidrios Villarroel</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
