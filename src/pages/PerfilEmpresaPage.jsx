import { PerfilEmpresaSkeleton } from "../componets/skeletons/Skeleton";
import "../css/studioPerfil.css";
import mail from "../icons/mail.svg";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import { useObtenerJuegos } from "../services/obtenerJuegos";
import { useObtenerUsuarios } from "../services/obtenerUsuarios";
import { useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "../utils/changeDesk";

export default function PerfilEmpresaPage() {
  const { empresas, cargando } = useObtenerUsuarios();
  const { listado, loading: loadingJuegos } = useObtenerJuegos();
  const { id } = useParams();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 1025px)");

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

  const { foto_de_perfil, nombreUsuario, biografia = "" } = empresaEncontrada;

  const juegosDelEstudio = listado.filter((juego) => {
    const sId =
      typeof juego.studioId === "object"
        ? juego.studioId?.$oid
        : juego.studioId;
    return sId === id;
  });

  const iniciales = nombreUsuario.toUpperCase().slice(0, 2);

  const destacado =
    juegosDelEstudio.reverse().length > 0 ? juegosDelEstudio[0] : null;

  const catalogo = juegosDelEstudio.length > 1 ? juegosDelEstudio.slice(1) : [];

  return (
    <>
      {isDesktop && (
        <nav className="navbar-phone desk">
          <img onClick={() => navigate(-1)} src={back} alt="Volver" />
          <div></div>
          <img src={more} alt="Opciones" />
        </nav>
      )}

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
              <span className="subtitulo_rol">Developer Studio</span>

              <div className="stats_flex">
                <div className="stat_box">
                  <strong>400</strong>
                  <span>Seguidores</span>
                </div>
                <div className="stat_divider"></div>
                <div className="stat_box">
                  <strong>{juegosDelEstudio.length}</strong>
                  <span>Juegos</span>
                </div>
              </div>

              <p className="bio_texto">
                "
                {biografia ||
                  "Este estudio aún no ha redactado su biografía..."}
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
          {destacado ? (
            <>
              <section className="seccion_bloque">
                <div className="titulo_borde">Último Lanzamiento</div>
                <div className="banner_destacado">
                  <img
                    className="background"
                    src={destacado.imagenBanner || destacado.imagenPortada}
                    alt={destacado.titulo}
                  />
                  <div className="overlay_gradiente">
                    <span className="badge_nuevo">Destacado</span>
                    <h2 className="titulo_grande">{destacado.titulo}</h2>
                    <p className="desc_destacado">{destacado.descripcion}</p>
                    <div className="footer_destacado">
                      <button
                        onClick={() => navigate(`/juego/${destacado._id}`)}
                        className="btn_verde"
                      >
                        Ver Detalles
                      </button>
                      <span className="precio_grande">
                        {destacado.precioBase > 0
                          ? `$${destacado.precioBase}`
                          : "Gratis"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="seccion_bloque">
                <div className="titulo_borde">Catálogo de Juegos</div>
                <div className="flex_catalogo">
                  {catalogo.length > 0 ? (
                    catalogo.map((juego) => {
                      const porcentaje =
                        juego.precioBase > 0
                          ? ((juego.precioBase - juego.precioDescuento) /
                              juego.precioBase) *
                            100
                          : 0;

                      return (
                        <article
                          className="card_mini"
                          key={juego._id}
                          onClick={() => navigate(`/juego/${juego._id}`)}
                        >
                          <div className="card_img">
                            <img src={juego.imagenPortada} alt={juego.titulo} />
                            <span className="badge_cat">
                              {juego.categorias?.[0] || "Juego"}
                            </span>
                          </div>
                          <div className="card_info">
                            <h3>{juego.titulo}</h3>
                            <span className="cat_texto">
                              {juego.categorias?.join(" • ")}
                            </span>
                            <div className="card_bottom">
                              {juego.precioDescuento !== juego.precioBase ? (
                                <div className="precios_container">
                                  <span className="descuento">
                                    - {porcentaje.toFixed()}%
                                  </span>
                                  <span className="precio_tachado">
                                    ${juego.precioBase}
                                  </span>
                                  <span className="precio_actual">
                                    ${juego.precioDescuento}
                                  </span>
                                </div>
                              ) : (
                                <div className="precios_container">
                                  <p className="precio_actual">
                                    {juego.precioBase > 0
                                      ? `$${juego.precioBase}`
                                      : "Free"}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })
                  ) : (
                    <p className="sin_juegos">
                      No hay más juegos adicionales en el catálogo.
                    </p>
                  )}
                </div>
              </section>
            </>
          ) : (
            <section className="seccion_bloque">
              <div className="titulo_borde">Catálogo de Juegos</div>
              <p
                className="sin_juegos"
                style={{
                  color: "#999",
                  fontStyle: "italic",
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                Este estudio aún no ha publicado juegos.
              </p>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
