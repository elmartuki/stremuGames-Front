import "../css/categoriaSeleccionada.css";
import search from "../icons/search.svg";
import Categoria from "../componets/categorias/Categoria";
import { useParams } from "react-router-dom";
import { categorias } from "../constants/categorias";
import HeroCategoria from "../componets/categorias/HeroCategoria";

export default function CategoriaSeleccionadaPage() {
  const { id } = useParams();

  return (
    <section className="categoria_seleccionada_page">
      <div className="categoria_seleccionada">
        <p className="categoria_seleccionada_titulo">Categoria / {id}</p>
        <section className="juego_destacado">
          <HeroCategoria />
        </section>
      </div>

      <section className="juegos_section">
        <Categoria />
      </section>
    </section>
  );
}
