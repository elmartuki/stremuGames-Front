import { useNavigate } from "react-router-dom";
import { categorias } from "../../constants/categorias";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import useMediaQuery from "../../utils/changeDesk";
import back from "../../icons/back_arrow.svg";
import next from "../../icons/next.svg";
import { useState } from "react";

export default function Categorias() {
  const [indice, setIndice] = useState(0);
  const { listado = [] } = useObtenerJuegos();
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const navigate = useNavigate();

  const elementosPorPagina = 5;

  const handleChange = (dato) => {
    if (dato === "restar") {
      if (indice > 0) setIndice(indice - 1);
    }
    if (dato === "sumar") {
      if (indice + elementosPorPagina < categorias.length)
        setIndice(indice + 1);
    }
  };

  const categoriasAMostrar = isDesktop
    ? categorias.slice(indice, indice + elementosPorPagina)
    : categorias.slice(0, 6);

  return (
    <section className="categorias_container_main">
      {isDesktop && (
        <button
          className="nav_btn"
          onClick={() => handleChange("restar")}
          disabled={indice === 0}
        >
          <img src={back} alt="Atrás" />
        </button>
      )}

      <div className="categorias_grid">
        {categoriasAMostrar.map((item, index) => {
          const count = listado.filter((j) =>
            j.categorias.includes(item.nombre)
          ).length;

          // Preparamos el color con opacidad para el efecto glass
          const colorTransparente = item.color
            .replace("linear-gradient(to right, ", "") // Limpiamos si viene como gradient
            .replace(")", "")
            .split(",")[0] // Tomamos el primer color del gradiente original
            .replace("rgb", "rgba")
            .replace(")", ", 0.15)");

          return (
            <article
              key={index}
              className="categoria_card"
              onClick={() => navigate(`/categorias/${item.nombre}`)}
              style={{
                // DOBLE GRADIENTE: Uno en cada esquina opuesta
                backgroundImage: `
                  radial-gradient(circle at top right, ${colorTransparente}, transparent 60%),
                  radial-gradient(circle at bottom left, ${colorTransparente}, transparent 60%)
                `,
              }}
            >
              <div className="icon_wrapper" style={{ background: item.color }}>
                <img src={item.icon} alt={item.nombre} />
              </div>

              <div className="categoria_textos">
                <h3>{item.nombre}</h3>
                <span>{count} Juegos</span>
              </div>
            </article>
          );
        })}
      </div>

      {isDesktop && (
        <button
          className="nav_btn"
          onClick={() => handleChange("sumar")}
          disabled={indice + elementosPorPagina >= categorias.length}
        >
          <img src={next} alt="Siguiente" />
        </button>
      )}
    </section>
  );
}
