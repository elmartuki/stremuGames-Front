import React, { useEffect, useState } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import { useParams } from "react-router-dom";
import favorito from "../../icons/fav.svg";
import "../../css/categoriaSeleccionada.css";

export default function HeroCategoria() {
  const { listado } = useObtenerJuegos();
  const { id } = useParams();
  const [indiceHero, setIndiceHero] = useState(0);

  const juegosParaMostrar = listado
    ? listado
        .filter((juego) => juego.categorias.includes(id))
        .sort((a, b) => b.cantidadVotos - a.cantidadVotos)
        .slice(0, 6)
    : [];

  useEffect(() => {
    if (juegosParaMostrar.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndiceHero((prev) =>
        prev + 1 >= juegosParaMostrar.length ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(intervalo);
  }, [juegosParaMostrar.length]);

  if (juegosParaMostrar.length === 0) {
    return <div className="loading">No hay juegos destacados en {id}...</div>;
  }

  const juegoActual = juegosParaMostrar[indiceHero];
  const porcentaje =
    ((juegoActual.precioBase - juegoActual.precioDescuento) /
      juegoActual.precioBase) *
    100;

  return (
    <article className="hero">
      <div
        className="hero_big"
        style={{
          backgroundImage: `url("${juegoActual.imagenPortada}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",

          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <div className="hero_info">
          {porcentaje > 0 && (
            <span className="badge_descuento">-{porcentaje.toFixed()}%</span>
          )}
          <h2>{juegoActual.titulo}</h2>
          <p className="juegos_data_empresa">{juegoActual.desarrolladora}</p>

          <div className="hero_precios">
            {juegoActual.precioDescuento !== juegoActual.precioBase ? (
              <>
                <span className="precio_actual">
                  ${juegoActual.precioDescuento}
                </span>
                <span className="precio_viejo">${juegoActual.precioBase}</span>
              </>
            ) : (
              <span className="precio_actual">${juegoActual.precioBase}</span>
            )}
          </div>

          <div className="hero_buttons">
            <button className="btn_comprar">Comprar Ahora</button>
            <button className="btn_fav">
              <img src={favorito} alt="Favorito" />
            </button>
          </div>
        </div>
      </div>

      <div className="hero_small">
        {juegosParaMostrar.map((juego, i) => (
          <div
            key={juego._id}
            className={`thumb_container ${i === indiceHero ? "active" : ""}`}
            onClick={() => setIndiceHero(i)}
          >
            <img src={juego.imagenPortada} />
            <div className="thumb_info_overlay"></div>
          </div>
        ))}
      </div>
    </article>
  );
}
