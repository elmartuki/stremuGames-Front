import { useNavigate } from "react-router-dom";

export default function JuegosDelUsuario({ juegosComprados = [] }) {
  const navigate = useNavigate();

  if (!juegosComprados || juegosComprados.length === 0) {
    return (
      <p
        style={{
          color: "#999",
          fontStyle: "italic",
          width: "100%",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        No hay juegos en esta lista.
      </p>
    );
  }

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <>
      {juegosComprados.map((juego) => (
        <article
          onClick={() => juego.slug && navigate(`/juego/${juego.slug}`)}
          key={juego._id}
          className="juego_tarjeta"
          style={{ cursor: "pointer" }}
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
