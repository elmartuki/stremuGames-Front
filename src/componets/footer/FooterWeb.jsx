import terminal from "../../icons/terminal.svg";
import instagram from "../../icons/ig.svg";
import twitter from "../../icons/twitter.svg";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../services/ModalTerminos";

export default function FooterWeb() {
  const navigate = useNavigate();
  const openModal = useModalStore((state) => state.openModal);

  return (
    <footer className="footer-web">
      <div className="footer_container">
        <div className="seccion">
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
                fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
                fontWeight="900"
                fontSize="90"
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
        <div className="seccion">
          <button onClick={() => navigate("/sobre-nosotros")}>
            SOBRE NOSOTROS
          </button>
          <button onClick={openModal}>TERMINOS Y CONDICIONES</button>
          <button onClick={() => navigate("/soporte")}>SOPORTE</button>
        </div>
        <div className="seccion">
          <button>
            <img src={twitter} alt="" />
          </button>
          <button>
            <img src={instagram} alt="" />
          </button>
        </div>
      </div>

      <div className="copyrigth">
        © {new Date().getFullYear()} stremugames. todos los derechos reservados.
      </div>
    </footer>
  );
}
