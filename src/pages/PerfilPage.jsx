import "../css/perfilPage.css";
import grid_green from "../icons/grid_green.svg";
import deseados from "../icons/deseados.svg";
import JuegosDelUsuario from "../componets/perfil/JuegosDelUsuario";
import { useObtenerUsuario } from "../services/obtenerUsuario.js";
import { useCalcularNivel } from "../services/calcularNivel.js";

export default function PerfilPage() {
  const { usuario } = useObtenerUsuario();
  const { nivel, puntos } = useCalcularNivel();

  if (!usuario) {
    return <></>;
  }

  const { nombreUsuario, biografia, foto_de_perfil, juegosComprados } = usuario;

  const iniciales = nombreUsuario?.toUpperCase().slice(0, 2);

  return (
    <section className="perfil_page_section">
      <div className="perfil_page_usuario">
        {foto_de_perfil ? (
          <img src={foto_de_perfil} alt="Avatar" />
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
          <p>{nivel + 1}</p>
        </div>
        <div>
          <p>Nivel</p>
          <p>{puntos} XP</p>
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
