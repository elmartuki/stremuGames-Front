import React from "react";
import clientAxios from "../../utils/clientAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../icons/back.svg";
import joystick from "../../icons/joystick.svg";
import user from "../../icons/user.svg";
import lock from "../../icons/lock.svg";
import visibility_off from "../../icons/visibility_off.svg";
import visibility from "../../icons/visibility.svg";
import logoutWhite from "../../icons/logoutWhite.svg";
import errorIcon from "../../icons/error.svg";

import "../../css/parthnerPage.css";
import "../../css/loginUsuarios.css";
export default function Login() {
  const [form, setForm] = useState({
    usuario_email: "",
    password: "",
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorLogin("");
    if (!form.usuario_email.trim() && !form.password.trim()) {
      setErrorLogin("Escriba su usuario/email y su contraseña");
      return;
    }

    if (!form.usuario_email.trim()) {
      setErrorLogin("Escriba su usuario/email");
      return;
    }
    if (!form.password.trim()) {
      setErrorLogin("Escriba su contraseña");
      return;
    }

    if (form.password.length < 6) {
      setErrorLogin("Usuario/Email o contraseña incorrectos");
      return;
    }

    try {
      const response = await clientAxios.post("/usuarios/login", form);

      if (response.status === 200) {
        localStorage.setItem("TokenStremuGames", response.data.token);
        navigate("/explorar");
      }
    } catch (error) {
      setErrorLogin("Usuario/Email o contraseña incorrectos");
    }
  };

  return (
    <>
      <nav className="login-navbar">
        <button
          type="button"
          className="login-navbar__back"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <img src={back} alt="Volver" />
        </button>
      </nav>

      <section className="login-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-card">
            <header className="login-card__header">
              <img className="login-card__icon" src={joystick} alt="Joystick" />
              <h2 className="login-card__title">Iniciar sesión</h2>
              <p className="login-card__subtitle">
                Bienvenido de nuevo, accede a tu biblioteca.
              </p>
            </header>
            <div className="login-form__content">
              <div className="login-form__field">
                <label className="login-form__label" htmlFor="usuario_email">
                  Correo electrónico o usuario
                </label>

                <div className="login-form__input-wrapper">
                  <img src={user} alt="" />
                  <input
                    id="usuario_email"
                    type="text"
                    className="login-form__input"
                    placeholder="Escriba su nombre de usuario o email"
                    value={form.usuario_email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        usuario_email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="login-form__field">
                <div className="login-form__field_child">
                  <label className="login-form__label" htmlFor="password">
                    Contraseña
                  </label>
                  <a className="login-form__forget_my_password" href="#">
                    ¿Olvidé mi contraseña?
                  </a>
                </div>

                <div className="login-form__input-wrapper">
                  <img src={lock} alt="Contraseña" />

                  <input
                    id="password"
                    type={mostrarPassword ? "text" : "password"}
                    className="login-form__input"
                    placeholder="Escriba su contraseña"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    className="login-form__toggle-password"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    aria-label={
                      mostrarPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                  >
                    <img
                      src={mostrarPassword ? visibility : visibility_off}
                      alt={
                        mostrarPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    />
                  </button>
                </div>
              </div>
              {errorLogin && (
                <>
                  <div className="login-form__error login-form__error--center">
                    <img src={errorIcon} />
                    <p>{errorLogin}</p>
                  </div>
                </>
              )}

              <button type="submit" className="login-form__submit">
                <p>Iniciar Sesión</p>
                <img src={logoutWhite} alt="Iniciar Sesion" />
              </button>
            </div>
          </div>
        </form>

        <footer className="login-footer">
          <p className="login-footer__text">¿Aún no tienes cuenta?</p>
          <a href="/registro" className="login-footer__link">
            Regístrate ahora
          </a>
        </footer>
      </section>
    </>
  );
}
