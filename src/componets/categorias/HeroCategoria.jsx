import React, { useEffect, useState } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import { useNavigate, useParams } from "react-router-dom";
import favorito from "../../icons/fav.svg";
import noImage from "../../icons/noimage.png";
import "../../css/categoriaSeleccionada.css";

export default function HeroCategoria() {
  const { listado } = useObtenerJuegos();
  const { id } = useParams();
  const [indiceHero, setIndiceHero] = useState(0);

  const navigate = useNavigate();

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
        prev + 1 >= juegosParaMostrar.length ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(intervalo);
  }, [juegosParaMostrar.length]);

  if (juegosParaMostrar.length === 0) {
    return <div className="loading"></div>;
  }

  const juegoActual = juegosParaMostrar[indiceHero];
  const porcentaje =
    ((juegoActual.precioBase - juegoActual.precioDescuento) /
      juegoActual.precioBase) *
    100;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <article className="hero">
      <div
        className="hero_big"
        onClick={() => {
          navigate(`/juego/${juegoActual._id}`);
        }}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <img
          key={juegoActual._id}
          className="background animate-fade"
          src={juegoActual.imagenPortada || noImage}
          alt={juegoActual.titulo}
          onError={handleImageError}
        />

        <div className="hero_info">
          {porcentaje > 0 && (
            <span className="badge_descuento animate-slideUp">
              -{porcentaje.toFixed()}%
            </span>
          )}

          <h2 key={`title-${juegoActual._id}`} className="animate-slideUp">
            {juegoActual.titulo}
          </h2>

          <p
            key={`dev-${juegoActual._id}`}
            className="juegos_data_empresa animate-slideUp delay-100"
          >
            {juegoActual.desarrolladora}
          </p>

          <div className="hero_precios animate-slideUp delay-100">
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
            <button
              className="btn_comprar"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Comprar Ahora
            </button>
            <button
              className="btn_fav"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
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
            <img
              onError={handleImageError}
              src={juego.imagenPortada || noImage}
              alt="miniatura"
            />

            <div className="thumb_info_overlay"></div>
          </div>
        ))}
      </div>
    </article>
  );
}
