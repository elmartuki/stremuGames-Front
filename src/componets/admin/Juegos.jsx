import { useObtenerJuegos } from "../../services/obtenerJuegos";
import "../../css/adminPanelJuegos.css";
import back from "../../icons/back.svg";
import more from "../../icons/more.svg";
import lupa from "../../icons/search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Juegos() {
  const { listado } = useObtenerJuegos();
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const juegosFiltrados = listado?.filter((juego) =>
    juego.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const listToShow = busqueda !== "" ? juegosFiltrados : listado;

  return (
    <section className="listado_de_juegos_container">
      <nav className="navbar-phone">
        <img onClick={() => navigate(-1)} src={back} className="btn-back" />
        <div className="titulo-seccion">
          <p>Catálogo de Juegos</p>
          <p>Explora y gestiona tus títulos.</p>
        </div>
        <img src={more} />
      </nav>

      <div className="listado_de_juegos_search">
        <img src={lupa} alt="Buscar" />
        <input
          onChange={(event) => setBusqueda(event.target.value)}
          type="text"
          placeholder="Buscar juego por nombre..."
          value={busqueda}
        />
      </div>

      <section className="panel-juegos-container">
        <div className="lista-games">
          {listToShow.length > 0 ? (
            listToShow.map((juego) => {
              return (
                <article key={juego.id} className="card-game">
                  <div className="card-game-header">
                    <img
                      src={juego.imagenPortada}
                      alt={juego.titulo}
                      className="card-game-img"
                    />
                    <span className="card-game-badge">
                      {juego.categorias.join(", ")}
                    </span>
                  </div>

                  <div className="card-game-body">
                    <h4 className="card-game-title">{juego.titulo}</h4>

                    <div className="card-game-price">
                      <p>${juego.precioBase}</p>
                    </div>
                  </div>

                  <div className="card-game-footer">
                    <button className="btn-game-view">Detalles</button>
                    <button className="btn-game-delete">Eliminar</button>
                  </div>
                </article>
              );
            })
          ) : (
            <p className="no-games-message">
              No se encontraron juegos disponibles.
            </p>
          )}
        </div>
      </section>
    </section>
  );
}
