import React from "react";
import clientAxios from "../../utils/clientAxios";
import { useState } from "react";

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
        foto_de_perfil: "",
      };

      const response = await clientAxios.post(
        "/usuarios/register",
        usuarioFinal
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error al registrar", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="Box">
        <input
          type="text"
          placeholder="Escriba su nombre de usuario"
          value={form.nombreUsuario}
          onChange={(event) =>
            setForm({ ...form, nombreUsuario: event.target.value })
          }
          style={{ color: "black" }}
        />
        <input
          type="text"
          placeholder="Escriba su email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          style={{ color: "black" }}
        />
        <input
          type="password"
          placeholder="Escriba su contraseña"
          value={form.contraseña}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
          style={{ color: "black" }}
        />

        <button>Guardar</button>
      </form>
    </>
  );
}
