import "../css/juegosDetalle.css";
import favIcon from "../icons/fav.svg";
import descIcon from "../icons/desc.svg";
import galeriaIcon from "../icons/galery.svg";
import shop from "../icons/shop.svg";
import noImage from "../icons/noimage.png";
import { useParams } from "react-router-dom";
import { useObtenerUsuario } from "../services/obtenerUsuario";
import { useObtenerUnJuego } from "../services/obtenerUnJuego";

export default function DetallesJuegoPage() {
  const { id } = useParams();

  const { juego } = useObtenerUnJuego(id);

  const { usuario } = useObtenerUsuario(juego?.studioId);

  if (!juego) return <p>No se encontró el juego</p>;

  if (!usuario) return <p>No se encontró la empresa</p>;

  const {
    titulo,
    precioBase,
    precioDescuento,
    descripcion,
    categorias,
    imagenPortada,
    imagenBanner,
    desarrolladora,
  } = juego;

  const { nombreUsuario, foto_de_perfil } = usuario;

  if (!juego) return <p>No se encontró el juego</p>;

  const iniciales = nombreUsuario.toUpperCase().slice(0, 2);

  const descuento = ((precioBase - precioDescuento) / precioBase) * 100;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <>
      <section className="detalles_juego_container">
        <section
          className="juego_header_portada"
          onerror={handleImageError}
          style={{ backgroundImage: `url("${imagenBanner || noImage}")` }}
        ></section>

        <section className="juego_contenido_main">
          <div className="juego_info_card_container">
            <div className="juego_info_card">
              <div className="juego_generos">
                <div className="badge_categoria_container">
                  {categorias?.map((categoria) => {
                    return <span className="badge_categoria">{categoria}</span>;
                  })}
                </div>

                <h1 className="juego_titulo">{titulo}</h1>
              </div>

              <div className="juego_precio_container">
                <p className="label_precio">Precio Actual</p>
                <div className="precios_wrapper">
                  {precioBase !== precioDescuento ? (
                    <>
                      <span className="precio_oferta">${precioDescuento}</span>
                      <span className="precio_original">${precioBase}</span>
                    </>
                  ) : (
                    <>
                      <span className="precio_oferta">${precioBase}</span>
                    </>
                  )}

                  {descuento === 0 ? (
                    <></>
                  ) : (
                    <span className="descuento_tag">
                      -{descuento.toFixed()}%
                    </span>
                  )}
                </div>
              </div>

              <div className="juego_acciones">
                <button className="btn_comprar">
                  Añadir al carrito <img src={shop} alt="" />
                </button>
                <button className="btn_favorito">
                  <img src={favIcon} alt="" />
                </button>
              </div>

              <div className="juego_specs">
                <p className="specs_titulo">Especificaciones Técnicas</p>
                <div className="spec_item">
                  <span className="spec_label">OS</span>
                  <span className="spec_value">Windows 10/11</span>
                </div>
                <div className="spec_item">
                  <span className="spec_label">Procesador</span>
                  <span className="spec_value">AMD Ryzen 5 5600g</span>
                </div>
                <div className="spec_item">
                  <span className="spec_label">Gráficos</span>
                  <span className="spec_value">AMD RX 6600XT 8gb</span>
                </div>
              </div>

              <div className="juego_desarrollador">
                <p className="section_subtitle">Desarrollador</p>
                <div className="dev_card">
                  <div className="dev_logo">
                    {foto_de_perfil === "" ? (
                      <p className="iniciales">{iniciales}</p>
                    ) : (
                      <img src={foto_de_perfil} alt="" />
                    )}
                  </div>
                  <div className="dev_info">
                    <p className="dev_nombre">{nombreUsuario}</p>
                  </div>
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
              <div className="galeria_item">
                <img src="" className="galeria_img" />
              </div>
              <div className="galeria_item">
                <img src="" className="galeria_img" />
              </div>
              <div className="galeria_item">
                <img src="" className="galeria_img" />
              </div>
              <div className="galeria_item">
                <img src="" className="galeria_img" />
              </div>
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
