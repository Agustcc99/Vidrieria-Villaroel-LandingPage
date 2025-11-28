// src/views/AdminDashboard.jsx
// ------------------------------------------------------
// Panel admin:
//  - Lista todos los contactos desde /api/admin/submissions
//  - Permite cambiar el estado con PATCH /api/admin/submissions/:id
//  - Usa colores por estado:
//      pendiente → amarillo
//      contestado → verde
//      terminado → rojo
//      especial → violeta
//      proceso → azul
// ------------------------------------------------------

import { useEffect, useState } from "react";

// Estados posibles del contacto
const ESTADOS = [
  "pendiente",
  "contestado",
  "terminado",
  "especial",
  "proceso",
];

// Colores asociados a cada estado
const ESTADO_COLORES = {
  pendiente: { background: "#FFD93D", color: "#000" },   // amarillo
  contestado: { background: "#4CAF50", color: "#fff" },  // verde
  terminado: { background: "#E74C3C", color: "#fff" },   // rojo
  especial: { background: "#9B59B6", color: "#fff" },    // violeta
  proceso: { background: "#3498DB", color: "#fff" },     // azul
};

function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Cargar la lista de contactos desde el backend
  const cargarSubmissions = async () => {
    setCargando(true);
    setError("");

    try {
      const resp = await fetch("http://localhost:4000/api/admin/submissions", {
        credentials: "include", // 👈 manda la cookie con el JWT
      });

      if (!resp.ok) {
        const dataError = await resp.json().catch(() => ({}));
        throw new Error(dataError.error || "No se pudo cargar la lista");
      }

      const data = await resp.json();
      setSubmissions(data.items || []);
    } catch (err) {
      setError(err.message);
      setSubmissions([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarSubmissions();
  }, []);

  // Cambiar estado de un contacto
  const handleCambioEstado = async (id, nuevoEstado) => {
    try {
      const resp = await fetch(
        `http://localhost:4000/api/admin/submissions/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );

      if (!resp.ok) {
        const dataError = await resp.json().catch(() => ({}));
        throw new Error(dataError.error || "No se pudo actualizar el estado");
      }

      const data = await resp.json();

      // Actualizar en el estado local
      setSubmissions((prev) =>
        prev.map((item) =>
          item._id === data.item._id ? data.item : item
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Cerrar sesión (logout)
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/admin-login"; // o lo que uses
    } catch {
      window.location.href = "/admin-login";
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Panel de contactos</h1>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {cargando && <p>Cargando contactos...</p>}

      {!cargando && submissions.length === 0 && !error && (
        <p className="text-muted">No hay contactos aún.</p>
      )}

      {!cargando && submissions.length > 0 && (
        <div className="table-responsive">
          <table className="table table-sm table-striped align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Medidas</th>
                <th>Estado</th>
                <th>Recibido</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => {
                const estiloEstado =
                  ESTADO_COLORES[s.estado] || ESTADO_COLORES["pendiente"];

                return (
                  <tr key={s._id}>
                    <td>{s.nombre}</td>
                    <td>{s.telefono}</td>
                    <td>{s.email}</td>
                    <td>{s.medidas || "-"}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {/* Badge de color para que se vea sí o sí */}
                        <span
                          className="badge rounded-pill text-capitalize"
                          style={estiloEstado}
                        >
                          {s.estado}
                        </span>

                        {/* Select para cambiar el estado */}
                        <select
                          className="form-select form-select-sm fw-bold text-center"
                          style={{
                            border: "none",
                            // Algunos navegadores ignoran bg del select,
                            // por eso usamos también el badge anterior.
                          }}
                          value={s.estado}
                          onChange={(e) =>
                            handleCambioEstado(s._id, e.target.value)
                          }
                        >
                          {ESTADOS.map((estado) => (
                            <option key={estado} value={estado}>
                              {estado}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      {s.recibidoEn
                        ? new Date(s.recibidoEn).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
