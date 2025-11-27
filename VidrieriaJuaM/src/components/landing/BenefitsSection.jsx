// src/components/landing/BenefitsSection.jsx
import { benefits } from '../../data/landingData'

function BenefitsSection() {
  return (
    <section className="container py-5" id="beneficios">
      <div className="d-flex flex-column gap-2 mb-4">
        <div className="accent-bar"></div>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <div className="section-title">Por qué elegir Vidrios Villarroel</div>
            <p className="section-subtitle mb-0">
              Materiales premium, mano de obra especializada y un proceso pensado para que todo
              salga rápido y bien a la primera.
            </p>
          </div>
          <div className="urgency">
            <span>Solo 10 cupos de instalación disponibles este mes.</span>
            <a href="#contacto" className="btn btn-primary btn-sm">
              Agendar visita
            </a>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {benefits.map((benefit) => (
          <div className="col-md-6 col-lg-3" key={benefit.title}>
            <div className="benefit-card h-100 p-3">
              <div className="benefit-icon">✓</div>
              <h5 className="fw-bold mb-2">{benefit.title}</h5>
              <p className="mb-0 text-secondary">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mt-4">
        <div className="col-md-4">
          <div className="stat-card h-100">
            <h3 className="mb-1">48 hs</h3>
            <p className="mb-0">Instalación promedio desde la toma de medidas.</p>
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
