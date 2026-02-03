import React, { useEffect, useState } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import favorito from "../../icons/fav.svg";
import { useNavigate } from "react-router-dom";
import noImage from "../../icons/noimage.png";

export default function HeroJuegos({ filtrar }) {
  const { listado } = useObtenerJuegos();
  const [indiceHero, setIndiceHero] = useState(0);

  const navigate = useNavigate();

  const juegosParaMostrar = listado
    ? [...listado].sort((a, b) => b.cantidadVotos - a.cantidadVotos).slice(0, 6)
    : [];

  useEffect(() => {
    if (juegosParaMostrar.length === 0) return;

    const intervalo = setInterval(() => {
      setIndiceHero((prevIndice) => {
        return prevIndice + 1 >= juegosParaMostrar.length ? 0 : prevIndice + 1;
      });
    }, 4000);

    return () => clearInterval(intervalo);
  }, [juegosParaMostrar.length]);

  if (juegosParaMostrar.length === 0) return <div className="loading"></div>;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  const juegoActual = juegosParaMostrar[indiceHero];

  return (
    <>
      <article className="hero">
        <div
          className="hero_big"
          onClick={() => navigate(`/juego/${juegoActual?._id}`)}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <img
            key={juegoActual?._id}
            className="background animate-fade"
            src={juegoActual?.imagenBanner || noImage}
            alt={juegoActual?.titulo}
            onError={handleImageError}
          />

          <div className="hero_info">
            <h2 key={`title-${juegoActual?._id}`} className="animate-slideUp">
              {juegoActual?.titulo}
            </h2>
            <p
              key={`desc-${juegoActual?._id}`}
              className="animate-slideUp delay-100"
            >
              {juegoActual?.descripcion}
            </p>

            <div className="btn_container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Comprar Ahora
              </button>
              <button onClick={(e) => {}}>
                <img src={favorito} alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className="hero_small">
          {juegosParaMostrar.map((juego, i) => {
            return (
              <img
                key={juego._id}
                src={juego.imagenPortada || noImage}
                onError={handleImageError}
                className={i === indiceHero ? "active" : ""}
                onClick={() => setIndiceHero(i)}
                alt="miniatura"
              />
            );
          })}
        </div>
      </article>
    </>
  );
}
