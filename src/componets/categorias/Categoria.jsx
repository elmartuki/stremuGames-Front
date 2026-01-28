import "../../css/categoriaSeleccionada.css";
import React, { useEffect, useState } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../icons/noimage.png";

import { CategoriaSkeleton } from "../skeletons/Skeleton";

export default function Categoria() {
  const [lista, setLista] = useState([]);

  const { listado, loading } = useObtenerJuegos();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!listado || !listado.length || !id) return;

    const listadoFiltrado = listado.filter((juego) => {
      return juego.categorias.includes(id);
    });

    setLista(listadoFiltrado);
  }, [listado, id]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  if (loading || !listado || listado.length === 0) {
    return <CategoriaSkeleton />;
  }

  if (lista.length === 0 && !loading) {
    return (
      <p style={{ color: "white", padding: "20px" }}>
        No se encontraron juegos en esta categoría.
      </p>
    );
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
        } = juego;

        const porcentaje = ((precioBase - precioDescuento) / precioBase) * 100;

        return (
          <article
            key={_id}
            className="juegos"
            onClick={() => navigate(`/juego/${_id}`)}
          >
            <div className="juegos_imagen">
              {porcentaje > 0 && (
                <p
                  className="juegos_imagen_porcentaje"
                  style={
                    precioDescuento === 0
                      ? { backgroundColor: "#66f61ed9" }
                      : {}
                  }
                >
                  {precioDescuento === 0
                    ? "GRATIS"
                    : `-${porcentaje.toFixed()}%`}
                </p>
              )}

              <img
                src={imagenPortada || noImage}
                alt={titulo}
                onError={handleImageError}
              />
            </div>
            <div className="juegos_data">
              <p>{titulo}</p>
              <p className="juegos_data_empresa">{desarrolladora}</p>

              {precioDescuento !== precioBase ? (
                <div className="juegos_data_precio_con_descuento">
                  {precioDescuento === 0 ? (
                    <>
                      <p>${precioBase}</p>
                      <p style={{ color: "#66f61e" }}>GRATIS</p>
                    </>
                  ) : (
                    <>
                      <p>${precioBase}</p>
                      <p>${precioDescuento}</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="juegos_data_precio_sin_descuento">
                  <p>${precioBase}</p>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </>
  );
}
