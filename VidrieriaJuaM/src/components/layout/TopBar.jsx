// src/components/layout/TopBar.jsx

function TopBar() {
    return (
      <div className="top-bar py-2">
        <div className="container d-flex align-items-center justify-content-between gap-3">
          <span className="small d-none d-md-inline">
            Vidrios Villarroel · Instalación en 48 hs · Garantía sin filtraciones
          </span>
          <a className="btn btn-primary btn-sm" href="#contacto">
            Contactar ahora
          </a>
        </div>
      </div>
    )
  }
  
  export default TopBar
  