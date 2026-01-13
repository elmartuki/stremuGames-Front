import { useNavigate } from "react-router-dom";
import { categorias } from "../../constants/categorias";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import useMediaQuery from "../../utils/changeDesk";
import back from "../../icons/back_arrow.svg";
import next from "../../icons/next.svg";
import { useState } from "react";

export default function Categorias() {
  const [indice, setIndice] = useState(0);

  const { listado } = useObtenerJuegos();

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const elementosPorPagina = 5;

  const handleChange = (dato) => {
    if (dato === "restar") {
      if (indice > 0) {
        setIndice(indice - 1);
      }
    }

    if (dato === "sumar") {
      if (indice + elementosPorPagina < categorias.length) {
        setIndice(indice + 1);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {isDesktop ? (
        <>
          <button onClick={() => handleChange("restar")}>
            <img src={back} alt="" />
          </button>
          {categorias
            .slice(indice, indice + elementosPorPagina)
            .map((item, index) => (
              <article
                onClick={() => {
                  navigate(`/categorias/${item.nombre}`);
                }}
                key={index}
                className="categoria"
                style={{ background: item.color }}
              >
                <img src={item.icon} alt="" />
                <p> {item.nombre}</p>
              </article>
            ))}
          <button onClick={() => handleChange("sumar")}>
            <img src={next} alt="" />
          </button>
        </>
      ) : (
        <>
          {categorias.slice(0, 6).map((item, index) => (
            <article
              onClick={() => {
                navigate(`/categorias/${item.nombre}`);
              }}
              key={index}
              className="categoria"
              style={{ background: item.color }}
            >
              <img src={item.icon} alt="" />
              <p> {item.nombre}</p>
            </article>
          ))}
        </>
      )}
    </>
  );
}
