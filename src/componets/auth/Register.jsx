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
              <h2 className="login-card__title">Crear cuenta</h2>
              <p className="login-card__subtitle">
                Registrate para acceder a la plataforma.
              </p>
            </header>

            <div className="login-form__content">
              <div className="login-form__field">
                <label className="login-form__label">Nombre de usuario</label>

                <div className="login-form__input-wrapper">
                  <img src={user} alt="Usuario" />
                  <input
                    type="text"
                    name="nombreUsuario"
                    className="login-form__input"
                    placeholder="Nombre de usuario"
                    value={form.nombreUsuario}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="login-form__field">
                <label className="login-form__label">Correo electrónico</label>

                <div className="login-form__input-wrapper">
                  <img src={user} alt="Email" />
                  <input
                    type="text"
                    name="email"
                    className="login-form__input"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="login-form__field">
                <label className="login-form__label">Contraseña</label>

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
              <div className="login-form__field">
                <label className="login-form__label">
                  Repetí la contraseña
                </label>

                <div className="login-form__input-wrapper">
                  <img src={lock} alt="Contraseña" />

                  <input
                    id="repeatPassword"
                    type={mostrarRepeatPassword ? "text" : "password"}
                    className="login-form__input"
                    placeholder="Repita su contraseña"
                    value={form.repeatPassword}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        repeatPassword: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    className="login-form__toggle-password"
                    onClick={() =>
                      setMostrarRepeatPassword(!mostrarRepeatPassword)
                    }
                    aria-label={
                      mostrarRepeatPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                  >
                    <img
                      src={mostrarRepeatPassword ? visibility : visibility_off}
                      alt={
                        mostrarRepeatPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
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

              {showMessage && (
                <div className="login-form__registeredUser login-form__error--center">
                  <img src="" alt="" />
                  <p>{showMessage}</p>
                </div>
              )}

              <button
                type="submit"
                className="login-form__submit"
                disabled={loading}
              >
                <p>{loading ? "Registrando..." : "Registrarse"}</p>
              </button>
            </div>
          </div>
        </form>

        <footer className="login-footer">
          <p className="login-footer__text">¿Ya tenés cuenta?</p>
          <a href="/login" className="login-footer__link">
            Iniciar sesión
          </a>
        </footer>
      </section>
    </>
  );
}
