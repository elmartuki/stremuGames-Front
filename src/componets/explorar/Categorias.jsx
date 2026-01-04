import { useNavigate } from "react-router-dom";
import { categorias } from "../../constants/categorias";
import { useObtenerJuegosParthner } from "../../services/obtenerJuegosParthner";

export default function Categorias() {
  const { listado } = useObtenerJuegosParthner();

  const navigate = useNavigate();

  return (
    <>
      {categorias.slice(0, 6).map((item, index) => (
        <article
          onClick={() => {
            navigate(`/categorias/${item.nombre}`);
          }}
          key={index}
          className="categoria"
          style={{ background: item.color }}
        >
          <img src={item.icon} alt="" />
          <p> {item.nombre}</p>
        </article>
      ))}
    </>
  );
}
