// src/pages/AdminPage.jsx
// ------------------------------------------------------
// Página de administración de Vidrios Villarroel.
//
// ✅ Hace todo en un solo componente:
//   - Intenta cargar /api/admin/submissions al montar.
//   - Si el backend responde 401 -> muestra formulario de LOGIN.
//   - Si responde 200 -> muestra TABLA de contactos.
//   - Permite cambiar estado (PATCH) y hacer logout.
//
// Usa el backend:
//   - POST http://localhost:4000/api/auth/login
//   - POST http://localhost:4000/api/auth/logout
//   - GET  http://localhost:4000/api/admin/submissions
//   - PATCH http://localhost:4000/api/admin/submissions/:id
// ------------------------------------------------------

import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000";

// Estados posibles del contacto (incluyendo nuevos)
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

// ------------------------------------------------------
// Formulario de login de administrador
// ------------------------------------------------------
function AdminLoginForm({ onLoginSuccess, errorGlobal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const resp = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 muy importante para que se guarde la cookie
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) {
        const dataError = await resp.json().catch(() => ({}));
        throw new Error(dataError.error || "Error al iniciar sesión");
      }

      const data = await resp.json();

      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "480px" }}>
      <h1 className="h3 mb-3 text-center">Panel administrador</h1>
      <p className="text-muted text-center">
        Ingresá con tu usuario de administrador para ver los contactos.
      </p>

      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 shadow-sm bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Email administrador</label>
          <input
            type="email"
            className="form-control"
            placeholder="admin@vidrios.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {(error || errorGlobal) && (
          <div className="alert alert-danger py-2">
            {error || errorGlobal}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={cargando}
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

// ------------------------------------------------------
// Tabla del panel admin (lista + cambio de estado)
// ------------------------------------------------------
function AdminSubmissionsTable({
  submissions,
  onCambiarEstado,
  onLogout,
  cargando,
  error,
  recargar,
}) {
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Panel de contactos</h1>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={recargar}
            disabled={cargando}
          >
            {cargando ? "Actualizando..." : "Recargar"}
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onLogout}
          >
            Cerrar sesión
          </button>
        </div>
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
                        {/* Badge de color que muestra el estado visualmente */}
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
                          }}
                          value={s.estado}
                          onChange={(e) =>
                            onCambiarEstado(s._id, e.target.value)
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

// ------------------------------------------------------
// Componente principal de la página admin
// ------------------------------------------------------
function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [vista, setVista] = useState("loading"); // "loading" | "login" | "dashboard"
  const [user, setUser] = useState(null);

  // Función para pedir las submissions al backend
  const cargarSubmissions = async () => {
    setCargando(true);
    setError("");

    try {
      const resp = await fetch(`${API_BASE}/api/admin/submissions`, {
        credentials: "include", // 👈 manda la cookie con el JWT
      });

      if (resp.status === 401 || resp.status === 403) {
        // No autenticado -> mostramos login
        setVista("login");
        setSubmissions([]);
        return;
      }

      if (!resp.ok) {
        const dataError = await resp.json().catch(() => ({}));
        throw new Error(dataError.error || "No se pudo cargar la lista");
      }

      const data = await resp.json();
      setSubmissions(data.items || []);
      setVista("dashboard");
    } catch (err) {
      setError(err.message);
      setSubmissions([]);
    } finally {
      setCargando(false);
    }
  };

  // Al montar, intentamos cargar submissions.
  useEffect(() => {
    cargarSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler para cambio de estado
  const handleCambioEstado = async (id, nuevoEstado) => {
    try {
      const resp = await fetch(
        `${API_BASE}/api/admin/submissions/${id}`,
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

      setSubmissions((prev) =>
        prev.map((item) =>
          item._id === data.item._id ? data.item : item
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Handler para LOGIN exitoso
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Después del login, pedimos la lista y cambiamos a dashboard
    cargarSubmissions();
  };

  // Handler para LOGOUT
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignoramos error, igual limpiamos front
    } finally {
      setUser(null);
      setSubmissions([]);
      setVista("login");
    }
  };

  // Vista "loading" inicial
  if (vista === "loading") {
    return (
      <div className="container my-5 text-center">
        <p>Cargando panel...</p>
      </div>
    );
  }

  // Vista login
  if (vista === "login") {
    return (
      <AdminLoginForm
        onLoginSuccess={handleLoginSuccess}
        errorGlobal={error}
      />
    );
  }

  // Vista dashboard
  return (
    <AdminSubmissionsTable
      submissions={submissions}
      cargando={cargando}
      error={error}
      onCambiarEstado={handleCambioEstado}
      onLogout={handleLogout}
      recargar={cargarSubmissions}
      user={user}
    />
  );
}

export default AdminPage;
