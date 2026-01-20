import { useLocation, useNavigate } from "react-router-dom";
import "../../css/footer.css";

import homeIcon from "../../icons/home.svg";
import categoriasIcon from "../../icons/grid.svg";
import carritoIcon from "../../icons/carrito.svg";
import wishlistIcon from "../../icons/heart.svg";
import perfilIcon from "../../icons/user.svg";
import juegos from "../../icons/juegos.svg";
import { useObtenerUsuario } from "../../services/obtenerUsuario";
import { useObtenerToken } from "../../services/obtenerToken";
import useMediaQuery from "../../utils/changeDesk";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const { usuarioInfo } = useObtenerToken();
  const rolToken = usuarioInfo?.rol;

  const { usuario } = useObtenerUsuario();

  const opcionesUser = [
    { titulo: "Inicio", icono: homeIcon, ruta: "/explorar" },
    { titulo: "Categorías", icono: categoriasIcon, ruta: "/categorias" },
    { titulo: "Carrito", icono: carritoIcon, ruta: "/carrito" },
    { titulo: "Wishlist", icono: wishlistIcon, ruta: "/wishlist" },
    { titulo: "Perfil", icono: perfilIcon, ruta: "/perfil" },
  ];

  const opcionesEmpresa = [
    { titulo: "Inicio", icono: homeIcon, ruta: "/explorar" },
    { titulo: "Categorías", icono: categoriasIcon, ruta: "/categorias" },
    { titulo: "Mis Juegos", icono: juegos, ruta: "/parthner" },
    { titulo: "Perfil", icono: perfilIcon, ruta: "/perfil" },
  ];

  const opcionesInvitado = [
    { titulo: "Inicio", icono: homeIcon, ruta: "/explorar" },
    { titulo: "Categorías", icono: categoriasIcon, ruta: "/categorias" },
    { titulo: "Login", icono: perfilIcon, ruta: "/login" },
  ];

  const rolFinal = rolToken || usuario?.rol;

  let opcionesAMostrar;
  if (rolFinal === "empresa") {
    opcionesAMostrar = opcionesEmpresa;
  } else if (rolFinal === "user" || rolFinal === "admin") {
    opcionesAMostrar = opcionesUser;
  } else {
    opcionesAMostrar = opcionesInvitado;
  }

  const rutasOcultas = [
    "/login",
    "/registro",
    "/login-empresa",
    "/registro-empresa",
  ];
  if (rutasOcultas.includes(location.pathname)) return null;

  return (
    <>
      {isDesktop ? (
        <></>
      ) : (
        <footer className="footer">
          <div className="footer_container">
            {opcionesAMostrar.map((item, index) => {
              const isActive = location.pathname === item.ruta;

              return (
                <div
                  key={index}
                  className={isActive ? "active" : "footer_item"}
                >
                  <div
                    onClick={() => navigate(item.ruta)}
                    className="icon_container"
                  >
                    <img src={item.icono} alt={item.titulo} />
                  </div>
                  <p>{item.titulo}</p>
                </div>
              );
            })}
          </div>
        </footer>
      )}
    </>
  );
}
