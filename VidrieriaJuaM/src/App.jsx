// src/App.jsx
// ---------------------------------------------------------
// Componente principal de la aplicación.
//
// - Si la URL apunta al "modo admin" (/admin, ?admin, #admin)
//   se muestra el panel de contactos (<AdminPage />).
//
// - En cualquier otra URL se muestra la landing pública:
//   <TopBar + Hero + BenefitsSection + ContactSection>.
// ---------------------------------------------------------

import './App.css'

// Página del panel de administración (ver contactos, estados, etc.)
import AdminPage from './pages/AdminPage'

// Componentes de la landing pública
import TopBar from './components/layout/TopBar'
import Hero from './components/landing/Hero'
import BenefitsSection from './components/landing/BenefitsSection'
import ContactSection from './components/landing/ContactSection'

/**
 * Pequeña función de ayuda para saber si estamos en
 * una URL de administrador.
 *
 * Usamos 3 chequeos:
 *  - /admin en el pathname        → http://sitio.com/admin
 *  - "admin" en la query string   → http://sitio.com/?admin
 *  - "admin" en el hash           → http://sitio.com/#admin
 *
 * Esto te permite, por ejemplo, compartir un link como:
 *   http://localhost:5173/admin
 * o
 *   http://localhost:5173/?admin
 */
function isAdminRoute() {
  const { pathname, search, hash } = window.location

  return (
    pathname.startsWith('/admin') ||
    search.includes('admin') ||
    hash.includes('admin')
  )
}

function App() {
  // Calculamos si debemos mostrar el panel admin o la landing
  const isAdmin = isAdminRoute()

  // Si es ruta de admin, devolvemos directamente la página de admin
  if (isAdmin) {
    return <AdminPage />
  }

  // Si no es admin, renderizamos la landing completa
  return (
    <div className="page-bg">
      {/* Barra superior fija con mensaje y botón "Contactar ahora" */}
      <TopBar />

      {/* Sección hero principal (título, descripción, CTA, logos, etc.) */}
      <Hero />

      {/* Sección de beneficios y métricas ("Por qué elegir Vidrios Villarroel") */}
      <BenefitsSection />

      {/* Sección de contacto: formulario + pasos + testimonios */}
      <ContactSection />

      {/* Footer simple al final de la página */}
      <section className="py-4">
        <div className="container text-center footer">
          Vidrios Villarroel · Vidrios templados y mamparas a medida · Atención en CABA y GBA
        </div>
      </section>
    </div>
  )
}

export default App
