// src/components/landing/ContactSection.jsx
import { useState } from 'react'
import { API_URL } from '../../config/api'
import { steps, testimonials } from '../../data/landingData'

function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    medidas: '',
  })

  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', message: 'Enviando tu solicitud...' })
    try {
      console.log('Enviando formulario a:', API_URL)
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('No pudimos enviar el formulario.')
      }

      setStatus({ state: 'success', message: 'Listo, te contactamos en minutos.' })
      setFormData({ nombre: '', telefono: '', email: '', medidas: '' })
    } catch (error) {
      setStatus({
        state: 'error',
        message: 'Ocurrió un problema. Probá de nuevo o llamanos.',
      })
    }
  }

  return (
    <section className="container py-5" id="contacto">
      <div className="row g-4 align-items-start">
        <div className="col-lg-6">
          <div className="d-flex flex-column gap-2 mb-3">
            <div className="accent-bar"></div>
            <div className="section-title">Pedí tu presupuesto sin cargo</div>
            <p className="section-subtitle">
              Te respondemos en menos de 30 minutos hábiles. Si preferís, coordinamos directo
              por WhatsApp.
            </p>
          </div>

          <div className="contact-card">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <label className="form-label fw-semibold">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Ej: Ana Villarroel"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  className="form-control"
                  placeholder="11 5555 5555"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="tu@correo.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">
                  Medidas aproximadas (opcional)
                </label>
                <input
                  type="text"
                  name="medidas"
                  className="form-control"
                  placeholder="Ej: 90x190 cm, frente e interior"
                  value={formData.medidas}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 d-grid d-md-flex align-items-center gap-3">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={status.state === 'loading'}
                >
                  {status.state === 'loading' ? 'Enviando...' : 'Enviar y agendar'}
                </button>
                <span className="text-muted small">
                  Respuesta en 30 min. Sin spam. Solo usamos tus datos para contactarte.
                </span>
              </div>
              {status.state !== 'idle' && (
                <div
                  className={`alert mt-2 mb-0 ${
                    status.state === 'success'
                      ? 'alert-success'
                      : status.state === 'error'
                        ? 'alert-danger'
                        : 'alert-info'
                  }`}
                  role="alert"
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="d-flex flex-column gap-3">
            <div className="benefit-card p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="mb-1">Proceso express</h5>
                  <p className="text-secondary mb-2">
                    Todo pensado para que instales esta misma semana.
                  </p>
                </div>
                <div className="badge bg-primary-subtle text-primary fw-semibold">48 hs</div>
              </div>
              <div className="row g-3">
                {steps.map((step) => (
                  <div className="col-md-4" key={step.title}>
                    <div className="p-3 rounded bg-light h-100">
                      <div className="fw-semibold mb-1">{step.title}</div>
                      <small className="text-secondary">{step.detail}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="row g-3">
              {testimonials.map((t) => (
                <div className="col-md-6" key={t.name}>
                  <div className="testimonial-card">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <strong>{t.name}</strong>
                      <span className="badge bg-primary">{t.rating} ★</span>
                    </div>
                    <p className="quote mb-2">{t.text}</p>
                    <small className="text-muted">Instalación verificada</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="urgency">
              <div>
                <strong>Consultanos ahora y asegurá fecha.</strong>
                <div className="text-white-50">Cupos limitados por agenda de templado.</div>
              </div>
              <a href="#contacto" className="btn btn-outline-light btn-sm">
                Reservar turno
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
