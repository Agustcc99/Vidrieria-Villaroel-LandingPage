import './App.css'

import AdminPage from './pages/AdminPage'
import TopBar from './components/layout/TopBar'
import Hero from './components/landing/Hero'
import BenefitsSection from './components/landing/BenefitsSection'
import ContactSection from './components/landing/ContactSection'

function App() {
  const isAdmin =
    window.location.pathname.startsWith('/admin') ||
    window.location.search.includes('admin') ||
    window.location.hash.includes('admin')

  if (isAdmin) {
    return <AdminPage />
  }

  return (
    <div className="page-bg">
      <TopBar />
      <Hero />
      <BenefitsSection />
      <ContactSection />

      <section className="py-4">
        <div className="container text-center footer">
          Vidrios Villarroel · Vidrios templados y mamparas a medida · Atención en CABA y GBA
        </div>
      </section>
    </div>
  )
}

export default App
