// src/components/landing/BenefitsSection.jsx
// -------------------------------------------------------------------
// Sección "Por qué elegir Vidrios Villarroel".
//
// Contiene:
//  - Un encabezado con texto descriptivo y un bloque de urgencia.
//  - Un grid de tarjetas de beneficios (map desde landingData).
//  - Tres "stat-cards" con métrica visual (48 hs, +1200, 5.0★).
// -------------------------------------------------------------------

import { benefits } from '../../data/landingData'

function BenefitsSection() {
  return (
    <section className="container py-5" id="beneficios">
      {/* Encabezado de sección: título + subtítulo + urgencia */}
      <div className="d-flex flex-column gap-2 mb-4">
        {/* Barra de acento visual a la izquierda */}
        <div className="accent-bar"></div>

        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          {/* Título y descripción de la sección */}
          <div>
            <div className="section-title">Por qué elegir Vidrios Villarroel</div>
            <p className="section-subtitle mb-0">
              Materiales premium, mano de obra especializada con mas de 20 Años de EXPERIENCIA.
              para que todo salga rápido y bien a la primera.
            </p>
          </div>

          {/* Bloque de urgencia + CTA secundaria */}
          <div className="urgency">
            <span>Cupos de instalacion limitados.</span>
            <a href="#contacto" className="btn btn-primary btn-sm">
              Agendar visita
            </a>
          </div>
        </div>
      </div>

      {/* Grid de beneficios (usa datos de landingData.js) */}
      <div className="row g-4">
        {benefits.map((benefit) => (
          <div className="col-md-6 col-lg-3" key={benefit.title}>
            <div className="benefit-card h-100 p-3">
              {/* Ícono simple (podría reemplazarse por algo más visual también) */}
              <div className="benefit-icon">✓</div>

              {/* Título y descripción del beneficio */}
              <h5 className="fw-bold mb-2">{benefit.title}</h5>
              <p className="mb-0 text-secondary">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Métricas de confianza (stats) */}
      <div className="row g-3 mt-4">
        <div className="col-md-4">
          <div className="stat-card h-100">
            <h3 className="mb-1">48 hs</h3>
            <p className="mb-0">Instalación promedio desde el acuerdo de las partes.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card h-100">
            <h3 className="mb-1">+1.200</h3>
            <p className="mb-0">Mamparas y vidrios templados colocados sin filtraciones.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card h-100">
            <h3 className="mb-1">5.0 ★</h3>
            <p className="mb-0">Calificación promedio de nuestros clientes.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
