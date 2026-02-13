import React, { useEffect, useState } from "react";
import clientAxios from "../../utils/clientAxios";
import { useNavigate } from "react-router-dom";
import "../../css/loginUsuarios.css";
import joystick from "../../icons/joystick.svg";
import visibility_off from "../../icons/visibility_off.svg";
import visibility from "../../icons/visibility.svg";
import errorIcon from "../../icons/error.svg";
import arroba from "../../icons/arroba.svg";
import background_3 from "../../icons/background_3.png";

import encrypted from "../../icons/encrypted.svg";
import person_green from "../../icons/person_green.svg";
import { loginWithGoogle } from "../../utils/FireBase";

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

  const handleGoogleRegister = async () => {
    setError("");
    try {
      const { user } = await loginWithGoogle();

      const nombreUsuario = user.displayName
        ? user.displayName.toLowerCase().replace(/\s+/g, "")
        : user.email.split("@")[0];

      const datosParaEnviar = {
        nombreUsuario: nombreUsuario,
        email: user.email,
        foto_de_perfil: user.photoURL,
        googleLogin: true,
      };

      setLoading(true);

      const response = await clientAxios.post(
        "/usuarios/register",
        datosParaEnviar,
      );

      if (response.status === 201 || response.status === 200) {
        if (response.data.token) {
          localStorage.setItem("TokenStremuGames", response.data.token);
          localStorage.setItem(
            "usuario",
            JSON.stringify(response.data.usuario),
          );
          navigate("/explorar");
        } else {
          setShowmessage("Cuenta creada con Google exitosamente");
          setSuccess(true);
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error al registrarse con Google. Intente nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

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
        <img
          src={background_3}
          className="background-login-image"
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

            <p className="container-login-subtitle">JOIN THE</p>
            <p className="container-login-subtitle-2">GRID.</p>

            <p className="container-login-description">
              Create your account and become part of the next-generation gaming
              platform.
            </p>

            <div className="carousel">
              <div className="zoom-carousel">
                <img src={fondo_futurista_4k} alt="bg1" />
                <img src={fondo_futurista_4k_2} alt="bg2" />
                <img src={fondo_futurista_4k_register_2} alt="bg3" />
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
                      name="nombreUsuario"
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
                      name="email"
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
                        alt="toggle"
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
                        alt="toggle"
                      />
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="login-form__error login-form__error--center">
                    <img src={errorIcon} alt="error" />
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

                <div className="login-form__separator">
                  <span></span>o<span></span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  className="login-form__submit_google"
                  disabled={loading}
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
                  <p>Regístrate con Google</p>
                </button>
              </div>
            </div>
            <footer className="login-footer">
              <p className="login-footer__text">Already have an account?</p>
              <a href="/login" className="login-footer__link">
                Sign in
              </a>
            </footer>
          </form>
        </section>
      </section>
    </>
  );
}
