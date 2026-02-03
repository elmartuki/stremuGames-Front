import React, { useEffect, useState, useMemo } from "react"; 
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

  const juegosParaMostrar = useMemo(() => {
    if (!listado) return [];
    let copia = [...listado];

    if (id === "Populares") {
      return copia
        .sort((a, b) => (b.cantidadVotos || 0) - (a.cantidadVotos || 0))
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

  if (juegosParaMostrar.length === 0) {
    return <div className="loading"></div>;
  }

  const juegoActual = juegosParaMostrar[indiceHero];

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
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
            key={`dev-${juegoActual?._id}`}
            className="juegos_data_empresa animate-slideUp delay-100"
          >
            {juegoActual?.desarrolladora}
          </p>

          <p
            key={`desc-${juegoActual?._id}`}
            className="animate-slideUp delay-100 descripcion"
          >
            {juegoActual?.descripcion}
          </p>

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
