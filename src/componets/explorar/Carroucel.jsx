import "../../css/explorarPage.css";
import sell from "../../icons/sell.svg";

import { useObtenerJuegosParthner } from "../../services/obtenerJuegosParthner";

export default function Carroucel() {
  const { listado } = useObtenerJuegosParthner();

  const listadoFiltrado = listado.filter((juego) => {
    return juego.precioDescuento < juego.precioBase;
  });

  return (
    <>
      {listadoFiltrado?.map((juego) => {
        console.log(juego);
        const {
          titulo,
          imagenPortada,
          desarrolladora,
          precioDescuento,
          precioBase,
        } = juego;

        const porcentaje = ((precioBase - precioDescuento) / precioBase) * 100;
        return (
          <article className="juego_card">
            <div className="juego_card_imagen">
              <img src={imagenPortada} alt="" />
            </div>
            <div className="juego_card_data">
              <p className="juego_card_data_titulo">{titulo}</p>

              <p className="juego_card_data_empresa">{desarrolladora}</p>

              <div>
                <p>${precioBase}</p>
                <p>${precioDescuento}</p>
              </div>

              <button>
                <img src={sell} alt="" />
                AHORRA UN {porcentaje.toFixed(0)} %
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
}
