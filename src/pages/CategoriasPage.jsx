import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categorias } from "../constants/categorias.js";
import "../css/categoriasPage.css";
import search from "../icons/search.svg";
import { useObtenerJuegos } from "../services/obtenerJuegos";

export default function CategoriasPage() {
  const [buscar, setBuscar] = useState("");
  const navigate = useNavigate();
  const { listado = [] } = useObtenerJuegos();

  const articulosFiltrados = categorias.filter((categoria) => {
    return categoria.nombre.toLowerCase().includes(buscar.toLowerCase());
  });

  const listToShow =
    articulosFiltrados.length > 0 ? articulosFiltrados : categorias;

  return (
    <section className="categorias_page_section">
      <section className="categorias_hero">
        <img
          className="background"
          src="https://i.redd.it/these-official-wallpapers-are-incredible-v0-k0tzxophaz1e1.jpg?width=3840&format=pjpg&auto=webp&s=661016530cbcb61c0a0c6c4403c7fa0219277bf5"
          alt=""
        />

        <section className="textos_container">
          <p className="titulo">Descubre tu proxima</p>
          <p className="highligth">Obsesión</p>
          <p className="descripcion">
            Explora miles de títulos organizados por género. Desde la acción más
            trepidante hasta las historias más profundas, encuentra exactamente
            lo que buscas.
          </p>
        </section>
      </section>
      <div className="categorias_page_search">
        <div>
          <img src={search} alt="" />
          <input
            onChange={(event) => setBuscar(event.target.value)}
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

          const colorBase = item.color
            .replace("linear-gradient(to right, ", "")
            .split(",")[0]
            .replace("rgb", "rgba")
            .replace(")", ", 0.15)");

          return (
            <article
              onClick={() => navigate(`/categorias/${item.nombre}`)}
              key={index}
              className="categoria_card"
              style={{
                backgroundImage: `
                  radial-gradient(circle at top right, ${colorBase}, transparent 60%),
                  radial-gradient(circle at bottom left, ${colorBase}, transparent 60%)
                `,
              }}
            >
              <div className="icon_wrapper" style={{ background: item.color }}>
                <img src={item.icon} alt={item.nombre} />
              </div>

              <div className="categoria_textos">
                <h3>{item.nombre}</h3>
                <span>{cantidad} Juegos</span>
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
}
