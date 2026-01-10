import "../css/studioPerfil.css";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import { useObtenerJuegos } from "../services/obtenerJuegos";
import { useObtenerUsuarios } from "../services/obtenerUsuarios";
import { useNavigate, useParams } from "react-router-dom";

export default function PerfilEmpresaPage() {
  const { empresas } = useObtenerUsuarios();
  const { listado } = useObtenerJuegos();

  const { id } = useParams();
  const navigate = useNavigate();

  const empresaEncontrada = empresas?.find((empresa) => empresa._id === id);

  if (!empresaEncontrada) {
    return (
      <section className="perfil_studio_loading">
        <p>Cargando datos del estudio...</p>
      </section>
    );
  }

  const {
    foto_de_perfil,
    nombreUsuario,
    juegosSubidos = [],
    biografia = "",
  } = empresaEncontrada;

  const iniciales = nombreUsuario.toUpperCase().slice(0, 2);

  const juegosCompletos = listado?.filter((juego) =>
    juegosSubidos.includes(juego._id)
  );

  return (
    <section className="perfil_studio_container">
      <nav className="navbar-phone">
        <img onClick={() => navigate(-1)} src={back} alt="Volver" />
        <div>
          <p>Perfil del Estudio</p>
          <p>Detalles y catálogo</p>
        </div>
        <img src={more} alt="Opciones" />
      </nav>

      <section className="perfil_studio_header">
        <div
          className="perfil_studio_top"
          style={{ backgroundImage: `url(${foto_de_perfil})` }}
        >
          <div className="perfil_studio_header_imagen">
            {foto_de_perfil !== "" ? (
              <img src={foto_de_perfil} alt={nombreUsuario} />
            ) : (
              <p>{iniciales}</p>
            )}
          </div>
          <div className="perfil_studio_header_button">
            <button className="btn_seguir">Seguir</button>
          </div>
        </div>

        <div className="perfil_studio_header_data">
          <div className="datos">
            <h1>{nombreUsuario}</h1>
            <div className="stats_row">
              <span>400 </span> <span>Seguidores</span>
              <span className="separador">•</span>
              <span>{juegosSubidos.length} </span>
              <span>Juegos</span>
            </div>
          </div>

          <div className="biografia">
            {biografia === "" ? (
              <p>"Esta cuenta todavía no agregó una biografía."</p>
            ) : (
              <p>"{biografia}"</p>
            )}
          </div>
        </div>
      </section>

      <section className="seccion_catalogo">
        <h3 className="titulo_catalogo">Catálogo de Juegos</h3>

        <div className="listado_de_juegos">
          {juegosCompletos.length > 0 ? (
            juegosCompletos.map((juego) => (
              <article className="juego_card_mini" key={juego._id}>
                <div className="juego_card_imagen">
                  <img src={juego.imagenPortada} alt={juego.titulo} />
                  {juego.precioBase === 0 && (
                    <span className="badge_free">Gratis</span>
                  )}
                </div>

                <div className="juego_card_info">
                  <p className="juego_titulo">{juego.titulo}</p>
                  <div className="juego_footer">
                    <span className="juego_categoria">
                      {juego.categorias?.join(", ")}
                    </span>
                    <p className="juego_precio">
                      {juego.precioBase > 0 ? `$${juego.precioBase}` : "Free"}
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="sin_juegos">
              Este estudio aún no tiene juegos publicados.
            </p>
          )}
        </div>
      </section>
    </section>
  );
}
