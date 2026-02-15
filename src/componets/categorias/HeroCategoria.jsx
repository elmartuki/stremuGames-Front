import React, { useEffect, useState, useMemo } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import { useNavigate, useParams } from "react-router-dom";
import favorito from "../../icons/fav.svg";
import noImage from "../../icons/noimage.png";
import "../../css/categoriaSeleccionada.css";

import clientAxios from "../../utils/clientAxios";
import { useMessageStore } from "../../services/MessageModal";

export default function HeroCategoria() {
  const { listado } = useObtenerJuegos();
  const { id } = useParams();
  const [indiceHero, setIndiceHero] = useState(0);
  const navigate = useNavigate();

  const [esFavorito, setEsFavorito] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const showMessage = useMessageStore((state) => state.showMessage);

  const juegosParaMostrar = useMemo(() => {
    if (!listado) return [];
    let copia = [...listado];

    if (id === "Populares") {
      return copia
        .sort((a, b) => (b.cantidadVotos || 0) - (a.cantidadVotos || 0))
        .slice(0, 6);
    }

    if (id === "Favoritos") {
      return copia
        .sort(
          (a, b) =>
            (b.usuarios_likes?.length || 0) - (a.usuarios_likes?.length || 0),
        )
        .slice(0, 6);
    }

    if (id === "Recientes") {
      return copia
        .reverse()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
    }

    if (id === "ofertas") {
      return copia
        .filter(
          (j) => j.precioDescuento < j.precioBase && j.precioDescuento > 0,
        )
        .slice(0, 6);
    }

    return copia
      .filter((juego) => juego.categorias.includes(id))
      .sort((a, b) => (b.cantidadVotos || 0) - (a.cantidadVotos || 0))
      .slice(0, 6);
  }, [listado, id]);

  useEffect(() => {
    if (juegosParaMostrar.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndiceHero((prev) =>
        prev + 1 >= juegosParaMostrar.length ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(intervalo);
  }, [juegosParaMostrar.length]);

  useEffect(() => {
    setIndiceHero(0);
  }, [id]);

  const juegoActual = juegosParaMostrar[indiceHero];

  useEffect(() => {
    if (!juegoActual) return;

    setEsFavorito(false);

    const verificarEstadoLike = async () => {
      try {
        const token = localStorage.getItem("TokenStremuGames");
        if (!token) return;

        const { data } = await clientAxios.get(
          `/usuarios/favoritos/verificar/${juegoActual._id}`,
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
        `/usuarios/favoritos/${juegoActual._id}`,
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

  const handleComprar = async (e) => {
    e.stopPropagation();

    if (loadingAction || !juegoActual) return;
    setLoadingAction(true);

    try {
      const response = await clientAxios.post(`/carrito/${juegoActual._id}`);
      if (response.status === 200) {
        showMessage(`${response.data.message}.`, "success");
        navigate("/carrito");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "No se pudo agregar al carrito.";
      showMessage(errorMsg, "error");
    } finally {
      setLoadingAction(false);
    }
  };

  if (juegosParaMostrar.length === 0) {
    return <div className="loading"></div>;
  }

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <article className="hero">
      <div
        className="hero_big"
        onClick={() => navigate(`/juego/${juegoActual?.slug}`)}
        style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
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
            className="animate-slideUp delay-100 descripcion"
          >
            {juegoActual?.descripcion}
          </p>

          <div className="hero_buttons">
            <button
              className="btn_comprar"
              disabled={loadingAction}
              onClick={handleComprar}
            >
              {loadingAction ? "Cargando..." : "Comprar Ahora"}
            </button>

            <button
              className={`btn_fav ${esFavorito ? "btn_favorito_activo" : ""}`}
              onClick={handleFavorito}
              disabled={loadingAction}
            >
              <img
                src={favorito}
                alt="Favorito"
                className={esFavorito ? "activo" : ""}
                style={{
                  transition: "all 0.3s ease",
                  filter: esFavorito ? "var(--filter-rojo)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="hero_small">
        {juegosParaMostrar.map((juego, i) => (
          <div
            key={juego._id}
            className={`thumb_container ${i === indiceHero ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setIndiceHero(i);
            }}
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
