import "../css/login.css";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import RegistroEmpresa from "../componets/auth/RegistroEmpresa";

export default function RegistroEmpresaPage() {
  return (
    <section className="formulario_login_section">
      <nav className="navbar-phone">
        <img src={back} alt="" />
        <div>
          <p>Registro de estudios</p>
          <p>Crea una cuenta.</p>
        </div>

        <img src={more} alt="" />
      </nav>
      <div className="seccion_2">
        <RegistroEmpresa />
      </div>
    </section>
  );
}
