import { useEffect, useState } from "react";
import { obtenerBiblioteca } from "../../services/obtenerJuegoComprado";
import "../../css/biblioteca.css";
import play_arrow from "../../icons/play_arrow.svg";
import clock from "../../icons/clock.svg";
import reciente_filtro from "../../icons/reciente_filtro.svg";

import lupa from "../../icons/search.svg";
const Biblioteca = () => {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("recientes");

  const categoriasDisponibles = [
    "Todos",
    ...new Set(juegos.flatMap((juego) => juego.categorias || [])),
  ];
  console.log(categoriasDisponibles);

  useEffect(() => {
    const cargarBiblioteca = async () => {
      try {
        const juegosComprados = await obtenerBiblioteca();
        setJuegos(juegosComprados);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la biblioteca");
      } finally {
        setLoading(false);
      }
    };

    cargarBiblioteca();
  }, []);

  if (loading) {
    return <p>Cargando biblioteca...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (juegos.length === 0) {
    return <p>No tenés juegos comprados todavía 🎮</p>;
  }
  const juegosFiltrados = juegos
    .filter((juego) => {
      const coincideCategoria =
        filtroCategoria === "Todos" ||
        juego.categorias?.includes(filtroCategoria);

      const coincideBusqueda = juego.titulo
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      return coincideCategoria && coincideBusqueda;
    })
    .sort((a, b) => {
      if (orden === "recientes") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
  return (
    <section className="container-biblioteca">
      <h1 className="titulo-container">Mi Biblioteca</h1>
      <div className="Container-buscador">
        <div className="buscador-input">
          <img src={lupa} alt="" />
          <input
            type="text"
            placeholder="Buscar en tu colección..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      <div className="Filtrador-categorias">
        {categoriasDisponibles.map((categoria) => (
          <button
            key={categoria}
            className={`btn-categoria ${
              categoria === "Todos" ? "categoria-Todos" : ""
            } ${filtroCategoria === categoria ? "activo" : ""}`}
            onClick={() => setFiltroCategoria(categoria)}
          >
            <div className="categorias">{categoria}</div>
          </button>
        ))}
      </div>
      <section className="container-line">
        <hr />
      </section>
      <section className="cant-juegos">
        <div className="cantidad">
          {juegosFiltrados.length === 1
            ? "1 Juego en total"
            : `${juegosFiltrados.length} Juegos en total`}
        </div>
        <div className="filtro-reciente">
          <img src={reciente_filtro} alt="" />
          <button
            className={orden === "recientes" ? "activo" : ""}
            onclick={() => setOrden("recientes")}
          >
            Recientes
          </button>
        </div>
      </section>
      <div className="biblioteca-grid">
        {juegosFiltrados.map((juego) => (
          <div className="biblioteca-card">
            <div className="imagen">
              <img
                src={juego.imagenPortada}
                alt={juego.titulo}
                className="biblioteca-img"
              />
            </div>
            <div className="box">
              {" "}
              <div className="info">
                <h3 className="titulo">{juego.titulo}</h3>

                <div className="meta">
                  <span className="tag">FPS</span>
                  <span className="tag">125 GB</span>
                </div>
              </div>
              <div className="time">
                <img src={clock} alt="reloj" />
                <p className="estado">Jugado 2h</p>
              </div>
              <div className="button-play">
                <button className="btn-jugar">
                  <img src={play_arrow} alt="" />
                  <p>Jugar</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Biblioteca;
