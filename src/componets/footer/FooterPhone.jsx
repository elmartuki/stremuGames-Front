import { useLocation, useNavigate } from "react-router-dom";
import "../../css/footer.css";

import homeIcon from "../../icons/home.svg";
import adminPanel from "../../icons/admin_panel.svg";
import categoriasIcon from "../../icons/grid.svg";
import comunidadIcon from "../../icons/usuarios.svg";
import carritoIcon from "../../icons/carrito.svg";
import wishlistIcon from "../../icons/fav.svg";
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
    { titulo: "", icono: homeIcon, ruta: "/explorar" },
    { titulo: "", icono: categoriasIcon, ruta: "/categorias" },
    { titulo: "", icono: comunidadIcon, ruta: "/comunidad" },
    { titulo: "", icono: carritoIcon, ruta: "/carrito" },
    { titulo: "", icono: wishlistIcon, ruta: "/wishlist" },
    { titulo: "", icono: perfilIcon, ruta: "/perfil" },
  ];

  const opcionesEmpresa = [
    { titulo: "", icono: homeIcon, ruta: "/explorar" },
    { titulo: "", icono: categoriasIcon, ruta: "/categorias" },
    { titulo: "", icono: comunidadIcon, ruta: "/comunidad" },
    { titulo: "", icono: juegos, ruta: "/studio-panel" },
    { titulo: "", icono: perfilIcon, ruta: "/perfil" },
  ];

  const opcionesAdmin = [
    { titulo: "", icono: homeIcon, ruta: "/explorar" },
    { titulo: "", icono: categoriasIcon, ruta: "/categorias" },
    { titulo: "", icono: comunidadIcon, ruta: "/comunidad" },
    { titulo: "", icono: adminPanel, ruta: "/admin-panel" },
    { titulo: "", icono: perfilIcon, ruta: "/perfil" },
  ];

  const opcionesInvitado = [
    { titulo: "", icono: homeIcon, ruta: "/explorar" },
    { titulo: "", icono: comunidadIcon, ruta: "/comunidad" },
    { titulo: "", icono: categoriasIcon, ruta: "/categorias" },
    { titulo: "", icono: perfilIcon, ruta: "/login" },
  ];

  const rolFinal = rolToken || usuario?.rol;

  let opcionesAMostrar;
  if (rolFinal === "empresa") {
    opcionesAMostrar = opcionesEmpresa;
  } else if (rolFinal === "admin") {
    opcionesAMostrar = opcionesAdmin;
  } else if (rolFinal === "user") {
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
