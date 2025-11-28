// src/data/landingData.js
// ----------------------------------------------------------------------
// Datos estáticos usados en la landing.
//
// Este archivo NO contiene lógica, solo información que consumen los
// componentes Hero, BenefitsSection, ContactSection, etc.
//
// Ventajas:
//  ✓ Evita tener strings sueltos en los componentes
//  ✓ Facilita mantener el contenido de marketing
//  ✓ Permite reutilizar datos desde distintos componentes
// ----------------------------------------------------------------------

// ⚠ IMPORTANTE SOBRE LAS IMÁGENES EN VITE ⚠
// Si estás usando imágenes de la carpeta "public/", NO debes escribir:
//   src: "public/archivo.png"
// Sino:
//   src: "/archivo.png"
// Porque "public" se sirve como raíz.
// ----------------------------------------------------------------------

// Logos de clientes / empresas que usan el servicio
export const logos = [
  {
    alt: 'Urbana Hotel',
    src: '/LogoHotel.png', // desde carpeta public/
  },
  {
    alt: 'Spa Le Soleil',
    src: '/spa.png',
  },
  {
    alt: 'Edificio Sofía',
    src: '/edificio.png',
  },
  {
    alt: 'Aldea Café',
    src: '/cafe.png',
  },
]

// Lista de beneficios de la empresa
export const benefits = [
  {
    title: 'Vidrios templados de seguridad',
    desc: 'Certificados, 10 mm de espesor y herrajes premium antihumedad.',
  },
  {
    title: 'Instalación Super rapida',
    desc: 'Equipo propio, puntualidad garantizada y protección del ambiente de trabajo.',
  },
  {
    title: 'Asesoramiento sin cargo',
    desc: 'Te guiamos en medidas, terminaciones y mantenimiento para que dure impecable.',
  },
  {
    title: 'Garantía de colocación',
    desc: 'Cobertura total por filtraciones y ajuste fino hasta que quede perfecto.',
  },
]

// Pasos del proceso de instalación
export const steps = [
  {
    title: 'Coordinamos tu visita',
    detail: 'Confirmamos medidas por WhatsApp o agenda presencial.',
  },
  {
    title: 'Fabricación a medida',
    detail: 'Corte y templado exacto, burletes y herrajes cromados listos en tiempo récord.',
  },
  {
    title: 'Instalamos en el día',
    detail: 'Montaje limpio y revision con el cliente.',
  },
]

// Testimonios de clientes reales
export const testimonials = [
  {
    name: 'Marcela R., Palermo',
    text: '“La mampara quedó impecable y llegaron en el horario exacto. Cero filtraciones y dejaron todo limpio.”',
    rating: '5.0',
  },
  {
    name: 'Diego P., San Isidro',
    text: '“Respondieron mi consulta en minutos, midieron el mismo día y en dos dias estaba como nuevo.”',
    rating: '5.0',
  },
  {
    name: 'Edificio Sofía',
    text: '“Gestionaron y cambiaron todo el frente en solo dos jornadas, con señalización y seguridad. Muy profesionales.”',
    rating: '5.0',
  },
] 
