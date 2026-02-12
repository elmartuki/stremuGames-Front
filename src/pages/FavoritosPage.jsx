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
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  useEffect(() => {
    const fetchFavoritos = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = juegosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(juegosFiltrados.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [busqueda]);

  if (loading) {
    return (
      <section className="favoritos-page loader-container">
        <div className="spinner"></div>
      </section>
    );
  }

  return (
    <section className="favoritos-page">
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
      )}

      <header className="favoritos-header">
        <h1 className="favoritos-title">
          Lista de <span className="highlight">Deseos</span>
        </h1>

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
        <div className="empty-state">
          <h2>Tu lista de deseos está vacía</h2>
          <p>Explora la tienda para añadir juegos increíbles.</p>
        </div>
      ) : juegosFiltrados.length === 0 ? (
        <div className="empty-state">
          <h2>No se encontraron resultados</h2>
          <p>Prueba con otro término de búsqueda.</p>
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
                    onClick={() => navigate(`/juego/${juego._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="favorito-img-wrapper">
                      <img
                        src={juego.imagenBanner || "/placeholder.jpg"}
                        alt={juego.titulo}
                        loading="lazy"
                      />

                      <div className="card-overlay">
                        <button
                          className="btn_favorito_card btn_activado"
                          onClick={(e) => handleEliminarFavorito(e, juego._id)}
                          disabled={loadingActionId === juego._id}
                          title="Quitar de favoritos"
                        >
                          <img src={close} alt="Favorito" className="activo" />
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
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
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
  );
}
