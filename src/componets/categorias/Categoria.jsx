import "../../css/categoriaSeleccionada.css";
import React, { useMemo } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../icons/noimage.png";
import { CategoriaSkeleton } from "../skeletons/Skeleton";
import useMediaQuery from "../../utils/changeDesk";

export default function Categoria() {
  const { listado, loading } = useObtenerJuegos();
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const navigate = useNavigate();
  const { id } = useParams();

  const lista = useMemo(() => {
    if (!listado || !id) return [];

    let listadoFiltrado = [...listado];

    if (id === "Populares") {
      listadoFiltrado.sort(
        (a, b) => (b.cantidadVotos || 0) - (a.cantidadVotos || 0),
      );
    } else if (id === "Favoritos") {
      listadoFiltrado.sort(
        (a, b) =>
          (b.usuarios_likes?.length || 0) - (a.usuarios_likes?.length || 0),
      );
    } else if (id === "Recientes") {
      listadoFiltrado.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    } else if (id === "ofertas") {
      listadoFiltrado = listadoFiltrado.filter(
        (juego) =>
          juego.precioDescuento < juego.precioBase && juego.precioDescuento > 0,
      );
    } else {
      listadoFiltrado = listadoFiltrado.filter((juego) =>
        juego.categorias.includes(id),
      );
    }

    return listadoFiltrado;
  }, [listado, id]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  if (loading) {
    return <CategoriaSkeleton />;
  }

  if (lista.length === 0) {
    return navigate("*");
  }

  return (
    <>
      {lista.map((juego) => {
        const {
          titulo,
          imagenPortada,
          desarrolladora,
          precioBase,
          precioDescuento,
          _id,
          slug,
        } = juego;

        const porcentaje =
          precioBase > 0
            ? ((precioBase - precioDescuento) / precioBase) * 100
            : 0;

        return (
          <article
            key={_id}
            className="juegos"
            onClick={() => navigate(`/juego/${slug}`)}
          >
            <div className="juegos_imagen">
              <img
                src={imagenPortada || noImage}
                alt={titulo}
                onError={handleImageError}
              />
            </div>
            <div className="juegos_data">
              <p className="titulo">{titulo}</p>

              {isDesktop && (
                <p className="juegos_data_empresa">{desarrolladora}</p>
              )}

              {(() => {
                if (precioDescuento === 0 || precioBase === 0) {
                  return (
                    <div className="juegos_data_precio_con_descuento">
                      <span className="descuento">GRATIS</span>
                      {precioBase > 0 && (
                        <p className="precio-tachado">${precioBase}</p>
                      )}
                    </div>
                  );
                }

                if (precioDescuento < precioBase) {
                  return (
                    <div className="juegos_data_precio_con_descuento">
                      <span className="descuento">
                        -{porcentaje.toFixed()}%
                      </span>
                      <p className="precio-tachado">${precioBase}</p>
                      <p className="precio">${precioDescuento}</p>
                    </div>
                  );
                }

                return (
                  <div className="juegos_data_precio_sin_descuento">
                    <p className="precio">${precioBase}</p>
                  </div>
                );
              })()}
            </div>
          </article>
        );
      })}
    </>
  );
}
