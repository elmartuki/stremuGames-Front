import { useEffect, useState } from "react";
import { obtenerBiblioteca } from "../../services/obtenerJuegoComprado";
import "../../css/biblioteca.css";
import play_arrow from "../../icons/play_arrow.svg";
import reciente_filtro from "../../icons/reciente_filtro.svg";
import calendar from "../../icons/calendar.svg";
import lupa from "../../icons/search.svg";
import { useNavigate } from "react-router-dom";

const Biblioteca = () => {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [mostrarOrden, setMostrarOrden] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const navigate = useNavigate();

  const juegosPorPagina = 12;

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
      setLoading(true);
      setError("");
      try {
        const juegosComprados = await obtenerBiblioteca();
        setJuegos(juegosComprados);
      } catch (err) {
        console.error(err);
        setError("No se pudo establecer conexión con el servidor de datos.");
      } finally {
        setLoading(false);
      }
    };

    cargarBiblioteca();
  }, [retryTrigger]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [paginaActual]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, filtroCategoria, orden]);

  if (loading)
    return (
      <div className="loading-container">
        <div className="cyber-loader">
          <div className="cyber-glitch"></div>
          <div className="cyber-text">CARGANDO BIBLIOTECA...</div>
          <div className="cyber-bar">
            <div className="cyber-progress"></div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon-wrapper">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 className="error-title">FALLO CRÍTICO DEL SISTEMA</h2>
          <p className="error-message">
            {error || "Protocolo de comunicación interrumpido."}
          </p>
          <button
            className="error-retry-btn"
            onClick={() => setRetryTrigger((prev) => prev + 1)}
          >
            REINICIAR CONEXIÓN
          </button>
        </div>
      </div>
    );

  if (juegos.length === 0)
    return (
      <section className="container-biblioteca">
        <h1 className="titulo-container">Mi Biblioteca</h1>
        <div className="empty-state-container">
          <div className="empty-glitch-wrapper">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
              <path d="M9 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1-1h-4a1 1 0 0 1-1-1z"></path>
            </svg>
          </div>
          <h2 className="empty-title">TU BIBLIOTECA ESTÁ VACÍA</h2>
          <p className="empty-text">
            Aún no tienes juegos en tu colección. Sube de nivel tu inventario y
            encuentra tu próxima gran partida.
          </p>
          <button
            className="empty-cta-btn"
            onClick={() => navigate("/explorar")}
          >
            EXPLORAR CATÁLOGO
          </button>
        </div>
      </section>
    );

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
    .sort(comparadores[orden]);

  const totalPaginas = Math.ceil(juegosFiltrados.length / juegosPorPagina);
  const indiceInicio = (paginaActual - 1) * juegosPorPagina;
  const juegosPaginados = juegosFiltrados.slice(
    indiceInicio,
    indiceInicio + juegosPorPagina,
  );

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
              filtroCategoria === categoria ? "activo" : ""
            }`}
            onClick={() => setFiltroCategoria(categoria)}
          >
            {categoria}
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
        {juegosPaginados.map((juego) => (
          <div key={juego.id} className="biblioteca-card">
            <div className="imagen">
              <img
                src={juego.imagenPortada}
                alt={juego.titulo}
                className="biblioteca-img"
              />
            </div>

            <div className="box">
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

      {totalPaginas > 1 && (
        <div className="paginacion">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
};

export default Biblioteca;