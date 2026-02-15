import { useObtenerJuegos } from "../../services/obtenerJuegos";
import { JuegosDelUsuarioSkeleton } from "../skeletons/Skeleton";
import noImage from "../../icons/noimage.png";
import { useNavigate } from "react-router-dom";

export default function JuegosDelUsuario({ juegosComprados = [] }) {
  const { listado, loading } = useObtenerJuegos();

  const navigate = useNavigate();

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

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <>
      {juegosEncontrados.map((juego) => (
        <article
          onClick={() => navigate(`/juego/${juego.slug}`)}
          key={juego._id}
          className="juego_tarjeta"
        >
          <div>
            <img
              onError={handleImageError}
              src={juego.imagenPortada || noImage}
              alt={juego.titulo}
            />
          </div>
          <div>
            <p>{juego.titulo}</p>
          </div>
        </article>
      ))}
    </>
  );
}
