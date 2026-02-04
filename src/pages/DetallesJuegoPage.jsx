import { useState, useEffect } from "react";
import "../css/juegosDetalle.css";

import favIcon from "../icons/fav.svg";
import descIcon from "../icons/desc.svg";
import galeriaIcon from "../icons/galery.svg";
import shop from "../icons/shop.svg";
import noImage from "../icons/noimage.png";

import { useNavigate, useParams } from "react-router-dom";
import { useObtenerUsuario } from "../services/obtenerUsuario";
import { useObtenerUnJuego } from "../services/obtenerUnJuego";
import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "../services/MessageModal";

export default function DetallesJuegoPage() {
  const { id } = useParams();
  const { juego } = useObtenerUnJuego(id);
  const { usuario: desarrollador } = useObtenerUsuario(juego?.studioId);
  const showMessage = useMessageStore((state) => state.showMessage);
  const navigate = useNavigate();

  const [esFavorito, setEsFavorito] = useState(false);
  const [contadorLikes, setContadorLikes] = useState(0);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    if (!juego) return;

    const likes = juego.usuarios_likes || [];
    setContadorLikes(likes.length);

    const verificarEstadoLike = async () => {
      try {
        const { data } = await clientAxios.get(
          `/juegos/favoritos/verificar/${juego._id}`,
        );
        setEsFavorito(data.esFavorito);
      } catch (error) {
        setEsFavorito(false);
      }
    };

    verificarEstadoLike();
  }, [juego]);

  if (!juego || !desarrollador) return <div className="loading_screen"></div>;

  const {
    titulo,
    precioBase,
    precioDescuento,
    descripcion,
    categorias,
    imagenBanner,
    galeria,
  } = juego;

  const { nombreUsuario, foto_de_perfil, _id: studioId } = desarrollador;
  const iniciales = nombreUsuario
    ? nombreUsuario.toUpperCase().slice(0, 2)
    : "NN";

  const descuento =
    precioBase > 0 ? ((precioBase - precioDescuento) / precioBase) * 100 : 0;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  const handleCarrito = async (juegoId) => {
    try {
      const response = await clientAxios.post(`/carrito/${juegoId}`);
      if (response.status === 200) {
        showMessage(`${response.data.message}.`, "success");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "No se pudo agregar al carrito.";
      showMessage(errorMsg, "error");
    }
  };

  const handleFavorito = async () => {
    if (loadingAction) return;
    setLoadingAction(true);

    try {
      const { data } = await clientAxios.put(`/juegos/favoritos/${juego._id}`);

      setEsFavorito(data.esFavorito);
      setContadorLikes(data.cantidadFavoritos);
      showMessage(data.message, "success");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        showMessage("Debes iniciar sesión para dar like", "error");
      } else {
        const msg =
          error.response?.data?.message || "Error al gestionar favoritos";
        showMessage(msg, "error");
      }
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <>
      <section className="detalles_juego_container">
        <section className="juego_header_portada">
          <img
            src={imagenBanner || noImage}
            alt={titulo}
            onError={handleImageError}
          />
        </section>

        <section className="juego_contenido_main">
          <div className="juego_info_card_container">
            <div className="juego_info_card">
              <div className="juego_generos">
                <div className="badge_categoria_container">
                  {categorias?.map((categoria, index) => (
                    <span key={index} className="badge_categoria">
                      {categoria}
                    </span>
                  ))}
                </div>
                <h1 className="juego_titulo">{titulo}</h1>
              </div>

              <div className="juego_precio_container">
                <p className="label_precio">Precio Actual</p>
                <div className="precios_wrapper">
                  {precioBase !== precioDescuento ? (
                    <>
                      <span className="precio_oferta">
                        {precioDescuento === 0
                          ? "Gratis"
                          : `$${precioDescuento}`}
                      </span>
                      <span className="precio_original">${precioBase}</span>
                    </>
                  ) : (
                    <span className="precio_oferta">
                      {precioBase === 0 ? "Gratis" : `$${precioBase}`}
                    </span>
                  )}
                  {descuento > 0 && (
                    <span className="descuento_tag">
                      -{descuento.toFixed()}%
                    </span>
                  )}
                </div>
              </div>

              <div className="juego_acciones">
                <button
                  onClick={() => handleCarrito(juego._id)}
                  className="btn_comprar"
                >
                  Añadir al carrito <img src={shop} alt="" />
                </button>

                <button
                  className={`btn_favorito ${esFavorito ? "btn_activado" : ""}`}
                  onClick={handleFavorito}
                  disabled={loadingAction}
                  title={
                    esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: loadingAction ? 0.6 : 1,
                    cursor: loadingAction ? "wait" : "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <img
                    src={favIcon}
                    alt="Favorito"
                    className={esFavorito ? "activo" : ""}
                  />
                  <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {contadorLikes}
                  </span>
                </button>
              </div>

              <div className="juego_desarrollador">
                <p className="section_subtitle">Desarrollador</p>
                <div
                  className="dev_card"
                  onClick={() => navigate(`/comunidad/estudio/${studioId}`)}
                >
                  <div className="dev_logo">
                    {foto_de_perfil === "" ? (
                      <p className="iniciales">{iniciales}</p>
                    ) : (
                      <img src={foto_de_perfil} alt={nombreUsuario} />
                    )}
                  </div>
                  <div className="dev_info">
                    <p className="dev_nombre">{nombreUsuario}</p>
                  </div>
                </div>
              </div>

              <div className="juego_specs">
                <p className="specs_titulo">Especificaciones Técnicas</p>
                <div className="spec_item">
                  <span className="spec_label">OS</span>
                  <span className="spec_value">Windows 10/11</span>
                </div>
                <div className="spec_item">
                  <span className="spec_label">Procesador</span>
                  <span className="spec_value">
                    Nivel recomendado para {titulo}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mas_info_container">
          <div className="juego_galeria">
            <p className="section_subtitle">
              <img src={galeriaIcon} alt="icon" className="section_icon" />
              Galería
            </p>
            <section className="galeria_flex">
              {galeria?.length === 0 ? (
                <p className="no_data_msg">
                  El desarrollador no agregó imágenes.
                </p>
              ) : (
                galeria?.map((imagen, index) => (
                  <div key={index} className="galeria_item">
                    <img
                      src={imagen || noImage}
                      className="galeria_img"
                      alt=""
                      onError={handleImageError}
                    />
                  </div>
                ))
              )}
            </section>
          </div>

          <div className="juego_descripcion">
            <p className="section_subtitle">
              <img src={descIcon} alt="icon" className="section_icon" />
              Descripción
            </p>
            <div className="descripcion_texto">
              <p>{descripcion}</p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
