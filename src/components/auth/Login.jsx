import React, { useState } from "react";
import clientAxios from "../../utils/clientAxios";
import { Link, useNavigate } from "react-router-dom";
import joystick from "../../icons/joystick.svg";
import arroba from "../../icons/arroba.svg";
import encrypted from "../../icons/encrypted.svg";
import visibility_off from "../../icons/visibility_off.svg";
import visibility from "../../icons/visibility.svg";
import background_3 from "../../icons/background_3.png";
import background_4 from "../../icons/background_4.png";
import errorIcon from "../../icons/error.svg";
import fondo_futurista_4k from "../../images/fondo_futurista_4k.jpg";
import fondo_futurista_4k_2 from "../../images/fondo_futurista_4k_2.jpg";
import fondo_futurista_4k_3 from "../../images/fondo_futurista_4k_3.jpg";
import { loginWithGoogle } from "../../utils/FireBase";
import "../../css/loginUsuarios.css";

export default function Login() {
  const [form, setForm] = useState({
    usuario_email: "",
    password: "",
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const { idToken } = await loginWithGoogle();

      const response = await clientAxios.post("/usuarios/login", {
        token: idToken,
      });

      if (response.status === 200) {
        localStorage.setItem("TokenStremuGames", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        navigate("/explorar");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 404) {
          setErrorLogin("Cuenta no encontrada. Por favor regístrate primero.");
        } else if (error.response.status === 403) {
          setErrorLogin(error.response.data.message);
        } else {
          setErrorLogin("Error al iniciar sesión con Google");
        }
      } else {
        setErrorLogin("Error al iniciar sesión con Google");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorLogin("");

    if (!form.usuario_email.trim() && !form.password.trim()) {
      return setErrorLogin("Escriba su usuario/email y su contraseña");
    }
    if (!form.usuario_email.trim()) {
      return setErrorLogin("Escriba su usuario/email");
    }
    if (!form.password.trim()) {
      return setErrorLogin("Escriba su contraseña");
    }
    if (form.password.length < 6) {
      return setErrorLogin("Usuario/Email o contraseña incorrectos");
    }

    try {
      const response = await clientAxios.post("/usuarios/login", form);

      if (response.status === 200) {
        localStorage.setItem("TokenStremuGames", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        navigate("/explorar");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorLogin(error.response.data.message);
      } else {
        setErrorLogin("Usuario/Email o contraseña incorrectos");
      }
    }
  };

  return (
    <>
      <section className="container-login-father">
        <img
          src={background_3}
          className="background-login-image"
          alt="Fondo de pantalla del login"
        />
        <img
          src={background_4}
          className="background-login-image-mobile"
          alt="Fondo de pantalla del login"
        />
        <article className="container-login">
          <div className="subcontainer-login">
            <div className="container-login-title">
              <div className="image-joystick">
                <img src={joystick} alt="Joystick" />
              </div>
              <p>STREMU GAMES</p>
            </div>
            <p className="container-login-subtitle">MÁS ALLÁ DE LA</p>
            <p className="container-login-subtitle-2">INTERFAZ.</p>
            <p className="container-login-description">
              Experimenta juegos de alta fidelidad con cero latencia. Únete a la
              red de élite de jugadores que dan forma al futuro del grid.
            </p>
            <div className="carousel">
              <div className="zoom-carousel">
                <img src={fondo_futurista_4k} alt="Fondo 1" />
                <img src={fondo_futurista_4k_2} alt="Fondo 2" />
                <img src={fondo_futurista_4k_3} alt="Fondo 3" />
              </div>
            </div>
          </div>
        </article>
        <section className="login-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-card">
              <header className="login-card__header">
                <h2 className="login-card__title">INICIAR SESIÓN</h2>
                <p className="login-card__subtitle">
                  Ingresa tus credenciales para acceder a Stremu Games.
                </p>
              </header>
              <div className="login-form__content">
                <div className="login-form__field">
                  <label className="login-form__label" htmlFor="usuario_email">
                    USUARIO O EMAIL
                  </label>
                  <div className="login-form__input-wrapper">
                    <img src={arroba} alt="" />
                    <input
                      id="usuario_email"
                      type="text"
                      className="login-form__input"
                      placeholder="alias@stremu.games"
                      value={form.usuario_email}
                      onChange={(e) =>
                        setForm({ ...form, usuario_email: e.target.value })
                      }
                      minLength={6}
                      maxLength={50}
                    />
                  </div>
                </div>

                <div className="login-form__field">
                  <div className="login-form__field_child">
                    <label className="login-form__label" htmlFor="password">
                      CONTRASEÑA
                    </label>

                    <Link
                      className="login-form__forget_my_password"
                      to="/login/recuperar"
                    >
                      Olvidé mi contraseña
                    </Link>
                  </div>
                  <div className="login-form__input-wrapper">
                    <img src={encrypted} alt="Contraseña" />
                    <input
                      id="password"
                      type={mostrarPassword ? "text" : "password"}
                      className="login-form__input"
                      placeholder="Escriba su contraseña"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      minLength={6}
                      maxLength={50}
                    />
                    <button
                      type="button"
                      className="login-form__toggle-password"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                    >
                      <img
                        src={mostrarPassword ? visibility : visibility_off}
                        alt="Toggle Password"
                      />
                    </button>
                  </div>
                </div>

                {errorLogin && (
                  <div className="login-form__error login-form__error--center">
                    <img src={errorIcon} alt="Error" />
                    <p>{errorLogin}</p>
                  </div>
                )}

                <button type="submit" className="login-form__submit">
                  <p>INGRESAR</p>
                </button>

                <div className="login-form__separator">
                  <span></span>o<span></span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="login-form__submit_google"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="24px"
                    height="24px"
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
                  <p>Ingresa con Google</p>
                </button>
              </div>
            </div>
            <footer className="login-footer">
              <p className="login-footer__text">¿Aún no tienes cuenta?</p>
              <a href="/registro" className="login-footer__link">
                Regístrate ahora
              </a>
            </footer>
          </form>
        </section>
      </section>
    </>
  );
}
