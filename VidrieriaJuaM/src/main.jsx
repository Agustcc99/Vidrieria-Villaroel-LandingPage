
// ---------------------------------------------------------
// Punto de entrada de la aplicación React.
// Se encarga de montar el componente <App /> dentro
// del <div id="root"> que está en index.html.
// ---------------------------------------------------------

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// CSS de Bootstrap (solo estilos, no JS de Bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css'

// Tus estilos globales (colores, tipografías, layout)
import './index.css'

// Componente raíz de la aplicación
import App from './App.jsx'

// Buscamos el elemento root del DOM donde React va a "vivir"
const rootElement = document.getElementById('root')

// Montamos la app dentro de root.
// StrictMode ayuda a detectar problemas en desarrollo
// (no afecta al build de producción).
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
