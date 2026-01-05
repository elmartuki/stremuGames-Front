import React from "react";
import clientAxios from "../../utils/clientAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usuario_email: "",
    contraseña: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usuarioFinal = {
        usuario_email: form.usuario_email,
        contraseña: form.contraseña,
      };

      const response = await clientAxios.post("/usuarios/login", usuarioFinal);
      if (response.status === 200) {
        localStorage.setItem("TokenStremuGames", response.data.token);
        navigate("/explorar");
      }
      console.log(response);
    } catch (error) {
      alert("Usuario-Email o contraseña incorrecto");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="Box">
        <input
          type="text"
          placeholder="Escriba su nombre de usuario o email"
          value={form.usuario_email}
          onChange={(event) =>
            setForm({ ...form, usuario_email: event.target.value })
          }
          style={{ color: "black" }}
        />
        <input
          type="password"
          placeholder="Escriba su contraseña"
          value={form.contraseña}
          onChange={(event) =>
            setForm({ ...form, contraseña: event.target.value })
          }
          style={{ color: "black" }}
        />

        <button>
          <b style={{ color: "black" }}>Ingresar</b>
        </button>
      </form>
    </>
  );
}
