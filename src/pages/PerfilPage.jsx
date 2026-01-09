import "../css/perfilPage.css";
import grid_green from "../icons/grid_green.svg";
import deseados from "../icons/deseados.svg";
import JuegosDelUsuario from "../componets/perfil/JuegosDelUsuario";
import { useObtenerUsuario } from "../services/obtenerUsuario.js";

export default function PerfilPage() {
  const { usuario } = useObtenerUsuario();

  if (!usuario) {
    return <></>;
  }

  const { nombreUsuario, biografia, foto_de_perfil, juegosComprados } = usuario;

  const iniciales = nombreUsuario?.toUpperCase().slice(0, 2);

  return (
    <section className="perfil_page_section">
      <div className="perfil_page_usuario">
        {foto_de_perfil ? (
          <img
            src={foto_de_perfil}
            alt="Avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        ) : (
          <p className="iniciales">{iniciales}</p>
        )}
        <p>{nombreUsuario}</p>
        {biografia === "" ? (
          <p>"Este usuario aun no puso una biografia."</p>
        ) : (
          <p>"{biografia}."</p>
        )}
      </div>

      <div className="perfil_page_nivel">
        <div>
          <p>22</p>
        </div>
        <div>
          <p>Nivel</p>
          <p>6.400 XP</p>
        </div>
      </div>

      <div className="perfil_page_tarjetas">
        <div>
          <img src={grid_green} alt="" />
          <p>Biblioteca</p>
          <p>Ver todos ({juegosComprados.length})</p>
        </div>
        <div>
          <img src={deseados} alt="" />

          <p>Lista de Deseados</p>
          <p>Ver todos (12)</p>
        </div>
      </div>

      <section className="listado_juegos_section">
        <p className="listado_juegos_titulo">Listado de Juegos</p>
        <section className="juegos_section">
          <JuegosDelUsuario juegosComprados={juegosComprados} />
        </section>
      </section>
    </section>
  );
}
