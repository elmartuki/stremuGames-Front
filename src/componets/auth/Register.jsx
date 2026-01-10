import React, { useState } from "react";
import clientAxios from "../../utils/clientAxios";

export default function Register() {
  const [form, setForm] = useState({
    nombreUsuario: "",
    email: "",
    password: "",
    foto_de_perfil: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usuarioFinal = {
        nombreUsuario: form.nombreUsuario,
        email: form.email,
        password: form.password,
        foto_de_perfil: "", // El backend suele esperar un string si no hay foto
      };

      const response = await clientAxios.post(
        "/usuarios/register",
        usuarioFinal
      );
      console.log("Registro exitoso:", response.data);
      alert("¡Usuario registrado con éxito!");
    } catch (error) {
      // MEJORA: Ver la respuesta real del backend en la consola
      if (error.response) {
        console.error("Detalle del error 400:", error.response.data);
        alert(`Error: ${error.response.data.message || "Datos inválidos"}`);
      } else {
        console.error("Error al registrar:", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Box">
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={form.nombreUsuario}
        onChange={(e) => setForm({ ...form, nombreUsuario: e.target.value })}
        style={{ color: "black" }}
      />
      <input
        type="email" // Cambiado a 'email' para validación nativa
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{ color: "black" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        // ANTES: form.contraseña (incorrecto) -> AHORA: form.password
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={{ color: "black" }}
      />

      <button type="submit">Guardar</button>
    </form>
  );
}
