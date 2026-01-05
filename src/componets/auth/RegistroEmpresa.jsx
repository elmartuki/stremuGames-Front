import "../../css/login.css";
import code from "../../icons/code.svg";
import empresa from "../../icons/empresa.svg";
import mail from "../../icons/mail.svg";
import lock from "../../icons/lock.svg";
import lock_repeat from "../../icons/lock-repeat.svg";
import link from "../../icons/link.svg";
import { useNavigate } from "react-router-dom";

export default function RegistroEmpresa() {
  const navigate = useNavigate();

  return (
    <div className="formulario_login">
      <div className="formulario_login_header">
        <div>
          <img src={code} alt="" />
        </div>

        <p>Publica tus juegos</p>
        <p>
          Crea una cuenta para tu estudio de videojuegos para poder distribuir
          tus titulos, gestionarlos y entretener a miles de jugadores.
        </p>
      </div>

      <section>
        <p>Nombre del estudio</p>

        <div className="input_container">
          <img src={empresa} alt="" />
          <input type="text" placeholder="Ej. PixelGames" />
        </div>

        <p>Correo Electronico</p>

        <div className="input_container">
          <img src={mail} alt="" />
          <input type="text" placeholder="Ej. pixelgames@gmail.com" />
        </div>

        <p>Contraseña</p>

        <div className="input_container">
          <img src={lock} alt="" />
          <input type="text" placeholder="Ingrese una contraseña" />
        </div>

        <p>Repetir contraseña</p>

        <div className="input_container">
          <img src={lock_repeat} alt="" />
          <input type="text" placeholder="Repita la contraseña" />
        </div>

        <button>Registrar Desarrolladora</button>

        <div className="formulario_login_footer">
          <p>¿Ya tienes registrado tu estudio?</p>
          <div>
            <p>Inicia sesión</p>
            <p onClick={() => navigate("/login-empresa")}>
              haciendo click acá <img src={link} alt="" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
