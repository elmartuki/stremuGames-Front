import { useState } from "react";
import "../../css/explorarPage.css";

import { useObtenerJuegos } from "../../services/obtenerJuegos";
import useMediaQuery from "../../utils/changeDesk";
import back from "../../icons/back_arrow.svg";
import next from "../../icons/next.svg";
import noImage from "../../icons/noimage.png";
import { useNavigate } from "react-router-dom";

import { CarroucelLargoSkeleton } from "../skeletons/Skeleton";

export default function CarroucelLargo({ filtrar }) {
  const { listado, loading } = useObtenerJuegos();

  const [previewId, setPreviewId] = useState(null);
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const elementosPorPagina = 5;

  if (loading || !listado) {
    return <CarroucelLargoSkeleton />;
  }

  let juegosParaMostrar = listado ? [...listado] : [];

  if (filtrar === "Populares") {
    juegosParaMostrar.sort((a, b) => b.cantidadVotos - a.cantidadVotos);
  } else if (filtrar === "Recientes") {
    juegosParaMostrar.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } else if (filtrar) {
    juegosParaMostrar = juegosParaMostrar.filter((juego) =>
      juego.categorias?.includes(filtrar),
    );
  }

  const handleChange = (dato) => {
    if (dato === "restar") {
      if (indice > 0) setIndice(indice - 1);
    }
    if (dato === "sumar") {
      if (indice + elementosPorPagina < juegosParaMostrar.length)
        setIndice(indice + 1);
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
            <img src={back} alt="Anterior" />
          </button>

          {juegosParaMostrar
            .slice(indice, indice + elementosPorPagina)
            .map((juego) => {
              const {
                _id,
                titulo,
                imagenPortada,
                imagenBanner,
                desarrolladora,
                precioDescuento,
                precioBase,
                descripcion,
                categorias,
                galeria,
              } = juego;

              const porcentaje =
                precioBase > 0
                  ? ((precioBase - precioDescuento) / precioBase) * 100
                  : 0;

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
                  <div className="juego_card_data">
                    <p className="juego_card_data_titulo">{titulo}</p>
                    <p className="juego_card_data_empresa">{desarrolladora}</p>

                    {precioDescuento !== precioBase ? (
                      <div className="precios_container">
                        <div className="descuento">
                          -{porcentaje.toFixed()}%
                        </div>
                        <p>${precioBase}</p>
                        <p>
                          {precioDescuento === 0
                            ? "Gratis"
                            : `$${precioDescuento}`}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p>{precioBase === 0 ? "Gratis" : `$${precioBase}`}</p>
                      </div>
                    )}
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
                          {precioDescuento !== precioBase ? (
                            <div>
                              <span className="descuento">
                                - {porcentaje.toFixed(0)}%
                              </span>
                              <p>
                                {precioDescuento === 0
                                  ? "Gratis"
                                  : `$${precioDescuento}`}
                              </p>
                              <p>${precioBase}</p>
                            </div>
                          ) : (
                            <div>
                              <p>
                                {precioBase === 0 ? "Gratis" : `$${precioBase}`}
                              </p>
                            </div>
                          )}
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
            disabled={indice + elementosPorPagina >= juegosParaMostrar.length}
          >
            <img src={next} alt="Siguiente" />
          </button>
        </>
      ) : (
        <>
          {juegosParaMostrar?.map((juego) => {
            const { _id, titulo, imagenPortada, precioDescuento, precioBase } =
              juego;

            const porcentaje =
              precioBase > 0
                ? ((precioBase - precioDescuento) / precioBase) * 100
                : 0;

            return (
              <article
                onClick={() => navigate(`/juego/${_id}`)}
                key={_id}
                className="juego_card large"
              >
                <div className="juego_card_imagen">
                  <img
                    src={imagenPortada || noImage}
                    alt={titulo}
                    onError={handleImageError}
                  />
                </div>
                <div className="juego_card_data">
                  <p className="juego_card_data_titulo">{titulo}</p>

                  {precioDescuento !== precioBase ? (
                    <div>
                      <div className="descuento">-{porcentaje.toFixed()}%</div>
                      <p>${precioBase}</p>
                      <p>
                        {precioDescuento === 0
                          ? "Gratis"
                          : `$${precioDescuento}`}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>{precioBase === 0 ? "Gratis" : `$${precioBase}`}</p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </>
      )}
    </>
  );
}
