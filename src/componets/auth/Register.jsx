import React, { useState } from "react";
import clientAxios from "../../utils/clientAxios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreUsuario: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.nombreUsuario || !form.email || !form.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (form.nombreUsuario.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      setError("Email inválido");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);

      const response = await clientAxios.post("/usuarios/register", {
        nombreUsuario: form.nombreUsuario.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (response.status === 201) {
        alert("Usuario registrado correctamente");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-section">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>

        <input
          type="text"
          name="nombreUsuario"
          placeholder="Nombre de usuario"
          value={form.nombreUsuario}
          onChange={handleChange}
          style={{ color: "black" }}
        />

        <input
          type="text"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          style={{ color: "black" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          style={{ color: "black" }}
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </section>
  );
}
