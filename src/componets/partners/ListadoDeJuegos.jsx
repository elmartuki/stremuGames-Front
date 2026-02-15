import "../../css/studioPanel.css";
import editIcon from "../../icons/edit.svg";
import deleteIcon from "../../icons/delete.svg";
import download from "../../icons/download.svg";
import { useNavigate } from "react-router-dom";
import { eliminarUnJuego } from "../../services/eliminarUnJuego.js";
import { useObtenerJuegosParthner } from "../../services/obtenerJuegosParthner.js";

export default function ListadoDeJuegos() {
  const { listado, loading, handleEliminar } = useObtenerJuegosParthner();

  const navigate = useNavigate();

  if (loading) return <></>;

  return (
    <>
      {listado?.map((juego, index) => {
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
                    handleEliminar(_id);
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
