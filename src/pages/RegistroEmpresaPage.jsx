import "../css/login.css";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import RegistroEmpresa from "../componets/auth/RegistroEmpresa";
import { useNavigate } from "react-router-dom";

export default function RegistroEmpresaPage() {
  const navigate = useNavigate();

  return (
    <section className="formulario_login_section">
      <nav className="navbar-phone">
        <img onClick={() => navigate(-1)} src={back} alt="" />
        <div></div>

        <img src={more} alt="" />
      </nav>
      <div className="seccion_2">
        <RegistroEmpresa />
      </div>
    </section>
  );
}
