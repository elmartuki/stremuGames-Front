import "../css/categoriaSeleccionada.css";
import search from "../icons/search.svg";
import Categoria from "../componets/categorias/Categoria";

export default function CategoriaSeleccionadaPage() {
  return (
    <section className="categoria_seleccionada_page">
      <div className="categoria_seleccionada_search">
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

      <section className="juegos_section">
        <Categoria />
      </section>
    </section>
  );
}
