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
            <svg
              width="150px"
              viewBox="0 0 650 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100%" height="100%" fill="transparent" />

              <g transform="skewX(-15)">
                <text
                  x="15"
                  y="90"
                  font-family="'Arial Black', 'Helvetica Neue', sans-serif"
                  font-weight="900"
                  font-size="90"
                  textLength="100%"
                  lengthAdjust="spacingAndGlyphs"
                >
                  <tspan fill="#FFFFFF">STREMU</tspan>
                  <tspan fill="#55FF00">GAMES</tspan>
                </text>
              </g>

              <rect
                x="255"
                y="105"
                width="140"
                height="5"
                fill="#55FF00"
                rx="2"
              />
            </svg>
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
                <button onClick={() => navigate("/categorias/ofertas")}>
                  Ofertas
                </button>
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
