import { useState } from "react";
import "../../css/explorarPage.css";
import sell from "../../icons/sell.svg";
import back from "../../icons/back_arrow.svg";
import next from "../../icons/next.svg";
import noImage from "../../icons/noimage.png";
import CarroucelSkeleton from "../skeletons/Skeleton";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import useMediaQuery from "../../utils/changeDesk";
import { useNavigate } from "react-router-dom";

export default function Carroucel() {
  const { listado, loading } = useObtenerJuegos();

  const [previewId, setPreviewId] = useState(null);
  const [indice, setIndice] = useState(0);

  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const elementosPorPagina = 3;

  if (loading || !listado) {
    return <CarroucelSkeleton />;
  }

  const listadoFiltrado = listado.filter((juego) => {
    return juego.precioDescuento < juego.precioBase;
  });

  const handleChange = (dato) => {
    if (dato === "restar") {
      if (indice > 0) setIndice(indice - 1);
    }
    if (dato === "sumar") {
      if (indice + elementosPorPagina < listadoFiltrado.length) {
        setIndice(indice + 1);
      }
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <>
      {isDesktop ? (
        <>
          <button
            className="btn-page"
            onClick={() => handleChange("restar")}
            disabled={indice === 0}
          >
            <img src={back} alt="" />
          </button>

          {listadoFiltrado
            .slice(indice, indice + elementosPorPagina)
            .map((juego) => {
              const {
                titulo,
                imagenPortada,
                imagenBanner,
                desarrolladora,
                precioDescuento,
                precioBase,
                descripcion,
                categorias,
                galeria,
                _id,
              } = juego;

              const porcentaje =
                ((precioBase - precioDescuento) / precioBase) * 100;

              return (
                <article
                  key={_id}
                  className="juego_card large"
                  onClick={() => navigate(`/juego/${_id}`)}
                  onMouseEnter={() => setPreviewId(_id)}
                  onMouseLeave={() => setPreviewId(null)}
                >
                  <div className="juego_card_imagen">
                    <img
                      src={imagenPortada || noImage}
                      alt={titulo}
                      onError={handleImageError}
                    />
                  </div>

                  <button className="descuento">
                    <img src={sell} alt="" />
                    AHORRÁ UN {porcentaje.toFixed(0)} %
                  </button>

                  <div className="juego_card_data">
                    <p className="juego_card_data_titulo">{titulo}</p>

                    <div>
                      <p>${precioBase}</p>
                      <p>${precioDescuento}</p>
                    </div>
                  </div>

                  {previewId === _id && (
                    <div className="preview-game">
                      <div className="image">
                        <img
                          onError={handleImageError}
                          src={imagenBanner || imagenPortada || noImage}
                          alt="Preview"
                        />
                      </div>

                      <div className="datos">
                        <p className="titulo">{titulo}</p>
                        <p className="empresa">{desarrolladora}</p>

                        {categorias && (
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              flexWrap: "wrap",
                              marginBottom: "5px",
                            }}
                          >
                            {categorias.slice(0, 3).map((cat, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: "0.7rem",
                                  background: "#333",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  color: "#ccc",
                                }}
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="precios_container">
                          <div>
                            <div className="tag_descuento">
                              -{porcentaje.toFixed()}%
                            </div>
                            <p>${precioBase}</p>
                            <p>
                              {precioDescuento === 0
                                ? "Gratis"
                                : `$${precioDescuento}`}
                            </p>
                          </div>
                        </div>

                        <p className="descripcion">{descripcion}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

          <button
            className="btn-page"
            onClick={() => handleChange("sumar")}
            disabled={indice + elementosPorPagina >= listadoFiltrado.length}
          >
            <img src={next} alt="" />
          </button>
        </>
      ) : (
        <>
          {listadoFiltrado?.map((juego) => {
            const { titulo, imagenPortada, precioDescuento, precioBase, _id } =
              juego;

            const porcentaje =
              ((precioBase - precioDescuento) / precioBase) * 100;
            return (
              <article
                key={_id}
                className="juego_card"
                onClick={() => navigate(`/juego/${_id}`)}
              >
                <div className="juego_card_imagen">
                  <img
                    src={imagenPortada || noImage}
                    alt={titulo}
                    onError={handleImageError}
                  />
                </div>

                <button className="descuento">
                  <img src={sell} alt="" />
                  AHORRÁ UN {porcentaje.toFixed(0)} %
                </button>

                <div className="juego_card_data">
                  <p className="juego_card_data_titulo">{titulo}</p>

                  <div>
                    <p>${precioBase}</p>
                    <p>${precioDescuento}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </>
      )}
    </>
  );
}
