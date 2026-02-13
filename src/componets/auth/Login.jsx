import React from "react";
import clientAxios from "../../utils/clientAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../icons/back.svg";
import joystick from "../../icons/joystick.svg";
import arroba from "../../icons/arroba.svg";
import encrypted from "../../icons/encrypted.svg";
import visibility_off from "../../icons/visibility_off.svg";
import visibility from "../../icons/visibility.svg";
import logoutWhite from "../../icons/logoutWhite.svg";
import errorIcon from "../../icons/error.svg";
import fondo_futurista_4k from "../../images/fondo_futurista_4k.jpg";
import fondo_futurista_4k_2 from "../../images/fondo_futurista_4k_2.jpg";
import fondo_futurista_4k_3 from "../../images/fondo_futurista_4k_3.jpg";

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

        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

        navigate("/explorar");
      }
    } catch (error) {
      setErrorLogin("Usuario/Email o contraseña incorrectos");
    }
  };

  return (
    <>
      <section className="container-login-father">
        <article className="container-login">
          <div className="subcontainer-login">
            <div className="container-login-title">
              <div className="image-joystick">
                <img src={joystick} alt="Joystick" />
              </div>

              <p>STREMU GAMES</p>
            </div>
            <p className="container-login-subtitle">BEYOND THE</p>
            <p className="container-login-subtitle-2">INTERFACE.</p>
            <p className="container-login-description">
              Experience high-fidelity gaming with zero latency. Join the elite
              network of players shaping the future of the grid.
            </p>
            <div className="carousel">
              <div className="zoom-carousel">
                <img src={fondo_futurista_4k} />
                <img src={fondo_futurista_4k_2} />
                <img src={fondo_futurista_4k_3} />
              </div>
            </div>
          </div>
        </article>
        <section className="login-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-card">
              <header className="login-card__header">
                <h2 className="login-card__title">PLAYER_LOGIN</h2>
                <p className="login-card__subtitle">
                  Enter your credentials to access stremu games.
                </p>
              </header>
              <div className="login-form__content">
                <div className="login-form__field">
                  <label className="login-form__label" htmlFor="usuario_email">
                    USURNAME OR EMAIL
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
                      PASSWORD
                    </label>
                    <a className="login-form__forget_my_password" href="#">
                      forgot my password
                    </a>
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
                  <p>START</p>
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
      </section>
    </>
  );
}
