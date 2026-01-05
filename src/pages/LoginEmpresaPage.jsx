import { useNavigate } from "react-router-dom";
import LoginEmpresa from "../componets/auth/LoginEmpresa";
import "../css/login.css";
import back from "../icons/back.svg";
import more from "../icons/more.svg";

export default function LoginEmpresaPage() {
  const navigate = useNavigate();
  return (
    <section className="formulario_login_section">
      <nav className="navbar-phone">
       <img onClick={() => navigate(-1)} src={back} alt="" />
        <div>
          <p>Iniciar Sesión</p>
          <p>Ingresá a tu cuenta.</p>
        </div>

        <img src={more} alt="" />
      </nav>
      <div className="seccion_2">
        <LoginEmpresa />
      </div>
    </section>
  );
}
