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
    if (loading) return;

    const nombre = form.nombreUsuario.trim();
    const email = form.email.trim();
    const password = form.password;
    const repeatpassword = form.repeatpassword;

    if (!nombre || !email || !password || !repeatpassword) {
      return showMessage("Todos los campos son obligatorios", "error");
    }

    if (nombre.length < 3) {
      return showMessage("El nombre debe tener al menos 3 caracteres", "error");
    }
    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!nameRegex.test(nombre)) {
      return showMessage(
        "El nombre solo puede contener letras y números",
        "error",
      );
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return showMessage("Ingresa un correo electrónico válido", "error");
    }

    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passRegex.test(password)) {
      return showMessage(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.",
        "error",
      );
    }

    if (password !== repeatpassword) {
      return showMessage("Las contraseñas no coinciden", "error");
    }

    const datosParaEnviar = {
      nombreUsuario: nombre,
      email: email,
      password: password,
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
              El hogar de tus <span className="highligth">Creaciones</span>
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
            maxLength="25"
            placeholder="Ej. PixelGames"
            value={form.nombreUsuario}
          />
        </div>

        <p>Correo Electrónico</p>

        <div className="input_container">
          <img src={mail} alt="" />
          <input
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            type="text"
            maxLength="60"
            placeholder="Ej. pixelgames@gmail.com"
            value={form.email}
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
            maxLength="60"
            placeholder="Mínimo 8 caracteres, 1 mayúscula y 1 número"
            value={form.password}
          />
          {show ? (
            <img
              onClick={() => setShow(!show)}
              src={visibility_off}
              alt=""
              style={{ cursor: "pointer" }}
            />
          ) : (
            <img
              onClick={() => setShow(!show)}
              src={visibility}
              alt=""
              style={{ cursor: "pointer" }}
            />
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
            maxLength="60"
            value={form.repeatpassword}
          />
          {show2 ? (
            <img
              onClick={() => setShow2(!show2)}
              src={visibility_off}
              alt=""
              style={{ cursor: "pointer" }}
            />
          ) : (
            <img
              onClick={() => setShow2(!show2)}
              src={visibility}
              alt=""
              style={{ cursor: "pointer" }}
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Registrando..." : "Registrar Desarrolladora"}
        </button>

        <div className="formulario_login_footer">
          <p>¿Ya tienes registrado tu estudio?</p>
          <div>
            <p>Inicia sesión</p>
            <p
              onClick={() => !loading && navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              haciendo click acá <img src={link} alt="" />
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
