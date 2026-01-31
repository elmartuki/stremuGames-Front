import React, { use, useEffect, useState } from "react";
import clientAxios from "../../utils/clientAxios";
import { useNavigate } from "react-router-dom";
import "../../css/loginUsuarios.css";
import back from "../../icons/back.svg";
import joystick from "../../icons/joystick.svg";
import user from "../../icons/user.svg";
import lock from "../../icons/lock.svg";
import visibility_off from "../../icons/visibility_off.svg";
import visibility from "../../icons/visibility.svg";
import errorIcon from "../../icons/error.svg";
import terminal_green from "../../icons/terminal_green.svg";
import arroba from "../../icons/arroba.svg";
import encrypted from "../../icons/encrypted.svg";
import person_green from "../../icons/person_green.svg";

import fondo_futurista_4k from "../../images/fondo_futurista_4k_register.png";
import fondo_futurista_4k_2 from "../../images/fondo_futurista_4k_register_3.png";
import fondo_futurista_4k_register_2 from "../../images/fondo_futurista_4k_register_2.png";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreUsuario: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [showMessage, setShowmessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarRepeatPassword, setMostrarRepeatPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (!success) return;

    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [success, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.nombreUsuario &&
      !form.email &&
      !form.password &&
      !form.repeatPassword
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (!form.nombreUsuario) {
      setError("Ingrese su usuario");
      return;
    }
    if (!form.email) {
      setError("Ingrese su email");
      return;
    }
    if (!form.password) {
      setError("Ingrese su contraseña");
      return;
    }
    if (!form.repeatPassword) {
      setError("Te falto repetir tu contraseña");
      return;
    }
    if (form.password !== form.repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (form.nombreUsuario.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      setError("Email inválido");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const data = {
        nombreUsuario: form.nombreUsuario.trim(),
        email: form.email.trim(),
        password: form.password,
        repeatPassword: form.repeatPassword,
      };
      setLoading(true);

      const response = await clientAxios.post("/usuarios/register", data);

      if (response.status === 201) {
        setShowmessage("Usuario registrado correctamente");
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar el usuario");
    } finally {
      setLoading(false);
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

            <p className="container-login-subtitle">JOIN THE</p>
            <p className="container-login-subtitle-2">GRID.</p>

            <p className="container-login-description">
              Create your account and become part of the next-generation gaming
              platform.
            </p>

            <div className="carousel">
              <div className="zoom-carousel">
                <img src={fondo_futurista_4k} />
                <img src={fondo_futurista_4k_2} />
                <img src={fondo_futurista_4k_register_2} />
              </div>
            </div>
          </div>
        </article>

        <section className="login-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-card">
              <header className="login-card__header">
                <h2 className="login-card__title">CREATE_ACCOUNT</h2>
                <p className="login-card__subtitle">
                  Create your account to access Stremu Games.
                </p>
              </header>

              <div className="login-form__content">
                <div className="login-form__field">
                  <label className="login-form__label">USERNAME</label>
                  <div className="login-form__input-wrapper">
                    <img src={person_green} alt="Usuario" />
                    <input
                      type="text"
                      className="login-form__input"
                      placeholder="Your username"
                      value={form.nombreUsuario}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="login-form__field">
                  <label className="login-form__label">EMAIL</label>
                  <div className="login-form__input-wrapper">
                    <img src={arroba} alt="Email" />
                    <input
                      type="text"
                      className="login-form__input"
                      placeholder="alias@stremu.games"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="login-form__field">
                  <label className="login-form__label">PASSWORD</label>
                  <div className="login-form__input-wrapper">
                    <img src={encrypted} alt="Contraseña" />
                    <input
                      type={mostrarPassword ? "text" : "password"}
                      className="login-form__input"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="login-form__toggle-password"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                    >
                      <img
                        src={mostrarPassword ? visibility : visibility_off}
                      />
                    </button>
                  </div>
                </div>

                <div className="login-form__field">
                  <label className="login-form__label">REPEAT PASSWORD</label>
                  <div className="login-form__input-wrapper">
                    <img src={encrypted} alt="Contraseña" />
                    <input
                      type={mostrarRepeatPassword ? "text" : "password"}
                      className="login-form__input"
                      placeholder="Repeat your password"
                      value={form.repeatPassword}
                      onChange={(e) =>
                        setForm({ ...form, repeatPassword: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="login-form__toggle-password"
                      onClick={() =>
                        setMostrarRepeatPassword(!mostrarRepeatPassword)
                      }
                    >
                      <img
                        src={
                          mostrarRepeatPassword ? visibility : visibility_off
                        }
                      />
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="login-form__error login-form__error--center">
                    <img src={errorIcon} />
                    <p>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="login-form__submit"
                  disabled={loading}
                >
                  <p>{loading ? "CREATING..." : "CREATE ACCOUNT"}</p>
                </button>
              </div>
            </div>
          </form>

          <footer className="login-footer">
            <p className="login-footer__text">Already have an account?</p>
            <a href="/login" className="login-footer__link">
              Sign in
            </a>
          </footer>
        </section>
      </section>
    </>
  );
}
