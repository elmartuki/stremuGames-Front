import { useLocation, Link, useNavigate } from "react-router-dom";
import "../../css/footer.css";

import homeIcon from "../../icons/home.svg";
import categoriasIcon from "../../icons/grid.svg";
import carritoIcon from "../../icons/carrito.svg";
import wishlistIcon from "../../icons/heart.svg";
import perfilIcon from "../../icons/user.svg";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: "Inicio",
      icono: homeIcon,
      ruta: "/explorar",
    },
    {
      titulo: "Categorías",
      icono: categoriasIcon,
      ruta: "/categorias",
    },
    {
      titulo: "Carrito",
      icono: carritoIcon,
      ruta: "/carrito",
    },
    {
      titulo: "Wishlist",
      icono: wishlistIcon,
      ruta: "/wishlist",
    },
    {
      titulo: "Perfil",
      icono: perfilIcon,
      ruta: "/perfil",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer_container">
        {opciones.map((item, index) => {
          const isActive = location.pathname === item.ruta;

          return (
            <div key={index} className={isActive ? "active" : "footer_item"}>
              <div
                onClick={() => navigate(item.ruta)}
                className="icon_container "
              >
                <img src={item.icono} alt={item.titulo} />
              </div>
              <p>{item.titulo}</p>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
