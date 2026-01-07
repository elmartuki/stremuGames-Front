import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categorias } from "../constants/categorias.js";
import "../css/categoriasPage.css";
import search from "../icons/search.svg";

import { useObtenerJuegos } from "../services/obtenerJuegos";

export default function CategoriasPage() {
  const [buscar, setBuscar] = useState("");

  const navigate = useNavigate();

  const { listado } = useObtenerJuegos();

  const articulosFiltrados = categorias.filter((categoria) => {
    return categoria.nombre.toLowerCase().includes(buscar.toLowerCase());
  });

  const listToShow =
    articulosFiltrados.length > 0 ? articulosFiltrados : categorias;

  return (
    <section className="categorias_page_section">
      <div className="categorias_page_search">
        <div>
          <img src={search} alt="" />
          <input
            onChange={(event) => {
              setBuscar(event.target.value);
            }}
            type="text"
            placeholder="Buscar categoria..."
          />
        </div>
      </div>

      <section className="categorias_container">
        {listToShow.map((item, index) => {
          const cantidad =
            listado?.filter((juego) => juego.categorias.includes(item.nombre))
              .length || 0;

          return (
            <article
              onClick={() => {
                navigate(`/categorias/${item.nombre}`);
              }}
              key={index}
              className="categoria"
              style={{ background: item.color }}
            >
              <div>
                <p>{item.nombre}</p>
                <p>{cantidad} Juegos</p>
              </div>

              <img src={item.icon} alt="" />
            </article>
          );
        })}
      </section>
    </section>
  );
}
