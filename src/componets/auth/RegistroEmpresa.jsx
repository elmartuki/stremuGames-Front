import "../../css/login.css";
import code from "../../icons/code.svg";
import empresa from "../../icons/empresa.svg";
import mail from "../../icons/mail.svg";
import lock from "../../icons/lock.svg";
import lock_repeat from "../../icons/lock-repeat.svg";
import link from "../../icons/link.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import clientAxios from "../../utils/clientAxios";

export default function RegistroEmpresa() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreUsuario: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const handleSubmit = async () => {
    if (
      !form.nombreUsuario ||
      !form.email ||
      !form.password ||
      !form.repeatpassword
    ) {
      return alert("Todos los campos son obligatorios");
    }

    if (form.password !== form.repeatpassword) {
      return alert("Las contraseñas no coinciden");
    }

    const datosParaEnviar = {
      nombreUsuario: form.nombreUsuario,
      email: form.email,
      password: form.password,
      rol: "empresa",
    };

    try {
      const response = await clientAxios.post(
        "/usuarios/register",
        datosParaEnviar
      );
      navigate("/login-empresa");
    } catch (error) {
      
    }
  };

  return (
    <div className="formulario_login">
      <div className="formulario_login_header">
        <div>
          <img src={code} alt="" />
        </div>

        <p>Publica tus juegos</p>
        <p>
          Crea una cuenta para tu estudio de videojuegos para poder distribuir
          tus titulos, gestionarlos y entretener a miles de jugadores.
        </p>
      </div>

      <section>
        <p>Nombre del estudio</p>

        <div className="input_container">
          <img src={empresa} alt="" />
          <input
            onChange={(event) =>
              setForm({ ...form, nombreUsuario: event.target.value })
            }
            type="text"
            placeholder="Ej. PixelGames"
          />
        </div>

        <p>Correo Electronico</p>

        <div className="input_container">
          <img src={mail} alt="" />
          <input
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            type="text"
            placeholder="Ej. pixelgames@gmail.com"
          />
        </div>

        <p>Contraseña</p>

        <div className="input_container">
          <img src={lock} alt="" />
          <input
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
            type="password"
            placeholder="Ingrese una contraseña"
          />
        </div>

        <p>Repetir contraseña</p>

        <div className="input_container">
          <img src={lock_repeat} alt="" />
          <input
            onChange={(event) =>
              setForm({ ...form, repeatpassword: event.target.value })
            }
            type="password"
            placeholder="Repita la contraseña"
          />
        </div>

        <button onClick={() => handleSubmit()}>Registrar Desarrolladora</button>

        <div className="formulario_login_footer">
          <p>¿Ya tienes registrado tu estudio?</p>
          <div>
            <p>Inicia sesión</p>
            <p onClick={() => navigate("/login-empresa")}>
              haciendo click acá <img src={link} alt="" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
