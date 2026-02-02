import { useEffect, useState } from "react";
import { obtenerBiblioteca } from "../../services/obtenerJuegoComprado";
import "../../css/biblioteca.css";
import play_arrow from "../../icons/play_arrow.svg";
import clock from "../../icons/clock.svg";
import reciente_filtro from "../../icons/reciente_filtro.svg";
import calendar from "../../icons/calendar.svg";

import lupa from "../../icons/search.svg";
const Biblioteca = () => {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [mostrarOrden, setMostrarOrden] = useState(false);
  const opcionesOrden = [
    { value: "recientes", label: "Jugado recientemente" },
    { value: "comprado", label: "Comprado recientemente" },
    { value: "az", label: "Orden alfabético A-Z" },
    { value: "za", label: "Orden alfabético Z-A" },
    { value: "tiempo", label: "Tiempo jugado" },
  ];
  const categoriasDisponibles = [
    "Todos",
    ...new Set(juegos.flatMap((juego) => juego.categorias || [])),
  ];

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
  const comparadores = {
    recientes: (a, b) =>
      new Date(b.lastPlayedAt || 0) - new Date(a.lastPlayedAt || 0),

    comprado: (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),

    az: (a, b) => a.titulo.localeCompare(b.titulo),

    za: (a, b) => b.titulo.localeCompare(a.titulo),

    tiempo: (a, b) => (b.tiempoJugado || 0) - (a.tiempoJugado || 0),
  };
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
    .sort(comparadores[orden] || (() => 0));

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
        <div className="filtro-reciente ordenar-container">
          <img src={reciente_filtro} alt="imagen-filtro" />
          <button
            className="ordenar-btn"
            onClick={() => setMostrarOrden(!mostrarOrden)}
          >
            Ordenar por
          </button>
          {mostrarOrden && (
            <div className="menu-orden">
              {opcionesOrden.map((opcion) => (
                <button
                  key={opcion.value}
                  onClick={() => {
                    setOrden(opcion.value);
                    setMostrarOrden(false);
                  }}
                >
                  {opcion.label}
                </button>
              ))}
            </div>
          )}
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
                <img src={calendar} alt="calendario" />
                <p className="calendar">
                  {juego.createdAt
                    ? new Date(juego.createdAt).toLocaleDateString()
                    : "Fecha no disponible"}
                </p>
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
