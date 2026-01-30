import "../css/perfilPage.css";
import grid_green from "../icons/grid_green.svg";
import deseados from "../icons/deseados.svg";
import next from "../icons/next.svg";
import game_green from "../icons/games_green.svg";
import JuegosDelUsuario from "../componets/perfil/JuegosDelUsuario";
import { useObtenerUsuario } from "../services/obtenerUsuario.js";
import { useCalcularNivel } from "../services/calcularNivel.js";
import useMediaQuery from "../utils/changeDesk.js";
import { useParams } from "react-router-dom";
import { PerfilPageSkeleton } from "../componets/skeletons/Skeleton.jsx";

export default function PerfilPage() {
  const { id } = useParams();

  const { usuario, cargando } = useObtenerUsuario(id);
  const { nivel, puntos } = useCalcularNivel(id);

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  if (cargando || !usuario) {
    return <PerfilPageSkeleton />;
  }

  const { nombreUsuario, biografia, foto_de_perfil, juegosComprados } = usuario;

  const iniciales = nombreUsuario?.toUpperCase().slice(0, 2);

  const porcentaje = (puntos % 1000) / 10;

  const proximaMeta = (Math.floor(puntos / 1000) + 1) * 1000;

  return (
    <section className="perfil_page_section">
      <section className="perfil">
        <img
          className="fondo_de_perfil"
          src="https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000071079/d08fc33e504e0bb244d31c38d1dfa15e1b8465c4992d57a989e31f1ed3bbc026"
          alt=""
        />

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
          <div className="nivel_tag">
            <p>Nivel {nivel + 1}</p>
          </div>

          <div className="var_progress_container">
            <div className="datos">
              <span>Progreso</span>{" "}
              <span>
                {puntos} / {proximaMeta}
              </span>
            </div>

            <div className="var_progress">
              <div style={{ width: `${porcentaje}%` }} className="barra"></div>
            </div>
          </div>
        </div>

        <div className="perfil_page_tarjetas">
          <div className="card_links">
            <img src={grid_green} alt="" />
            <div>
              <p>Biblioteca</p>
              <p>Ver todos ({juegosComprados?.length || 0})</p>
            </div>

            {isDesktop ? (
              <img className="next-icon" src={next} alt="" />
            ) : (
              <></>
            )}
          </div>
          <div className="card_links">
            <img src={deseados} alt="" />

            <div>
              <p>Lista de Deseados</p>
              <p>Ver todos (12)</p>
            </div>

            {isDesktop ? (
              <img className="next-icon" src={next} alt="" />
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>

      <section className="listado_juegos_section">
        <p className="listado_juegos_titulo">
          <img src={game_green} alt="" /> Listado de Juegos
        </p>
        <section className="juegos_section">
          <JuegosDelUsuario juegosComprados={juegosComprados} />
        </section>
      </section>
    </section>
  );
}
