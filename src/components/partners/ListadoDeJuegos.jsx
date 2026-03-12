import React, { useState, useEffect } from "react";
import "../../css/studioPanel.css";
import editIcon from "../../icons/edit.svg";
import deleteIcon from "../../icons/delete.svg";
import download from "../../icons/download.svg";
import { useNavigate } from "react-router-dom";
import { useObtenerJuegosParthner } from "../../services/obtenerJuegosParthner.js";

export default function ListadoDeJuegos() {
  const { listado, loading, handleEliminar } = useObtenerJuegosParthner();
  const [juegosLocal, setJuegosLocal] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (listado) {
      setJuegosLocal(listado);
    }
  }, [listado]);

  const onEliminar = async (id) => {
    setJuegosLocal((prev) => prev.filter((juego) => juego._id !== id));
    await handleEliminar(id);
  };

  if (loading && juegosLocal.length === 0) return <></>;

  return (
    <>
      {juegosLocal?.map((juego, index) => {
        const { titulo, imagenPortada, descargasTotales, precioBase, _id } =
          juego;

        return (
          <article key={index} className="juego-card">
            <div className="juego-card_imagen">
              <img src={imagenPortada} alt="" />
            </div>
            <div className="juego-card_data">
              <div>
                <p>{titulo}</p>
              </div>
              <div>
                <p>
                  <img src={download} alt="" />
                  {descargasTotales}
                </p>
              </div>

              <div>
                <div>
                  <p>${precioBase}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate(`/parthner/editar-juego/${_id}`);
                  }}
                >
                  <img src={editIcon} alt="" />
                </button>
                <button
                  onClick={() => {
                    onEliminar(_id);
                  }}
                >
                  <img src={deleteIcon} alt="" />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
