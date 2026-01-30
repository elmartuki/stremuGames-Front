import { PerfilEmpresaSkeleton } from "../componets/skeletons/Skeleton";
import "../css/studioPerfil.css";
import mail from "../icons/mail.svg";
import { useObtenerJuegos } from "../services/obtenerJuegos";
import { useObtenerUsuarios } from "../services/obtenerUsuarios";
import { useNavigate, useParams } from "react-router-dom";

export default function PerfilEmpresaPage() {
  const { empresas, cargando } = useObtenerUsuarios();
  const { listado, loading: loadingJuegos } = useObtenerJuegos();
  const { id } = useParams();
  const navigate = useNavigate();

  if (cargando || !empresas || loadingJuegos || !listado) {
    return <PerfilEmpresaSkeleton />;
  }

  const empresaEncontrada = empresas.find((empresa) => empresa._id === id);

  if (!empresaEncontrada) {
    return (
      <section className="perfil_loading">
        <p>Empresa no encontrada.</p>
        <button
          onClick={() => navigate(-1)}
          style={{ marginTop: "10px", padding: "5px 10px" }}
        >
          Volver
        </button>
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

  const juegosDelEstudio = listado.filter((juego) =>
    juegosSubidos.includes(juego._id),
  );

  const destacado =
    juegosDelEstudio && juegosDelEstudio.length > 0
      ? juegosDelEstudio[0]
      : null;

  const catalogo =
    juegosDelEstudio && juegosDelEstudio.length > 0
      ? juegosDelEstudio.slice(1)
      : [];

  return (
    <div className="perfil_container_main">
      <aside className="perfil_sidebar">
        <div className="sidebar_card">
          <div className="perfil_top">
            <div className="perfil_img_box">
              {foto_de_perfil ? (
                <img src={foto_de_perfil} alt={nombreUsuario} />
              ) : (
                <div className="avatar_letra">{iniciales}</div>
              )}
            </div>
          </div>

          <div className="perfil_textos">
            <h1>{nombreUsuario}</h1>
            <span className="subtitulo_rol">Developer</span>

            <div className="stats_flex">
              <div className="stat_box">
                <strong>400</strong>
                <span>Seguidores</span>
              </div>
              <div className="stat_divider"></div>
              <div className="stat_box">
                <strong>{juegosSubidos.length}</strong>
                <span>Juegos</span>
              </div>
            </div>

            <p className="bio_texto">
              "
              {biografia ||
                "Esta desarrolladora aun no escribió una descripcion..."}
              "
            </p>

            <div className="botones_accion">
              <button className="btn_seguir">Seguir</button>
              <button className="btn_contacto">
                <img src={mail} alt="Contacto" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="perfil_contenido">
        {destacado && (
          <section className="seccion_bloque">
            <div className="titulo_borde">Ultimo Lanzamiento</div>
            <div className="banner_destacado">
              <img
                className="background"
                src={destacado.imagenPortada}
                alt={destacado.titulo}
              />
              <div className="overlay_gradiente">
                <span className="badge_nuevo">Nuevo Lanzamiento</span>
                <h2 className="titulo_grande">{destacado.titulo}</h2>
                <p className="desc_destacado">{destacado.descripcion}</p>
                <div className="footer_destacado">
                  <button
                    onClick={() => navigate(`/juego/${destacado._id}`)}
                    className="btn_verde"
                  >
                    Ver Detalles
                  </button>
                  <span className="precio_grande">${destacado.precioBase}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="seccion_bloque">
          <div className="titulo_borde">Catálogo de Juegos</div>
          <div className="flex_catalogo">
            {catalogo.length > 0 ? (
              catalogo.map((juego) => (
                <article className="card_mini" key={juego._id}>
                  <div className="card_img">
                    <img src={juego.imagenPortada} alt={juego.titulo} />
                    <span className="badge_cat">
                      {juego.categorias?.[0] || "Acción"}
                    </span>
                  </div>
                  <div className="card_info">
                    <h3>{juego.titulo}</h3>
                    <span className="cat_texto">
                      {juego.categorias?.join(" • ")}
                    </span>
                    <div className="card_bottom">
                      <span className="precio_mini">
                        {juego.precioBase > 0 ? `$${juego.precioBase}` : "Free"}
                      </span>
                      <button
                        className="btn_carrito"
                        onClick={() => navigate(`/juego/${juego._id}`)}
                      >
                        Ver más
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p
                className="sin_juegos"
                style={{ color: "#999", fontStyle: "italic" }}
              >
                {destacado
                  ? "No hay más juegos en el catálogo."
                  : "Este estudio aún no ha subido juegos."}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
