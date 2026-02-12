import terminal from "../../icons/terminal.svg";
import instagram from "../../icons/ig.svg";
import twitter from "../../icons/twitter.svg";
import { useNavigate } from "react-router-dom";

export default function FooterWeb() {
  const navigate = useNavigate();

  return (
    <footer className="footer-web">
      <div className="footer_container">
        <div className="seccion">
          <p>
            <img src={terminal} alt="" />
            Stremugames
          </p>
        </div>
        <div className="seccion">
          <button>SOBRE NOSOTROS</button>
          <button>TERMINOS Y CONDICIONES</button>
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
