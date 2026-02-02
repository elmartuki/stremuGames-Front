import "../../css/login.css";
import code from "../../icons/code.svg";
import empresa from "../../icons/empresa.svg";
import mail from "../../icons/mail.svg";
import lock from "../../icons/lock.svg";
import lock_repeat from "../../icons/lock-repeat.svg";
import link from "../../icons/link.svg";
import visibility from "../../icons/visibility.svg";
import visibility_off from "../../icons/visibility_off.svg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import clientAxios from "../../utils/clientAxios";
import { useMessageStore } from "../../services/MessageModal";
import useMediaQuery from "../../utils/changeDesk";

export default function RegistroEmpresa() {
  const navigate = useNavigate();

  const showMessage = useMessageStore((state) => state.showMessage);

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombreUsuario: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const handleSubmit = async () => {
    if (
      !form.nombreUsuario.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.repeatpassword
    ) {
      return showMessage("Todos los campos son obligatorios", "error");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return showMessage("Ingresa un correo electrónico válido", "error");
    }

    if (form.password.length < 6) {
      return showMessage(
        "La contraseña debe tener al menos 6 caracteres",
        "error",
      );
    }

    if (form.password !== form.repeatpassword) {
      return showMessage("Las contraseñas no coinciden", "error");
    }

    const datosParaEnviar = {
      nombreUsuario: form.nombreUsuario.trim(),
      email: form.email.trim(),
      password: form.password,
      rol: "empresa",
    };

    setLoading(true);

    try {
      const response = await clientAxios.post(
        "/usuarios/register",
        datosParaEnviar,
      );

      showMessage(
        response.data.message || "Estudio registrado correctamente",
        "success",
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      let mensajeError = "Hubo un error al registrar";

      if (error.response) {
        mensajeError =
          error.response.data.message ||
          error.response.data.msg ||
          "Error en el servidor";
      } else if (error.request) {
        mensajeError =
          "No se pudo conectar con el servidor. Intente más tarde.";
      }

      showMessage(mensajeError, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formulario_section">
      {isDesktop ? (
        <div className="formulario_header">
          <div className="icon">
            <img src={code} alt="" />
          </div>

          <div className="titulos_container">
            <p>Registro de estudios</p>

            <p>
              El hogar de tus <p className="highligth">Creaciones</p>
            </p>

            <p>
              Únete a la plataforma líder para desarrolladores independientes.
              Distribuye, gestiona y escala tus títulos ante una audiencia
              global.
            </p>
          </div>

          <div className="card_container">
            <div className="card">
              <p>Incrementa </p>
              <p>Tus ganancias</p>
            </div>

            <div className="card">
              <p>Soporte </p>
              <p>24/7</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="formulario_header">
          <div className="icon">
            <img src={code} alt="" />
          </div>

          <div className="titulos_container">
            <p>Publica tus juegos</p>

            <p>Crea una cuenta para tu estudio.</p>
          </div>
        </div>
      )}

      <section className="formulario_body">
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
            type={show ? "text" : "password"}
            placeholder="Ingrese una contraseña"
          />
          {show ? (
            <img onClick={() => setShow(!show)} src={visibility_off} alt="" />
          ) : (
            <img onClick={() => setShow(!show)} src={visibility} alt="" />
          )}
        </div>

        <p>Repetir contraseña</p>

        <div className="input_container">
          <img src={lock_repeat} alt="" />
          <input
            onChange={(event) =>
              setForm({ ...form, repeatpassword: event.target.value })
            }
            type={show2 ? "text" : "password"}
            placeholder="Repita la contraseña"
          />
          {show2 ? (
            <img onClick={() => setShow2(!show2)} src={visibility_off} alt="" />
          ) : (
            <img onClick={() => setShow2(!show2)} src={visibility} alt="" />
          )}
        </div>

        <button onClick={() => handleSubmit()}>Registrar Desarrolladora</button>

        <div className="formulario_login_footer">
          <p>¿Ya tienes registrado tu estudio?</p>
          <div>
            <p>Inicia sesión</p>
            <p onClick={() => navigate("/login")}>
              haciendo click acá <img src={link} alt="" />
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
