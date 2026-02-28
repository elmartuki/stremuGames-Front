import lock from "../../icons/lock.svg";
import lock_repeat from "../../icons/lock-repeat.svg";
import visibility from "../../icons/visibility.svg";
import visibility_off from "../../icons/visibility_off.svg";
import link from "../../icons/link.svg";
import mail from "../../icons/mail.svg";
import codeIcon from "../../icons/code.svg";
import background from "../../icons/background_2.png";
import back from "../../icons/back.svg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useMediaQuery from "../../utils/changeDesk";
import clientAxios from "../../utils/clientAxios";
import { useMessageStore } from "../../services/MessageModal.js";

export default function RecuperarPassword() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const showMessage = useMessageStore((state) => state.showMessage);

  const [step, setStep] = useState(1);
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    codigo: "",
    newPassword: "",
    repeatNewPassword: "",
  });

const handleNextStep = async () => {
    if (step === 1) {
      if (!form.email.trim()) {
        showMessage("Por favor, ingresa tu correo electrónico.", "warning");
        return;
      }
      setLoading(true);
      try {
        const response = await clientAxios.post(
          "/usuarios/recuperarContrasenia",
          {
            email: form.email,
          },
        );
        if (response.status === 200) {
          setStep(2);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          showMessage("No existe ninguna cuenta con este correo.", "error");
        } else {
          showMessage("Hubo un error al intentar enviar el correo.", "error");
        }
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      if (!form.codigo.trim()) {
        showMessage("Por favor, ingresa el código de verificación.", "warning");
        return;
      }
      setLoading(true);
      try {
        const response = await clientAxios.post(
          "/usuarios/verificarCodigo",
          {
            email: form.email,
            codigo: form.codigo,
          }
        );
        if (response.status === 200) {
          setStep(3);
        }
      } catch (error) {
        if (error.response) {
          showMessage(error.response.data.message, "error");
        } else {
          showMessage("Error al verificar el código.", "error");
        }
      } finally {
        setLoading(false);
      }
    } else if (step === 3) {
      if (!form.newPassword.trim() || !form.repeatNewPassword.trim()) {
        showMessage("Todos los campos son obligatorios.", "warning");
        return;
      }
      if (form.newPassword !== form.repeatNewPassword) {
        showMessage("Las contraseñas no coinciden.", "error");
        return;
      }
      if (form.newPassword.length < 6) {
        showMessage(
          "La contraseña debe tener al menos 6 caracteres.",
          "warning",
        );
        return;
      }
      setLoading(true);
      try {
        const response = await clientAxios.post(
          "/usuarios/cambiarContrasenia",
          {
            email: form.email,
            codigo: form.codigo,
            nuevaPassword: form.newPassword,
          },
        );
        if (response.status === 200) {
          showMessage("Contraseña actualizada con éxito.", "success");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        if (error.response) {
          showMessage(error.response.data.message, "error");
        } else {
          showMessage("Hubo un error al actualizar la contraseña.", "error");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="formulario_section recovery">
      {isDesktop ? (
        <nav className="back_btn">
          <img onClick={() => navigate(-1)} src={back} alt="" />
        </nav>
      ) : (
        <nav className="back_btn">
          <img onClick={() => navigate(-1)} src={back} alt="" />
        </nav>
      )}

      {isDesktop && (
        <>
          <img className="background" src={background} alt="" />
        </>
      )}

      {isDesktop ? (
        <div className="formulario_header">
          <div className="titulos_container">
            <p className="badge_text">Seguridad</p>
            <p>
              {step === 1 && (
                <>
                  Ingresa tu <span className="green_text">Correo</span>
                </>
              )}
              {step === 2 && (
                <>
                  Ingresa el <span className="green_text">Código</span>
                </>
              )}
              {step === 3 && (
                <>
                  Cambia tu <span className="green_text">Clave</span>
                </>
              )}
            </p>
            <div className="descripcion_container">
              {step === 1 && (
                <p className="descripcion">
                  Ingresa tu correo electrónico para recibir un código de
                  verificación.
                </p>
              )}
              {step === 2 && (
                <p className="descripcion">
                  Ingresa el código de 6 dígitos que enviamos a tu correo.
                </p>
              )}
              {step === 3 && (
                <p className="descripcion">
                  Crea una nueva contraseña segura para proteger tu cuenta.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="formulario_header">
          <div className="icon">
            <img
              src={step === 1 ? mail : step === 2 ? codeIcon : lock}
              alt=""
            />
          </div>
          <div className="titulos_container">
            <p>Seguridad</p>
            <p>
              {step === 1
                ? "Recuperar Cuenta"
                : step === 2
                  ? "Verificación"
                  : "Nueva Contraseña"}
            </p>
          </div>
        </div>
      )}

      <section className="formulario_body">
        {isDesktop && (
          <div className="formulario_header">
            <p>
              {step === 1
                ? "RECUPERAR CUENTA"
                : step === 2
                  ? "VERIFICACIÓN"
                  : "NUEVA CONTRASEÑA"}
            </p>
          </div>
        )}

        {step === 1 && (
          <>
            <p className="labels">Correo Electrónico</p>
            <div className="input_container">
              <img src={mail} alt="" />
              <input
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="ejemplo@correo.com"
                value={form.email}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="labels">Código de Verificación</p>
            <div className="input_container">
              <img src={codeIcon || link} alt="" />
              <input
                className="input_code"
                onChange={(e) => {
                  if (e.target.value.length <= 6) {
                    setForm({ ...form, codigo: e.target.value });
                  }
                }}
                type="text"
                placeholder="Ej. 123456"
                value={form.codigo}
              />
            </div>
            <p className="msg_hint">
              Se envió un código a: <b>{form.email}</b>
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <p className="labels">Nueva Contraseña</p>
            <div className="input_container">
              <img src={lock} alt="" />
              <input
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                type={showNew ? "text" : "password"}
                maxLength="60"
                placeholder="Mínimo 8 car., 1 mayúscula y 1 número"
                value={form.newPassword}
                onPaste={(e) => {
                  e.preventDefault();
                  showMessage(
                    "Por seguridad, no se permite pegar la contraseña. Escríbela manualmente.",
                    "warning",
                  );
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  showMessage(
                    "Por seguridad, no se permite copiar la contraseña.",
                    "warning",
                  );
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  showMessage(
                    "Por seguridad, no se permite arrastrar texto aquí. Escríbela manualmente.",
                    "warning",
                  );
                }}
              />
              <img
                className="toggle_pass"
                onClick={() => setShowNew(!showNew)}
                src={showNew ? visibility_off : visibility}
                alt="toggle"
              />
            </div>

            <p className="labels">Repetir Nueva Contraseña</p>
            <div className="input_container">
              <img src={lock_repeat} alt="" />
              <input
                onChange={(e) =>
                  setForm({ ...form, repeatNewPassword: e.target.value })
                }
                type={showRepeat ? "text" : "password"}
                placeholder="Repita la nueva contraseña"
                maxLength="60"
                value={form.repeatNewPassword}
                onPaste={(e) => {
                  e.preventDefault();
                  showMessage(
                    "Por seguridad, no se permite pegar la contraseña. Escríbela manualmente.",
                    "warning",
                  );
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  showMessage(
                    "Por seguridad, no se permite copiar la contraseña.",
                    "warning",
                  );
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  showMessage(
                    "Por seguridad, no se permite arrastrar texto aquí. Escríbela manualmente.",
                    "warning",
                  );
                }}
              />
              <img
                className="toggle_pass"
                onClick={() => setShowRepeat(!showRepeat)}
                src={showRepeat ? visibility_off : visibility}
                alt="toggle"
              />
            </div>
          </>
        )}

        <button onClick={handleNextStep} disabled={loading}>
          {loading
            ? "Cargando..."
            : step === 1
              ? "Enviar Código"
              : step === 2
                ? "Verificar Código"
                : "Cambiar Contraseña"}
        </button>

        <div className="formulario_login_footer">
          {step > 1 ? (
            <>
              <p>¿Te equivocaste?</p>
              <div>
                <p>Volver al</p>
                <p className="link_green" onClick={() => setStep(step - 1)}>
                  paso anterior
                </p>
              </div>
            </>
          ) : (
            <>
              <p>¿Ya recordaste tu clave?</p>
              <div>
                <p>Volver al</p>
                <p className="link_action" onClick={() => navigate("/")}>
                  inicio <img src={link} alt="" />
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </section>
  );
}
