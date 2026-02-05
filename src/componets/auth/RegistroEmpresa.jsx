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
        <>
          <img
            className="background"
            src="https://lh3.googleusercontent.com/rd-gg-dl/AOI_d_9fEUbKRLlzFwH57-iamR7xE8C5j0dghLXDzpxRB2zO2h-6_C1nbzMRu6B7B2tpccLTx3JgPtUv75v-6TUyMfEKD-lfHG_OHNmq7YxTHFkVryVMvTIn1MplFbyZEt6t7Cdy2xfg6831RTvSMHjfL2vDovOUFi4m-S4T53pdq6oU4xSE3_yKd9gJZgAgapl47BBzcbogJxCpSbrtbvJxJxoaOFi3ZbBRBMrgCHu5-_xaIoOAa7r_tHPJM76BBgKZU3mxW_Mh-uTulbNlVU4UkCe_98Ef9VsLGgzdkCGtFPJyrQE-fsSLbA__lXnqnI_ZFAPxhaJzkPO2HYPF7zDOxfY2cnw-NTxrLs5ryI1bsoD7LNifmcw0c40MRt1vqhaIMSTHo_8w5eg5wgKC59CQhDWH3cuIxxZ9si_nlXxcayTGVs7SmfP_7qeMigQS5sLGmk7Z5tKnIh-zHgV8IoGjW3LaiHDjf4o6OZGCjpX0l6pDQ8mXExBY4OGHTntwt1-0rtpgLPvPNpRTj6RI0I9RR4k5sJAcOQ00xzsuBxa3iqhaUqOidW3erqWADvub8XtpqOkqUdN4vRGYPG1GTCT_tKr8gvHdunwUOrlGujoPDwUynFH7g5paBgk7CyCR0Xmd7iJaPiWA4r_Ahxdv_qPg-CSgRiqnueMi9ChFijbpupy_SK57P2S9Ax9lp3Tbr3iZAn-BQmt6-rKqYPFvRRVB0H3l0edxHANXQKDwc9UHHUB9ADFzGT-JHaQ3PgUgfnnpZej6R9qvFAz7l9cUCphkaDkJe8ksCZngS1vPU1RpaD1w6upvxa9oMGBXDkE-YrvsFxELBcyD2ztwqsenWIxaA08fnvegXguUPOhf9HFCU3S5pmjo5Xm4GFI3HFhlJkwvKsyj4QnEkUs3m64vqnE0Na0VkLH2wIQ8tgBMlIU9zEO-M0iPNHY23kV0V2QHl9CXGnS4CQEuNMIefLGy8Rpl1KrCvLofR9szAIpjqcNV4kObirQNVQuggWoC3_8Z3p7E_k_O2Bodiiy6Vb-0xf5i5Gx1jO0oOz9xfKVu2zQT-BVEmD6Loxhtw_bZK3UooGFn81Ln8q279ZdPi3pMnwy5tuUx8BXrPhbUHe3BJKkq2sJ2daTQ4G_KYSHmzAj-P_KGZkbV5dOShG4YBILVXSM3vwJtYie6s9V961pZyqk44tuHVFPhpZ04MGb4B90DHJvbZJ6hvT3NAox2yg5Nr3KV3pT9CtkIGHJri15haz4FHiuYKMIrf1v6sRAZ4j7a8w=s1024-rj"
            alt=""
          />
        </>
      ) : (
        <></>
      )}

      {isDesktop ? (
        <div className="formulario_header">
          <div className="titulos_container">
            <p className="badge_text">Registro de estudios</p>

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
