import "../../css/categoriaSeleccionada.css";
import React, { useEffect, useState } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../icons/noimage.png";

export default function Categoria() {
  const [lista, setLista] = useState([]);
  const { listado } = useObtenerJuegos();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!listado.length || !id) return;

    const listadoFiltrado = listado.filter((juego) => {
      return juego.categorias.includes(id);
    });

    setLista(listadoFiltrado);
  }, [listado, id]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <>
      {lista.map((juego) => {
        const {
          titulo,
          imagenPortada,
          desarrolladora,
          descargasTotales,
          precioBase,
          precioDescuento,
          _id,
        } = juego;

        const porcentaje = ((precioBase - precioDescuento) / precioBase) * 100;

        return (
          <article className="juegos" onClick={() => navigate(`/juego/${_id}`)}>
            <div className="juegos_imagen">
              {porcentaje !== 0 ? (
                <>
                  <p className="juegos_imagen_porcentaje">
                    -{porcentaje.toFixed()}%
                  </p>
                </>
              ) : (
                <></>
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
                <>
                  <div className="juegos_data_precio_con_descuento">
                    <p>${precioDescuento}</p>
                    <p>${precioBase}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="juegos_data_precio_sin_descuento">
                    <p>${precioBase}</p>
                  </div>
                </>
              )}
            </div>
          </article>
        );
      })}
    </>
  );
}
