import React, { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";
import { useAgregarJuegoAlcarrito } from "../services/agregarAlCarrito";
import { useNavigate } from "react-router-dom";
import "../css/favoritos.css";
import carrito from "../icons/carrito.svg";
import close from "../icons/close.svg";
import useMediaQuery from "../utils/changeDesk";

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingActionId, setLoadingActionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [retryTrigger, setRetryTrigger] = useState(0);

  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isExtraLargeScreen = useMediaQuery("(min-width: 1440px)");

  const itemsPerPage = isExtraLargeScreen ? 12 : isLargeScreen ? 10 : 8;

  useEffect(() => {
    const fetchFavoritos = async () => {
      setLoading(true);
      setError("");
      try {
        const userStorage = JSON.parse(localStorage.getItem("usuario"));
        const token = localStorage.getItem("TokenStremuGames");
        const userId = userStorage?.id || userStorage?._id;

        if (userId && token) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const { data } = await clientAxios.get(
            `/usuarios/obtener-favoritos/${userId}`,
            config,
          );

          const juegosValidos = (data.datos || []).filter(
            (juego) => juego !== null,
          );
          setFavoritos(juegosValidos);
        }
      } catch (error) {
        console.error(error);
        setError("No se pudo establecer conexión con el servidor de datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [retryTrigger]);

  const handleEliminarFavorito = async (e, idJuego) => {
    e.stopPropagation();

    if (loadingActionId === idJuego) return;
    setLoadingActionId(idJuego);

    try {
      const token = localStorage.getItem("TokenStremuGames");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await clientAxios.put(`/usuarios/favoritos/${idJuego}`, {}, config);

      setFavoritos((prev) => prev.filter((juego) => juego._id !== idJuego));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleAgregarCarrito = async (e, idJuego) => {
    e.stopPropagation();
    try {
      await useAgregarJuegoAlcarrito(idJuego);
    } catch (error) {
      console.error(error);
    }
  };

  const juegosFiltrados = favoritos.filter((juego) =>
    juego?.titulo?.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const totalPages = Math.ceil(juegosFiltrados.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = juegosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [busqueda]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [favoritos, totalPages, currentPage, itemsPerPage]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="cyber-loader">
          <div className="cyber-glitch"></div>
          <div className="cyber-text">CARGANDO LISTA DE DESEOS...</div>
          <div className="cyber-bar">
            <div className="cyber-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
  }

  return (
    <>
      <div></div>
      {isDesktop ? (
        <></>
      ) : (
        <nav className="navBar-favoritos">
          <p className="titulo_carrito-fav">Mis Favoritos</p>
          <div className="imagen">
            <img src={carrito} alt="" />
            <p>Carrito</p>
          </div>
        </nav>
      )}{" "}
      <section className="favoritos-page">
        <header className="favoritos-header">
          <h1 className="favoritos-title">Lista de Deseos</h1>

          <div className="search-bar-container">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Buscar en mi lista..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
          </div>
        </header>

        {favoritos.length === 0 ? (
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
                <path d="M9 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"></path>
              </svg>
            </div>
            <h2 className="empty-title">LISTA DE DESEOS VACÍA</h2>
            <p className="empty-text">
              Tu base de datos de deseos está vacía. Explora el catálogo para añadir títulos.
            </p>
            <button
              className="empty-cta-btn"
              onClick={() => navigate("/")}
            >
              EXPLORAR CATÁLOGO
            </button>
          </div>
        ) : juegosFiltrados.length === 0 ? (
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
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h2 className="empty-title">DATOS NO ENCONTRADOS</h2>
            <p className="empty-text">
              No hay coincidencias en tus registros para el término de búsqueda actual.
            </p>
          </div>
        ) : (
          <>
            <div className="favoritos-grid">
              {currentItems.map(
                (juego) =>
                  juego && (
                    <article
                      key={juego._id}
                      className="favorito-card"
                      onClick={() => navigate(`/juego/${juego.slug}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="favorito-img-wrapper">
                        <img
                          src={juego.imagenPortada || "/placeholder.jpg"}
                          alt={juego.titulo}
                          loading="lazy"
                        />

                        <div className="card-overlay">
                          <button
                            className="btn_favorito_card btn_activado"
                            onClick={(e) =>
                              handleEliminarFavorito(e, juego._id)
                            }
                            disabled={loadingActionId === juego._id}
                            title="Quitar de favoritos"
                          >
                            <img
                              src={close}
                              alt="Favorito"
                              className="activo"
                            />
                          </button>
                        </div>
                      </div>

                      <div className="favorito-content">
                        <h3 className="favorito-titulo">{juego.titulo}</h3>
                        <div className="favorito-footer">
                          <div className="precios">
                            {juego.precioDescuento < juego.precioBase && (
                              <span className="precio-base">
                                ${juego.precioBase}
                              </span>
                            )}
                            <span className="precio-final">
                              {juego.precioDescuento === 0
                                ? "Gratis"
                                : `$${juego.precioDescuento || juego.precioBase}`}
                            </span>
                          </div>
                          <button
                            className="btn-add-cart"
                            onClick={(e) => handleAgregarCarrito(e, juego._id)}
                            title="Agregar al carrito"
                          >
                            <img src={carrito} alt="" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ),
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt; Anterior
                </button>

                <span className="pagination-info">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente &gt;
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}