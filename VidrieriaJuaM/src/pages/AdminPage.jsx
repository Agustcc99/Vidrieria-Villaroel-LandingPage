// src/pages/AdminPage.jsx
// -------------------------------------------------
// Panel de administrador para ver los contactos.
//
// Funcionalidades:
//  - Pide un token de administrador (por defecto: admin123)
//  - Trae la lista de envíos del formulario desde el backend
//  - Muestra los datos en una tabla
//  - Permite cambiar el estado de cada contacto:
//      pendiente / contestado / terminado
//
// Se apoya en el endpoint:
//   GET    /api/admin/submissions
//   PATCH  /api/admin/submissions/:id
// -------------------------------------------------

import { useEffect, useState } from 'react'
import { ADMIN_API } from '../config/api'
import '../App.css'

function AdminPage() {
  // Token que el admin escribe en el input (por defecto admin123)
  const [token, setToken] = useState('admin123')

  // Lista de contactos traídos desde el backend
  const [items, setItems] = useState([])

  // Estado general de la pantalla: idle | loading | success | error
  const [status, setStatus] = useState('idle')

  // Mensaje de error (si algo falla)
  const [errorMsg, setErrorMsg] = useState('')

  // Fecha/hora del último fetch correcto (para mostrar feedback)
  const [lastFetch, setLastFetch] = useState(null)

  // ID de la fila que se está actualizando (para deshabilitar solo esa fila)
  const [updatingId, setUpdatingId] = useState(null)

  // -------------------------------------------------
  // Helper para traer todos los contactos del backend
  // -------------------------------------------------
  const fetchData = async () => {
    setStatus('loading')

    try {
      console.log('Consultando admin API:', ADMIN_API)

      const res = await fetch(ADMIN_API, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviamos el token admin en el header
        },
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'No autorizado')
      }

      const data = await res.json()

      // Guardamos la lista de items en el estado
      setItems(data.items || [])
      setStatus('success')
      setErrorMsg('')
      setLastFetch(new Date().toISOString())
    } catch (e) {
      setStatus('error')
      setItems([])
      setErrorMsg(e.message || 'No autorizado')
      console.error('Error cargando admin:', e)
    }
  }

  // -------------------------------------------------
  // Cuando cambia el token y no está vacío, intentamos cargar los datos
  // -------------------------------------------------
  useEffect(() => {
    if (token) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // -------------------------------------------------
  // Devuelve clases de color para el <select> según el estado
  // Esto solo afecta la estética, no la lógica.
  // -------------------------------------------------
  const getEstadoColorClass = (estado = 'pendiente') => {
    switch (estado) {
      case 'pendiente':
        return 'bg-warning text-dark' // Amarillo
      case 'contestado':
        return 'bg-info text-dark' // Celeste
      case 'terminado':
        return 'bg-success text-white' // Verde
      default:
        return 'bg-secondary text-white' // Gris fallback
    }
  }

  // -------------------------------------------------
  // Cambiar el estado de un contacto (PATCH al backend)
  // -------------------------------------------------
  const handleEstadoChange = async (id, nuevoEstado) => {
    setUpdatingId(id) // Marcamos qué fila se está actualizando

    try {
      const res = await fetch(`${ADMIN_API}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'No se pudo actualizar el estado.')
      }

      const data = await res.json()

      // Reemplazamos el item actualizado dentro del array (inmutable)
      setItems((prev) =>
        prev.map((item) => (item.id === id ? data.item : item)),
      )

      setStatus('success')
      setErrorMsg('')
    } catch (e) {
      console.error('Error actualizando estado:', e)
      setStatus('error')
      setErrorMsg(e.message || 'No se pudo actualizar el estado.')
    } finally {
      // Liberamos la marca de "actualizando"
      setUpdatingId(null)
    }
  }

  return (
    <div className="admin-wrap">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="admin-card">
              {/* Header del panel: título + input de token + botones */}
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="mb-1">Panel de contactos</h3>
                  <small className="text-secondary">
                    Solo administrador · Ver envíos del formulario
                  </small>
                </div>

                {/* Input de token + botones de acción */}
                <div className="d-flex gap-2">
                  {/* Input para el token admin */}
                  <input
                    type="password"
                    placeholder="Token admin"
                    className="form-control"
                    style={{ maxWidth: 220 }}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />

                  <div className="d-flex gap-2">
                    {/* Botón para cargar datos */}
                    <button
                      className="btn btn-primary"
                      onClick={fetchData}
                      disabled={!token || status === 'loading'}
                    >
                      {status === 'loading' ? 'Cargando...' : 'Ingresar'}
                    </button>

                    {/* Botón para refrescar datos manualmente */}
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={fetchData}
                      disabled={!token || status === 'loading'}
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>

              {/* Mensajes de error / éxito */}
              {status === 'error' && (
                <div className="alert alert-danger">
                  {errorMsg || 'No autorizado o sin datos.'}
                </div>
              )}
              {status === 'success' && lastFetch && (
                <div className="alert alert-success">
                  Datos actualizados: {new Date(lastFetch).toLocaleTimeString()}
                </div>
              )}

              {/* Tabla con los contactos */}
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Teléfono</th>
                      <th>Email</th>
                      <th>Medidas</th>
                      <th>Recibido</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Fila vacía si no hay registros */}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center text-secondary">
                          {status === 'loading'
                            ? 'Cargando...'
                            : 'Sin registros aún.'}
                        </td>
                      </tr>
                    )}

                    {/* Filas de contactos */}
                    {items.map((item, idx) => {
                      const estadoActual = item.estado || 'pendiente'
                      const colorClass = getEstadoColorClass(estadoActual)

                      return (
                        <tr key={item.recibidoEn + idx}>
                          <td className="fw-semibold">{item.nombre}</td>
                          <td>{item.telefono}</td>
                          <td>{item.email}</td>
                          <td>{item.medidas || '-'}</td>
                          <td>
                            <span className="badge bg-primary-subtle text-primary badge-pill">
                              {new Date(item.recibidoEn).toLocaleString()}
                            </span>
                          </td>
                          <td>
                            {/* Select para cambiar el estado del contacto */}
                            <select
                              className={`form-select form-select-sm ${colorClass}`}
                              value={estadoActual}
                              disabled={
                                status === 'loading' || updatingId === item.id
                              }
                              onChange={(e) =>
                                handleEstadoChange(item.id, e.target.value)
                              }
                            >
                              <option value="pendiente">Pendiente</option>
                              <option value="contestado">Contestado</option>
                              <option value="terminado">Terminado</option>
                            </select>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mensaje final informativo */}
              <div className="alert alert-info mb-0">
                Tip: podés configurar tu propio token en el servidor usando la
                variable de entorno <code>ADMIN_TOKEN</code>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
