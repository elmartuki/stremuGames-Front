import "../css/categoriaSeleccionada.css";
import Categoria from "../componets/categorias/Categoria";
import { useParams } from "react-router-dom";
import HeroCategoria from "../componets/categorias/HeroCategoria";

export default function CategoriaSeleccionadaPage() {
  const { id } = useParams();

  return (
    <section className="categoria_seleccionada_page">
      <div className="categoria_seleccionada">
        <div className="categoria_seleccionada_titulo">
          <p className="titulo">Categoria / {id}</p>
        </div>
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
