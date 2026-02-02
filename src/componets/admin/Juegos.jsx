import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import clientAxios from "../../utils/clientAxios";

import "../../css/adminPanelJuegos.css";
import back from "../../icons/back.svg";
import more from "../../icons/more.svg";
import lupa from "../../icons/search.svg";
import noImage from "../../icons/noimage.png";

export default function Juegos() {
  const navigate = useNavigate();
  const { listado, loading } = useObtenerJuegos();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [listaJuegos, setListaJuegos] = useState([]);
  const juegosPorPagina = 10;

  useEffect(() => {
    if (listado && listado.length > 0 && listaJuegos.length === 0) {
      setListaJuegos(listado);
    }
  }, [listado, listaJuegos.length]);

  const juegosFiltrados = listaJuegos.filter((juego) =>
    juego.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const ultimoIndice = paginaActual * juegosPorPagina;
  const primerIndice = ultimoIndice - juegosPorPagina;
  const listToShow = juegosFiltrados.slice(primerIndice, ultimoIndice);
  const totalPaginas = Math.ceil(juegosFiltrados.length / juegosPorPagina);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  const actualizarEstado = async (id) => {
    try {
      const response = await clientAxios.put(`/juegos/estado/${id}`);

      if (response.status === 200 || response.status === 201) {
        setListaJuegos((prev) =>
          prev.map((juego) =>
            juego._id === id ? { ...juego, mostrar: !juego.mostrar } : juego,
          ),
        );
      }
    } catch (error) {
      console.error("Error al actualizar estado del juego:", error);
      alert("No se pudo cambiar la visibilidad del juego");
    }
  };

  if (loading) return <></>;

  return (
    <section className="listado_de_juegos_container">
      <header className="navbar_admin">
        <img
          onClick={() => navigate(-1)}
          src={back}
          className="btn_back"
          alt="Volver"
        />
        <div className="text_container">
          <span className="subtitulo">Gestión</span>
          <h1 className="titulo">Catálogo de Juegos</h1>
        </div>
        <img className="more" src={more} alt="" />
      </header>

      <div className="listado_de_juegos_search">
        <img src={lupa} alt="Buscar" />
        <input
          onChange={manejarBusqueda}
          type="text"
          placeholder="Buscar juego por nombre..."
          value={busqueda}
        />
      </div>

      <section className="panel-juegos-container">
        <div className="lista-games">
          {listToShow.length > 0 ? (
            listToShow.map((juego) => (
              <article key={juego._id} className="card-game">
                <div className="card-game-header">
                  <img
                    src={juego.imagenPortada || noImage}
                    alt={juego.titulo}
                    onError={handleImageError}
                    className="card-game-img"
                  />
                  <span
                    className={`card-game-badge ${juego.mostrar ? "active" : "hidden"}`}
                  >
                    {juego.mostrar ? "Público" : "Oculto"}
                  </span>
                </div>

                <div className="card-game-body">
                  <h4 className="card-game-title">{juego.titulo}</h4>
                  <div className="card-game-price">
                    <p>${juego.precioBase}</p>
                  </div>
                </div>

                <div className="card-game-footer">
                  <button
                    className="btn-game-view"
                    onClick={() => navigate(`/juego/${juego._id}`)}
                  >
                    Ver
                  </button>
                  <button
                    className={`btn-game-delete ${juego.mostrar ? "btn-ocultar" : "btn-mostrar"}`}
                    onClick={() => actualizarEstado(juego._id)}
                  >
                    {juego.mostrar ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="no-games-message">No se encontraron juegos.</p>
          )}
        </div>

        {totalPaginas > 1 && (
          <div className="ver_mas_container" style={{ gap: "20px" }}>
            <button
              onClick={() => setPaginaActual(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="btn_ver_mas"
            >
              Anterior
            </button>
            <span style={{ color: "white", fontWeight: "bold" }}>
              {paginaActual} / {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              className="btn_ver_mas"
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </section>
  );
}
