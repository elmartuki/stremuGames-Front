import "../../css/login.css";
import code from "../../icons/code.svg";
import empresa from "../../icons/empresa.svg";
import lock from "../../icons/lock.svg";
import link from "../../icons/link.svg";
import { useNavigate } from "react-router-dom";

export default function LoginEmpresa() {
  const navigate = useNavigate();

  return (
    <div className="formulario_login">
      <div className="formulario_login_header">
        <div>
          <img src={code} alt="" />
        </div>

        <p>Gestiona tu estudio</p>
        <p>Accede al panel de gestión</p>
      </div>

      <section>
        <p>Nombre o correo electronico</p>

        <div className="input_container">
          <img src={empresa} alt="" />
          <input type="text" placeholder="Ingrese el usuario/correo" />
        </div>

        <p>Contraseña</p>

        <div className="input_container">
          <img src={lock} alt="" />
          <input type="text" placeholder="Ingrese la contraseña" />
        </div>

        <button>Iniciar Sesión</button>

        <div className="formulario_login_footer">
          <p>¿No tienes registrado tu estudio?</p>
          <div>
            <p>Registrarte</p>
            <p onClick={() => navigate("/registro-empresa")}>
              haciendo click acá <img src={link} alt="" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
