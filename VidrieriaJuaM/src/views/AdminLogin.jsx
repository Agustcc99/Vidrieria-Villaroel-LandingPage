// src/views/AdminLogin.jsx
// ------------------------------------------------------
// Vista de login para el panel de administrador.
// Hace POST a /api/auth/login y guarda el JWT en cookie
// (lo maneja el navegador, no nosotros).
// ------------------------------------------------------

import { useState } from "react";

function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const resp = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 importantísimo para la cookie
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) {
        const dataError = await resp.json().catch(() => ({}));
        throw new Error(dataError.error || "Error al iniciar sesión");
      }

      const data = await resp.json();

      // Opcional: podrías guardar info mínima en estado global
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

      // Podés redirigir con window.location o con React Router:
      // navigate("/admin");
      alert("Login correcto, redirigiendo al panel...");
      window.location.href = "/admin";
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

      <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-light">
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

        {error && (
          <div className="alert alert-danger py-2">
            {error}
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

export default AdminLogin;
