import React, { useEffect, useState } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import favorito from "../../icons/fav.svg";
import { useNavigate } from "react-router-dom";

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

  if (juegosParaMostrar.length === 0)
    return <div className="loading">Cargando Hero...</div>;



  return (
    <>
      <article className="hero">
        <div
          className="hero_big"
          onClick={() =>
            navigate(`/juego/${juegosParaMostrar[indiceHero]?._id}`)
          }
          style={{
            backgroundImage: `url("${juegosParaMostrar[indiceHero]?.imagenPortada}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero_info">
            <h2>{juegosParaMostrar[indiceHero]?.titulo}</h2>
            <p>{juegosParaMostrar[indiceHero]?.descripcion}</p>
            <div>
              <button>Comprar Ahora</button>
              <button>
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
                src={juego.imagenPortada}
                className={i === indiceHero ? "active" : ""}
                onClick={() => setIndiceHero(i)}
              />
            );
          })}
        </div>
      </article>
    </>
  );
}
