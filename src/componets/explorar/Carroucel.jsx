import { useState } from "react";
import "../../css/explorarPage.css";
import sell from "../../icons/sell.svg";
import back from "../../icons/back_arrow.svg";
import next from "../../icons/next.svg";
import noImage from "../../icons/noimage.png";

import { useObtenerJuegos } from "../../services/obtenerJuegos";
import useMediaQuery from "../../utils/changeDesk";
import { useNavigate } from "react-router-dom";

export default function Carroucel() {
  const { listado } = useObtenerJuegos();
  const [indice, setIndice] = useState(0);

  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const elementosPorPagina = 3;

  const listadoFiltrado = listado.filter((juego) => {
    return juego.precioDescuento < juego.precioBase;
  });

  const handleChange = (dato) => {
    if (dato === "restar") {
      if (indice > 0) {
        setIndice(indice - 1);
      }
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
          <button onClick={() => handleChange("restar")}>
            <img src={back} alt="" />
          </button>
          {listadoFiltrado
            .slice(indice, indice + elementosPorPagina)
            .map((juego) => {
              const {
                titulo,
                imagenPortada,
                desarrolladora,
                precioDescuento,
                precioBase,
                _id,
              } = juego;

              const porcentaje =
                ((precioBase - precioDescuento) / precioBase) * 100;
              return (
                <article
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
                  <div className="juego_card_data">
                    <p className="juego_card_data_titulo">{titulo}</p>

                    <p className="juego_card_data_empresa">{desarrolladora}</p>

                    <div>
                      <p>${precioBase}</p>
                      <p>${precioDescuento}</p>
                    </div>

                    <button>
                      <img src={sell} alt="" />
                      AHORRA UN {porcentaje.toFixed(0)} %
                    </button>
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
          {listadoFiltrado?.map((juego) => {
            const {
              titulo,
              imagenPortada,
              desarrolladora,
              precioDescuento,
              precioBase,
            } = juego;

            const porcentaje =
              ((precioBase - precioDescuento) / precioBase) * 100;
            return (
              <article
                className="juego_card "
                onClick={() => navigate(`/juego/${_id}`)}
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

                  <div>
                    <p>${precioBase}</p>
                    <p>${precioDescuento}</p>
                  </div>

                  <button>
                    <img src={sell} alt="" />
                    AHORRA UN {porcentaje.toFixed(0)} %
                  </button>
                </div>
              </article>
            );
          })}
        </>
      )}
    </>
  );
}
