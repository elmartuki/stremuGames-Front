import "../css/perfilConfig.css";
import editIcon from "../icons/edit.svg";
import seguridad from "../icons/seguridad.svg";
import compras from "../icons/compras.svg";
import arrowRigth from "../icons/arrowRigth.svg";
import logout from "../icons/logout.svg";
import { useObtenerUsuario } from "../services/obtenerUsuario";
import { useNavigate } from "react-router-dom";

export default function PerfilConfigPage() {
  const navigate = useNavigate();

  const { usuario } = useObtenerUsuario();

  const { nombreUsuario, juegosComprados } = usuario;

  const iniciales = nombreUsuario?.toUpperCase().slice(0, 2);

  return (
    <section className="perfil_config_section">
      <section className="perfil_config_header">
        <div className="perfil_config_header_data">
          <div className="perfil_config_header_imagen">
            <p>{iniciales}</p>
            <img src="" alt="" />
          </div>

          <p>{nombreUsuario}</p>
        </div>

        <div className="perfil_config_header_data_2">
          <div>
            <p>{juegosComprados?.length}</p>
            <p>Juegos</p>
          </div>
          <div>
            <p>12</p>
            <p>Nivel</p>
          </div>
          <div>
            <p>2</p>
            <p>Años</p>
          </div>
        </div>
      </section>

      <section className="perfil_config_body">
        <p className="perfil_config_body_titulo">Gestion de cuenta</p>
        <article
          onClick={() => navigate("/perfil/editar-perfil")}
          className="perfil_config_body_button"
        >
          <img src={editIcon} alt="" />
          <div>
            <p>Editar Perfil</p>
            <p>Cambiar avatar, nombre y bio</p>
          </div>
          <img src={arrowRigth} alt="" />
        </article>

        <article className="perfil_config_body_button">
          <img src={seguridad} alt="" />
          <div>
            <p>Seguridad</p>
            <p>Cambiar contraseña</p>
          </div>
          <img src={arrowRigth} alt="" />
        </article>

        <article className="perfil_config_body_button">
          <img src={compras} alt="" />
          <div>
            <p>Historial de Compras</p>
            <p>Ver tus transacciones recientes</p>
          </div>
          <img src={arrowRigth} alt="" />
        </article>
      </section>

      <section className="perfil_config_footer">
        <button
          onClick={() => {
            localStorage.removeItem("TokenStremuGames");
            navigate("/perfil");
          }}
        >
          <img src={logout} alt="" />
          Cerrar Sesión
        </button>
        <p>Version 0.3.0</p>
      </section>
    </section>
  );
}
