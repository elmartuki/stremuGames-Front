import "../../css/login.css";
import code from "../../icons/code.svg";

export default function RegistroEmpresa() {
  return (
    <div className="formulario_login">
      <div className="formulario_login_header">
        <div>
          <img src={code} alt="" />
        </div>
       
        <p>Publica tus juegos</p>
        <p>
          Crea una cuenta de desarrolladora de videojuegos para distribuir tus
          titulos, gestionarlos y entrentar a miles de jugadores.
        </p>
      </div>

      <section>
        <p>Nombre del estudio</p>

        <div>
          <img src="" alt="" />
          <input type="text" placeholder="ejemplo" />
        </div>

        <p>Nombre del estudio</p>

        <div>
          <img src="" alt="" />
          <input type="text" placeholder="ejemplo" />
        </div>

        <p>Correo electronico</p>

        <div>
          <img src="" alt="" />
          <input type="text" placeholder="ejemplo" />
        </div>

        <p>Contraseña</p>

        <div>
          <img src="" alt="" />
          <input type="text" placeholder="ejemplo" />
        </div>

        <p>Repetir contraseña</p>

        <div>
          <img src="" alt="" />
          <input type="text" placeholder="ejemplo" />
        </div>

        <button>Registrar Desarrolladora</button>

        <p>Tu estudio ya esta registrado?</p>

        <p>Inicia Sesión en el Parthner Portal</p>
      </section>
    </div>
  );
}
