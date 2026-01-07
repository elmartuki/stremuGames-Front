import "../../css/explorarPage.css";
import { useAgregarJuegoAlcarrito } from "../../services/agregarAlCarrito";
import { useObtenerJuegos } from "../../services/obtenerJuegos";

export default function CarroucelLargo({ filtrar }) {
  const { listado } = useObtenerJuegos();

  let juegosParaMostrar = listado ? [...listado] : [];

  if (filtrar === "Populares") {
    juegosParaMostrar.sort((a, b) => b.cantidadVotos - a.cantidadVotos);
  } else if (filtrar === "Recientes") {
    juegosParaMostrar.sort((a, b) => b.createdAt - a.createdAt);
  } else if (filtrar) {
    juegosParaMostrar = juegosParaMostrar.filter((juego) =>
      juego.categorias.includes(filtrar)
    );
  }

  return (
    <>
      {juegosParaMostrar?.map((juego) => {
        const {
          _id,
          titulo,
          imagenPortada,
          desarrolladora,
          precioDescuento,
          precioBase,
        } = juego;

        return (
          <article
            onClick={() => useAgregarJuegoAlcarrito(_id)}
            key={_id}
            className="juego_card large"
          >
            <div className="juego_card_imagen">
              <img src={imagenPortada} alt={titulo} />
            </div>
            <div className="juego_card_data">
              <p className="juego_card_data_titulo">{titulo}</p>
              <p className="juego_card_data_empresa">{desarrolladora}</p>

              {precioDescuento !== precioBase ? (
                <div>
                  <p>${precioDescuento}</p>
                  <p>${precioBase}</p>
                </div>
              ) : (
                <div>
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
