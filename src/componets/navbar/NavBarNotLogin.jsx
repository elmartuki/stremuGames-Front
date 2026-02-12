import { useNavigate } from "react-router-dom";
import terminal from "../../icons/terminal_green.svg";
import useMediaQuery from "../../utils/changeDesk";

export default function NavBarNotLogin() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const navigate = useNavigate();
  return (
    <>
      <header className="navbar_init_container">
        <nav className="navbar_init">
          <div className="logo">
            <p>
              <img src={terminal} alt="" />
              Stremugames
            </p>
          </div>

          <div className="links">
            {isDesktop ? (
              <>
                <button onClick={() => navigate("/")}>Inicio</button>
                <button onClick={() => navigate("/explorar")}>Explorar</button>
                <button onClick={() => navigate("/categorias")}>
                  Categorias
                </button>
                <button onClick={() => navigate("/comunidad")}>
                  Comunidad
                </button>
                <button onClick={() => navigate("/categorias/ofertas")}>Ofertas</button>
              </>
            ) : (
              <></>
            )}

            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
