import React, { useEffect, useState } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import favoritoIcon from "../../icons/fav.svg";
import { useNavigate } from "react-router-dom";
import noImage from "../../icons/noimage.png";

import clientAxios from "../../utils/clientAxios";
import { useMessageStore } from "../../services/MessageModal";

export default function HeroJuegos({ filtrar }) {
  const { listado } = useObtenerJuegos();
  const [indiceHero, setIndiceHero] = useState(0);

  const [esFavorito, setEsFavorito] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const showMessage = useMessageStore((state) => state.showMessage);
  const navigate = useNavigate();

  const juegosParaMostrar = listado
    ? [...listado].sort((a, b) => b.cantidadVotos - a.cantidadVotos).slice(0, 6)
    : [];

  const juegoActual = juegosParaMostrar[indiceHero];

  useEffect(() => {
    if (juegosParaMostrar.length === 0) return;

    const intervalo = setInterval(() => {
      setIndiceHero((prevIndice) => {
        return prevIndice + 1 >= juegosParaMostrar.length ? 0 : prevIndice + 1;
      });
    }, 4000);

    return () => clearInterval(intervalo);
  }, [juegosParaMostrar.length]);

  useEffect(() => {
    if (!juegoActual) return;

    setEsFavorito(false);

    const verificarEstadoLike = async () => {
      try {
        const { data } = await clientAxios.get(
          `/juegos/favoritos/verificar/${juegoActual._id}`,
        );
        setEsFavorito(data.esFavorito);
      } catch (error) {
        setEsFavorito(false);
      }
    };

    verificarEstadoLike();
  }, [juegoActual]);

  const handleFavorito = async (e) => {
    e.stopPropagation();

    if (loadingAction || !juegoActual) return;
    setLoadingAction(true);

    try {
      const { data } = await clientAxios.put(
        `/juegos/favoritos/${juegoActual._id}`,
      );

      setEsFavorito(data.esFavorito);
      showMessage(data.message, "success");
    } catch (error) {
     
      if (error.response?.status === 401 || error.response?.status === 403) {
        showMessage("Debes iniciar sesión para dar like", "error");
      } else {
        showMessage("Error al gestionar favoritos", "error");
      }
    } finally {
      setLoadingAction(false);
    }
  };

  const handleComprar = (e) => {
    e.stopPropagation();
  };

  if (juegosParaMostrar.length === 0) return <div className="loading"></div>;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <>
      <article className="hero">
        <div
          className="hero_big"
          onClick={() => navigate(`/juego/${juegoActual?.slug}`)}
          style={{
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
          }}
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
              <button onClick={handleComprar}>Comprar Ahora</button>

              <button
                onClick={handleFavorito}
                className={esFavorito ? "btn_favorito_activo" : ""}
                disabled={loadingAction}
              >
                <img
                  src={favoritoIcon}
                  alt=""
                  className={esFavorito ? "activo" : ""}
                  style={{
                    filter: esFavorito ? "var(--filter-rojo)" : "none",
                    transition: "all 0.3s ease",
                  }}
                />
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIndiceHero(i);
                }}
                alt="miniatura"
              />
            );
          })}
        </div>
      </article>
    </>
  );
}
