import "../../css/login.css";
import code from "../../icons/code.svg";
import headphone from "../../icons/headset.svg";
import rocket from "../../icons/rocket.svg";
import empresa from "../../icons/empresa.svg";
import mail from "../../icons/mail.svg";
import lock from "../../icons/lock.svg";
import lock_repeat from "../../icons/lock-repeat.svg";
import link from "../../icons/link.svg";
import visibility from "../../icons/visibility.svg";
import visibility_off from "../../icons/visibility_off.svg";
import background from "../../icons/background_2.png";
import background_4 from "../../icons/background_4.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import clientAxios from "../../utils/clientAxios";
import { useMessageStore } from "../../services/MessageModal";
import useMediaQuery from "../../utils/changeDesk";
import { loginWithGoogle } from "../../utils/FireBase";

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

  const handleGoogleRegister = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { user } = await loginWithGoogle();

      const nombreUsuario = user.displayName.toLowerCase().replace(/\s+/g, "");

      const datosParaEnviar = {
        nombreUsuario: nombreUsuario,
        email: user.email,
        foto_de_perfil: user.photoURL,
        rol: "empresa",
      };

      const response = await clientAxios.post(
        "/usuarios/register",
        datosParaEnviar,
      );

      showMessage(
        response.data.message || "Estudio registrado correctamente",
        "success",
      );

      setTimeout(() => {
        localStorage.setItem("TokenStremuGames", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        navigate("/explorar");
      }, 1500);
    } catch (error) {
      console.error(error);
      showMessage("Error al registrarse con Google", "error");
    } finally {
      setLoading(false);
    }
  };

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
        localStorage.setItem("TokenStremuGames", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        navigate("/explorar");
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
        <>
          <img className="background" src={background} alt="" />
        </>
      ) : (
        <>
          <img className="background" src={background_4} alt="" />
        </>
      )}

      {isDesktop ? (
        <div className="formulario_header">
          <div className="titulos_container">
            <p className="badge_text">Registro de estudios</p>

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
              <div className="card_icon">
                <img src={rocket} alt="" />
                <p>Incrementa tus ganancias </p>
              </div>

              <p className="card_text">
                Monetización líder y alcance global inmediato.
              </p>
            </div>

            <div className="card">
              <div className="card_icon">
                <img src={headphone} alt="" />
                <p>Soporte 24/7 </p>
              </div>

              <p className="card_text">
                Asistencia técnica directa en tiempo real.
              </p>
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
        {isDesktop ? (
          <>
            <div className="formulario_header">
              <p>REGISTRO</p>
            </div>
          </>
        ) : (
          <></>
        )}

        <p className="labels">Nombre del estudio</p>

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

        <p className="labels">Correo Electrónico</p>

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

        <p className="labels">Contraseña</p>

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

        <p className="labels">Repetir contraseña</p>

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

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "15px 0",
            gap: "10px",
            color: "#666",
          }}
        >
          <span
            style={{ width: "100%", height: "1px", background: "#ccc" }}
          ></span>
          o
          <span
            style={{ width: "100%", height: "1px", background: "#ccc" }}
          ></span>
        </div>

        <button
          className="btn_google"
          onClick={handleGoogleRegister}
          disabled={loading}
          style={{
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="38px"
            height="38px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Registrarse con Google
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
