// src/components/layout/TopBar.jsx
// -------------------------------------------------------------
// Componente TopBar
//
// Esta barra aparece arriba de toda la landing (solo en la vista
// pública, no en el panel admin).
//
// Funciones principales:
//  ✓ Mostrar una frase de confianza / branding
//  ✓ Ofrecer un botón rápido para ir al formulario (#contacto)
//  ✓ Ocultarse parcialmente en pantallas pequeñas para evitar ruido visual
//
// No tiene estado ni lógica: es un componente de presentación.
// -------------------------------------------------------------

function TopBar() {
  return (
    <div className="top-bar py-2">
      {/* Contenedor Bootstrap para centrar contenido */}
      <div className="container d-flex align-items-center justify-content-between gap-3">

        {/* Mensaje descriptivo (oculto en pantallas pequeñas) 
            d-none d-md-inline → se esconde en móviles */}
        <span className="small d-none d-md-inline">
          Vidrios Villarroel · Instalación en 48 hs · Garantía sin filtraciones
        </span>

        {/* Botón CTA → lleva al formulario (#contacto) */}
        <a className="btn btn-primary btn-sm" href="#contacto">
          Contactar ahora
        </a>
      </div>
    </div>
  )
}

export default TopBar
