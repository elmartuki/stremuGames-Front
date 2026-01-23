import { useState } from "react";
import "../../css/explorarPage.css";
import { useAgregarJuegoAlcarrito } from "../../services/agregarAlCarrito";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import useMediaQuery from "../../utils/changeDesk";
import back from "../../icons/back_arrow.svg";
import next from "../../icons/next.svg";
import noImage from "../../icons/noimage.png";

import { useNavigate } from "react-router-dom";

export default function CarroucelLargo({ filtrar }) {
  const { listado } = useObtenerJuegos();

  const navigate = useNavigate();

  const [indice, setIndice] = useState(0);

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const elementosPorPagina = 5;

  let juegosParaMostrar = listado ? [...listado] : [];

  if (filtrar === "Populares") {
    juegosParaMostrar.sort((a, b) => b.cantidadVotos - a.cantidadVotos);
  } else if (filtrar === "Recientes") {
    juegosParaMostrar.sort((a, b) => b.createdAt - a.createdAt);
  } else if (filtrar) {
    juegosParaMostrar = juegosParaMostrar.filter((juego) =>
      juego.categorias.includes(filtrar),
    );
  }

  const handleChange = (dato) => {
    if (dato === "restar") {
      if (indice > 0) {
        setIndice(indice - 1);
      }
    }

    if (dato === "sumar") {
      if (indice + elementosPorPagina < juegosParaMostrar.length) {
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
          <button onClick={() => handleChange("restar")}>
            <img src={back} alt="" />
          </button>
          {juegosParaMostrar
            .slice(indice, indice + elementosPorPagina)
            .map((juego) => {
              const {
                _id,
                titulo,
                imagenPortada,
                desarrolladora,
                precioDescuento,
                precioBase,
              } = juego;

              return (
                <article
                  onClick={() => {
                    useAgregarJuegoAlcarrito(_id);
                    navigate(`/juego/${_id}`);
                  }}
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
                    <p className="juego_card_data_empresa">{desarrolladora}</p>

                    {precioDescuento !== precioBase ? (
                      <div>
                        <p>${precioDescuento}</p>
                        <p>${precioBase}</p>
                      </div>
                    ) : (
                      <div>
                        <p>${precioBase}</p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          <button onClick={() => handleChange("sumar")}>
            <img src={next} alt="" />
          </button>
        </>
      ) : (
        <>
          {juegosParaMostrar?.map((juego) => {
            const {
              _id,
              titulo,
              imagenPortada,
              desarrolladora,
              precioDescuento,
              precioBase,
            } = juego;

            return (
              <article
                onClick={() => {
                  useAgregarJuegoAlcarrito(_id);
                  navigate(`/juego/${_id}`);
                }}
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
                  <p className="juego_card_data_empresa">{desarrolladora}</p>

                  {precioDescuento !== precioBase ? (
                    <div>
                      <p>${precioDescuento}</p>
                      <p>${precioBase}</p>
                    </div>
                  ) : (
                    <div>
                      <p>${precioBase}</p>
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
