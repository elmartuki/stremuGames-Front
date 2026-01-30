import { useObtenerJuegos } from "../../services/obtenerJuegos";
import { JuegosDelUsuarioSkeleton } from "../skeletons/Skeleton";

export default function JuegosDelUsuario({ juegosComprados = [] }) {
  const { listado, loading } = useObtenerJuegos();

  if (loading || !listado) {
    return <JuegosDelUsuarioSkeleton />;
  }

  const juegosEncontrados = listado.filter((juegoGeneral) =>
    juegosComprados.includes(juegoGeneral._id),
  );

  if (juegosEncontrados.length === 0) {
    return (
      <p style={{ color: "#999", fontStyle: "italic", width: "100%" }}>
        Este usuario no tiene juegos comprados.
      </p>
    );
  }

  return (
    <>
      {juegosEncontrados.map((juego) => (
        <article key={juego._id} className="juego_tarjeta">
          <div>
            <img src={juego.imagenPortada} alt={juego.titulo} />
          </div>
          <div>
            <p>{juego.titulo}</p>
            <p className="juego_desarrolladora">{juego.desarrolladora}</p>
          </div>
        </article>
      ))}
    </>
  );
}
